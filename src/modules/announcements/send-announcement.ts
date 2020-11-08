import { Middleware, SlackCommandMiddlewareArgs } from '@slack/bolt';
import { isValidUserResponse } from '../../models/user-response';
import { permissions } from '../../config/permissions';
import { googleSheets } from '../../google-sheets';

export const sendAnnouncement: (
  prefix: string,
) => Middleware<SlackCommandMiddlewareArgs> = (prefix) => async ({
  payload,
  ack,
  client,
  say,
}) => {
  await ack();

  const userResponse = await client.users.info({
    user: payload.user_id,
  });

  const user = isValidUserResponse(userResponse) ? userResponse.user : null;

  if (!user?.is_admin) {
    const sheets = await googleSheets();

    try {
      const resp = await sheets.api.spreadsheets.values.get({
        spreadsheetId: permissions.sheetId,
        auth: sheets.client,
        range: permissions.announcementsSheet,
      });

      const { values } = resp.data;

      if (!values || !values[0].includes(payload.user_id)) {
        await client.chat.postEphemeral({
          channel: payload.channel_id,
          user: payload.user_id,
          text: 'Only approved users can perform this operation',
        });
        return;
      }
    } catch (e) {
      await client.chat.postEphemeral({
        channel: payload.channel_id,
        user: payload.user_id,
        text: 'Error verifying permissions',
      });
    }
  }

  const text = payload.text;

  const multiline = text.includes('\n');

  await say({
    mrkdwn: true,
    text: `<!${prefix}>${multiline ? '\n' : ' '}${text}`,
  });
};
