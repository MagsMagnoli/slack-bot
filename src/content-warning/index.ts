import * as bolt from '@slack/bolt';
import { createContentWarningMessage } from './create-content-warning-message';

export function initContentWarningModule(app: bolt.App) {
  app.command('/contentwarning', createContentWarningMessage);
}
