import { NextFn } from '@slack/bolt';
import { Features } from '../models/features';
import { features } from './index';

export const isFeatureEnabled: (
  feature: keyof Features,
) => ({ next }: { next?: NextFn }) => Promise<void> = (
  feature: keyof Features,
) => async ({ next }) => {
  if (features()[feature] && next) await next();
};
