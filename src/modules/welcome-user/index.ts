import * as bolt from '@slack/bolt';
import { welcomeUser } from './welcome-user';
import { isFeatureEnabled } from '../features/is-feature-enabled';

export function initWelcomeUserModule(app: bolt.App) {
  app.event('team_join', isFeatureEnabled('welcomeUser'), welcomeUser);
}
