import { Middleware, SlackEventMiddlewareArgs } from '@slack/bolt';
import { isValidUserResponse } from '../../models/user-response';
import { isValidMessageRepliedEvent } from '../../models/message-replied-event';

export const deleteMessage: (
  lockedThreads: Record<string, boolean>,
) => Middleware<SlackEventMiddlewareArgs<'message'>> = (
  lockedThreads,
) => async ({ client, payload, event }) => {
  if (event.subtype) {
    return;
  }

  const message = isValidMessageRepliedEvent(payload) ? payload : null;

  if (!message || !lockedThreads[`${payload.channel}_${message.thread_ts}`]) {
    return;
  }

  const userResponse = await client.users.info({
    user: message.user,
  });

  const user = isValidUserResponse(userResponse) ? userResponse.user : null;

  if (user?.is_admin || user?.is_bot) return;

  await client.chat.delete({
    token: process.env.SLACK_USER_TOKEN,
    channel: message.channel,
    ts: message.ts,
    as_user: true,
  });

  await client.chat.postEphemeral({
    token: process.env.SLACK_BOT_TOKEN,
    channel: message.channel,
    user: message.user,
    text: `⚠️ Hey <@${message.user}>! That thread is read only`,
  });
};
