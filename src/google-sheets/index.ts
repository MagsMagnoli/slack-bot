import { google } from 'googleapis';

export const googleSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const api = google.sheets({ version: 'v4' });

  const client = await auth.getClient();

  return {
    client,
    api,
  };
};
