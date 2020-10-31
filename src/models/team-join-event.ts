import { TeamJoinEvent } from '@slack/bolt';

export function isValidTeamJoinPayload(
  input: unknown,
): input is TeamJoinEvent & { user: { id: string } } {
  return (
    typeof input === 'object' &&
    input != null &&
    typeof (input as any).type === 'string' &&
    typeof (input as any).user === 'object' &&
    typeof (input as any).user.id === 'string'
  );
}