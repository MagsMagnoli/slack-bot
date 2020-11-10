import { App } from '@slack/bolt';
import { initReadOnlyChannelsModule } from './modules/read-only-channels';
import { initContentWarningModule } from './modules/content-warning';
import { initLockThreadModule } from './modules/lock-thread';
import { initWelcomeUserModule } from './modules/welcome-user';
import { initFeaturesModule } from './modules/features';
import { initAnnouncementsModule } from './modules/announcements';
import { initNewUserRegistrationModule } from './modules/new-user-registration';

const PORT = process.env.PORT || 3000;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

initFeaturesModule(app);
initAnnouncementsModule(app);
initWelcomeUserModule(app);
initLockThreadModule(app);
initReadOnlyChannelsModule(app);
initContentWarningModule(app);
initNewUserRegistrationModule(app);

(async () => {
  await app.start(PORT);

  console.log('Bot started on port', PORT);
})();
