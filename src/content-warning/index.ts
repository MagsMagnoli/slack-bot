import * as bolt from '@slack/bolt';
import { contentWarningModal } from './content-warning-modal';
import { noopAck } from '../noop-ack';
import { contentWarningListener } from './content-warning-listener';
import { contentWarningModalSubmission } from './content-warning-modal-submission';

export const callbackId = 'content_warning_modal_callback';
export const showMessageActionId = 'content_warning_show_button';

export function initContentWarningModule(app: bolt.App) {
  app.message(contentWarningListener);
  app.command('/contentwarning', contentWarningModal);
  app.view(callbackId, contentWarningModalSubmission);
  app.action(showMessageActionId, noopAck);
}
