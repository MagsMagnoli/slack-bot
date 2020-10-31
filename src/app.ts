import * as bolt from '@slack/bolt';
import { initReadOnlyChannelsModule } from './read-only-channels';
import { initContentWarningModule } from './content-warning';
import { initLockThreadModule } from './lock-thread';
import { initWelcomeUserModule } from './welcome-user';

const PORT = process.env.PORT || 3000;

const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

initWelcomeUserModule(app);
initLockThreadModule(app);
initReadOnlyChannelsModule(app);
initContentWarningModule(app);

(async () => {
  await app.start(PORT);

  console.log('Bot started on port', PORT);
})();
