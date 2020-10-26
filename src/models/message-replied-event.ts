import { MessageRepliedEvent } from '@slack/bolt';

export function isValidMessageRepliedEvent(
  input: unknown,
): input is MessageRepliedEvent {
  return (
    typeof input === 'object' &&
    input !== null &&
    typeof (input as any).thread_ts === 'string'
  );
}
