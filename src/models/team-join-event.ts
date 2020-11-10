import { TeamJoinEvent } from '@slack/bolt';

export function isValidTeamJoinPayload(
  input: unknown,
): input is TeamJoinEvent & {
  user: { id: string; real_name: string; display_name: string; email: string };
} {
  return (
    typeof input === 'object' &&
    input != null &&
    typeof (input as any).type === 'string' &&
    typeof (input as any).user === 'object' &&
    typeof (input as any).user.id === 'string' &&
    typeof (input as any).user.real_name === 'string' &&
    typeof (input as any).user.display_name === 'string' &&
    typeof (input as any).user.email === 'string'
  );
}
