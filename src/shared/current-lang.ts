import TEXT_RESOURCES from './pt-lang'

export const t = (key) => {
  return TEXT_RESOURCES[key];
};

export const getLocalizedMessage = (key) => {
  return t(key);
};
