import { Middleware, SlackEventMiddlewareArgs } from '@slack/bolt';
import { googleSheets } from '../../google-sheets';
import { isValidTeamJoinPayload } from '../../models/team-join-event';

export const registerUser: Middleware<SlackEventMiddlewareArgs<
  'team_join'
>> = async ({ payload }) => {
  const user = isValidTeamJoinPayload(payload) ? payload.user : null;

  if (!user) {
    return;
  }

  const sheets = await googleSheets();

  try {
    const resp = await sheets.api.spreadsheets.values.get({
      spreadsheetId: process.env.USERS_SHEET_ID,
      auth: sheets.client,
      range: 'Sheet1!A2',
    });

    const { values } = resp.data;

    if (!values || !values[0].includes(user.id)) {
      await sheets.api.spreadsheets.values.append({
        spreadsheetId: process.env.USERS_SHEET_ID,
        auth: sheets.client,
        range: 'Sheet1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [
            [
              user.id,
              user.real_name,
              user.display_name,
              user.email,
              new Date().toISOString(),
            ],
          ],
        },
      });
    }
  } catch (e) {
    console.error(e);
  }
};
