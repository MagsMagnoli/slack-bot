import * as bolt from '@slack/bolt';
import { initReadOnlyChannelsModule } from './read-only-channels';
import { initContentWarningModule } from './content-warning';

const PORT = process.env.PORT || 3000;

const app = new bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

initReadOnlyChannelsModule(app);
initContentWarningModule(app);

(async () => {
  await app.start(PORT);

  console.log('Bot started on port', PORT);
})();
