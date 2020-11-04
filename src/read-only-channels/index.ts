import * as bolt from '@slack/bolt';
import { deleteMessage } from './delete-message';
import { toggleReadOnly } from './toggle-read-only';
import fs from 'fs';
import { isFeatureEnabled } from '../features/is-feature-enabled';

const channels = readChannels();

export function initReadOnlyChannelsModule(app: bolt.App) {
  app.message(
    isFeatureEnabled('readonlyChannels'),
    deleteMessage(channels),
  );
  app.command(
    '/readonly',
    isFeatureEnabled('readonlyChannels'),
    toggleReadOnly(channels, handleWriteChannels),
  );
}

function readChannels(): string[] {
  const channelJSON = fs.readFileSync('data/readonly-channels.json');
  return JSON.parse(channelJSON.toString());
}

function handleWriteChannels(channels: string[]) {
  fs.writeFileSync('data/readonly-channels.json', JSON.stringify(channels));
}
