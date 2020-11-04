import * as bolt from '@slack/bolt';
import { contentWarningModal } from './content-warning-modal';
import { noopAck } from '../noop-ack';
import { contentWarningListener } from './content-warning-listener';
import { contentWarningModalSubmission } from './content-warning-modal-submission';
import { isFeatureEnabled } from '../features/is-feature-enabled';

export const callbackId = 'content_warning_modal_callback';
export const showMessageActionId = 'content_warning_show_button';

export function initContentWarningModule(app: bolt.App) {
  app.message(isFeatureEnabled('contentWarning'), contentWarningListener);
  app.command(
    '/contentwarning',
    isFeatureEnabled('contentWarning'),
    contentWarningModal,
  );
  app.view(
    callbackId,
    isFeatureEnabled('contentWarning'),
    contentWarningModalSubmission,
  );
  app.action(showMessageActionId, isFeatureEnabled('contentWarning'), noopAck);
}
