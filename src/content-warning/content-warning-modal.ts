import { Middleware, SlackCommandMiddlewareArgs } from '@slack/bolt';
import { callbackId } from './index';

export const contentWarningModal: Middleware<SlackCommandMiddlewareArgs> = async ({
  payload,
  ack,
  client,
}) => {
  await ack();

  await client.views.open({
    trigger_id: payload.trigger_id,
    view: {
      type: 'modal',
      callback_id: callbackId,
      title: {
        type: 'plain_text',
        text: 'Content Warning Message',
      },
      blocks: [
        {
          block_id: 'channel',
          type: 'input',
          element: {
            action_id: 'action',
            type: 'conversations_select',
            default_to_current_conversation: true,
          },
          label: {
            type: 'plain_text',
            text: 'Channel',
          },
        },
        {
          block_id: 'types',
          type: 'input',
          element: {
            action_id: 'action',
            type: 'plain_text_input',
            placeholder: {
              type: 'plain_text',
              text: 'Content warning type(s)',
            },
          },
          label: {
            type: 'plain_text',
            text: 'Type(s)',
          },
        },
        {
          block_id: 'message',
          type: 'input',
          element: {
            action_id: 'action',
            type: 'plain_text_input',
            multiline: true,
            placeholder: {
              type: 'plain_text',
              text: 'Content warning message',
            },
          },
          label: {
            type: 'plain_text',
            text: 'Message',
          },
        },
      ],
      submit: {
        type: 'plain_text',
        text: 'Submit',
      },
    },
  });
};
