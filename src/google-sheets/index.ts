import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const api = google.sheets({ version: 'v4' });

export const googleSheets = async () => {
  const client = await auth.getClient();

  return {
    client,
    api,
  };
};
