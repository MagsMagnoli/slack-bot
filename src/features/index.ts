import * as fs from 'fs';
import { Features } from '../models/features';
import * as bolt from '@slack/bolt';
import { toggleFeature } from './toggleFeature';

const dataPath = 'data/features.json';

let _features = readFeatures();

export const features = () => _features;

export function initFeaturesModule(app: bolt.App) {
  app.message(toggleFeature(features(), handleWriteFeatures));
}

function readFeatures(): Features {
  const featuresJSON = fs.readFileSync(dataPath);
  return JSON.parse(featuresJSON.toString());
}

function handleWriteFeatures(features: Features) {
  _features = features;
  fs.writeFileSync(dataPath, JSON.stringify(features));
}
