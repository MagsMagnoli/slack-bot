import { showMessageActionId } from './index';
import { SayArguments } from '@slack/bolt';

export const composeContentWarningMessage: (
  userId: string,
  triggers: string,
  messageText: string,
) => SayArguments = (userId, triggers, messageText) => {
  const text = `⚠️ *Content Warning*\n<@${userId}> posted a message with a content warning of: ${triggers}`;

  return {
    text: '',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            action_id: showMessageActionId,
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Show Message',
              emoji: true,
            },
            confirm: {
              title: {
                type: 'plain_text',
                text: 'Message',
              },
              text: {
                type: 'mrkdwn',
                text: messageText,
              },
              confirm: {
                type: 'plain_text',
                text: 'Close',
              },
            },
          },
        ],
      },
    ],
  };
};
