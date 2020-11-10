import { App } from '@slack/bolt';
import { registerUser } from './register-user';
import { isFeatureEnabled } from '../features/is-feature-enabled';

export function initNewUserRegistrationModule(app: App) {
  app.event('team_join', isFeatureEnabled('newUserRegistration'), registerUser);
}
