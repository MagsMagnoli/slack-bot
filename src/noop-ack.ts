import { AckFn } from '@slack/bolt';

export const noopAck = async ({ ack }: { ack: AckFn<any> }) => ack();
