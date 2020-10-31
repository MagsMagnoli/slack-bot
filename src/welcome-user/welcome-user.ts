import { Middleware, SlackEventMiddlewareArgs } from '@slack/bolt';
import { isValidTeamJoinPayload } from '../models/team-join-event';

export const welcomeUser: Middleware<SlackEventMiddlewareArgs<
  'team_join'
>> = async ({ payload, client }) => {
  const userId = isValidTeamJoinPayload(payload) ? payload.user.id : null;

  if (!userId) {
    return;
  }

  await client.chat.postMessage({
    channel: userId,
    text: 'Welcome to Slack!',
  });
};
