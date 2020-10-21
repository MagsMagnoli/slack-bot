import { Middleware, SlackEventMiddlewareArgs } from '@slack/bolt';
import { composeContentWarningMessage } from './compose-content-warning-message';

const filters = ['content warning', 'trigger warning', 'cw', 'tw'];

export const contentWarningListener: Middleware<SlackEventMiddlewareArgs<'message'>> = async ({ payload, client, say, message }) => {
  if (payload.subtype) {
    return;
  }

  const lines = message.text?.split('\n') ?? [];

  const firstLine = lines.shift() ?? '';

  const triggered = filters.some(item => firstLine.startsWith(item));

  if (!triggered) {
    return;
  }

  const triggers = firstLine.split(':');

  const triggerText = triggers.length == 2 ? triggers[1].trim() : 'unspecified';

  await client.chat.delete({
    token: process.env.SLACK_USER_TOKEN,
    channel: payload.channel,
    ts: payload.ts,
    as_user: true
  });

  await say(composeContentWarningMessage(payload.user, triggerText, lines.join('\n')));
};
