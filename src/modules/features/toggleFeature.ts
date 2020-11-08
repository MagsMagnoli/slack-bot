import { Middleware, SlackEventMiddlewareArgs } from '@slack/bolt';
import { Features } from '../../models/features';
import { isValidUserResponse } from '../../models/user-response';

enum Toggle {
  Enable = 'enable',
  Disable = 'disable',
}

const map: Record<string, boolean> = {};

const toggleMap: Record<string, boolean> = Object.values(Toggle).reduce(
  (acc, curr) => {
    acc[curr] = true;
    return acc;
  },
  map,
);

export const toggleFeature: (
  features: Features,
  handleWriteFeatures: (features: Features) => void,
) => Middleware<SlackEventMiddlewareArgs<'message'>> = (
  features,
  handleWriteFeatures,
) => async ({ client, payload }) => {
  if (payload.channel_type !== 'im') {
    return;
  }

  const parts = payload.text?.split(' ') ?? [];

  if (parts.length !== 3) {
    return;
  }

  const prefix = parts[0].toLowerCase();

  if (prefix !== 'feature') {
    return;
  }

  const userResponse = await client.users.info({
    user: payload.user,
  });

  const user = isValidUserResponse(userResponse) ? userResponse.user : null;

  if (!user?.is_admin) {
    return;
  }

  const feature = parts[1].toLowerCase();
  const state = parts[2].toLowerCase();

  const key = (Object.keys(features) as (keyof Features)[]).find(
    (key) => key.toLowerCase() === feature,
  );

  if (!key) {
    await client.chat.postMessage({
      channel: payload.channel,
      user: payload.user,
      text: 'Invalid feature',
    });
    return;
  }

  if (!toggleMap[state]) {
    await client.chat.postMessage({
      channel: payload.channel,
      user: payload.user,
      text: 'Invalid state',
    });
    return;
  }

  features[key] = state === Toggle.Enable;

  handleWriteFeatures(features);

  await client.chat.postMessage({
    channel: payload.channel,
    user: payload.user,
    text: `Feature ${state === Toggle.Enable ? 'enabled' : 'disabled'}`,
  });
};
