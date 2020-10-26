export type ReactionMessageItem = {
  type: 'message';
  channel: string;
  ts: string;
};

export function isValidReactionMessageItem(
  input: unknown,
): input is ReactionMessageItem {
  return (
    typeof input === 'object' &&
    input != null &&
    typeof (input as any).type === 'string' &&
    typeof (input as any).channel === 'string' &&
    typeof (input as any).ts === 'string'
  );
}
