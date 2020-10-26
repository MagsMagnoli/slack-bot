import { Middleware, SlackEventMiddlewareArgs } from '@slack/bolt';
import { isValidUserResponse } from '../models/user-response';
import { isValidReactionMessageItem } from '../models/reaction-message-item';

export const unlockThread: (
  lockedThreads: Record<string, boolean>,
  writeLockedThreads: (lockedThreads: Record<string, boolean>) => void,
) => Middleware<SlackEventMiddlewareArgs<'reaction_removed'>> = (
  lockedThreads,
  writeLockedThreads,
) => async ({ payload, client }) => {
  if (payload.reaction !== 'lock-thread') {
    return;
  }

  const item = isValidReactionMessageItem(payload.item) ? payload.item : null;

  if (!item || !lockedThreads[`${item.channel}_${item.ts}`]) {
    return;
  }

  const userResponse = await client.users.info({
    user: payload.user,
  });

  const user = isValidUserResponse(userResponse) ? userResponse.user : null;

  if (!user?.is_admin) {
    return;
  }

  delete lockedThreads[`${item.channel}_${item.ts}`];
  writeLockedThreads(lockedThreads);

  await client.chat.postMessage({
    channel: item.channel,
    text: 'This thread is now unlocked',
    thread_ts: item.ts,
  });
};
