import bolt from '@slack/bolt';
import { sendAnnouncement } from './send-announcement';
import { isFeatureEnabled } from '../features/is-feature-enabled';

enum AnnouncementPrefix {
  Channel = 'channel',
  Here = 'here',
}

export function initAnnouncementsModule(app: bolt.App) {
  app.command(
    '/channel',
    isFeatureEnabled('announcements'),
    sendAnnouncement(AnnouncementPrefix.Channel),
  );
  app.command(
    '/here',
    isFeatureEnabled('announcements'),
    sendAnnouncement(AnnouncementPrefix.Here),
  );
}
