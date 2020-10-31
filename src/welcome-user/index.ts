import * as bolt from '@slack/bolt';
import { welcomeUser } from './welcome-user';

export function initWelcomeUserModule(app: bolt.App) {
  app.event('team_join', welcomeUser);
}
