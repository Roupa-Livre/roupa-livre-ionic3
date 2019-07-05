import TEXT_RESOURCES from './pt-lang'

export function getLocalizedMessage(key) {
  return t(key);
};
export function t(key) {
  return TEXT_RESOURCES[key];
}
