import * as bolt from '@slack/bolt';
import { deleteMessage } from './delete-message';
import fs from 'fs';
import { lockThread } from './lock-thread';
import { unlockThread } from './unlock-thread';
import { isFeatureEnabled } from '../features/is-feature-enabled';

const dataPath = 'data/locked-threads.json';

const lockedThreads = readLockedThreads();

export function initLockThreadModule(app: bolt.App) {
  app.message(
    isFeatureEnabled('lockThread'),
    deleteMessage(lockedThreads),
  );
  app.event(
    'reaction_added',
    isFeatureEnabled('lockThread'),
    lockThread(lockedThreads, handleWriteLockedThreads),
  );
  app.event(
    'reaction_removed',
    isFeatureEnabled('lockThread'),
    unlockThread(lockedThreads, handleWriteLockedThreads),
  );
}

function readLockedThreads(): Record<string, boolean> {
  const channelJSON = fs.readFileSync(dataPath);
  return JSON.parse(channelJSON.toString());
}

function handleWriteLockedThreads(lockedThreads: Record<string, boolean>) {
  fs.writeFileSync(dataPath, JSON.stringify(lockedThreads));
}
