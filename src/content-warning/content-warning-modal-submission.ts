import { Middleware, SlackViewMiddlewareArgs } from '@slack/bolt';
import { composeContentWarningMessage } from './compose-content-warning-message';

export const contentWarningModalSubmission: Middleware<SlackViewMiddlewareArgs> = async ({
  ack,
  payload,
  body,
  client,
}) => {
  await ack();

  const { values } = payload.state;

  const channel = values['channel']['action']['selected_conversation'];
  const types = values['types']['action']['value'];
  const message = values['message']['action']['value'];

  await client.chat.postMessage({
    channel,
    ...composeContentWarningMessage(body.user.id, types, message),
  });
};
