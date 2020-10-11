import { Middleware, SlackCommandMiddlewareArgs } from '@slack/bolt';
import { isValidUserResponse } from '../models/user-response';

export const createContentWarningMessage: Middleware<SlackCommandMiddlewareArgs> = async ({ payload, client, ack, say, respond }) => {
  await ack();

  const params = payload.text.match(/"[\w\s,]+"/g)?.map(item => item.split('"').join('')) ?? [];

  if (params.length !== 2) {
    await respond({
      text: `<@${payload.user_id}> This command requires two arguments separated by double quotes, ${params.length} were given`,
      response_type: 'ephemeral'
    });
    return;
  }

  const userResponse = await client.users.info({
    user: payload.user_id
  });

  const user = isValidUserResponse(userResponse) ? userResponse.user : null;

  if (!user) return;

  const warning = params[0];
  const text = params[1];

  await say({
    text: '',
    blocks: [
      {
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url: user.profile.image_24,
            alt_text: payload.user_name
          },
          {
            type: 'mrkdwn',
            text: user.profile.display_name
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `⚠️ *Content Warning*: ${warning}`
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click to View',
              emoji: true
            },
            confirm: {
              title: {
                type: 'plain_text',
                text: `Message From ${user.profile.display_name}`
              },
              text: {
                type: 'plain_text',
                text: text
              },
              confirm: {
                type: 'plain_text',
                text: 'Close'
              },
              deny: {
                type: 'plain_text',
                text: 'Close'
              }
            }
          }
        ]
      }
    ]
  });
};
