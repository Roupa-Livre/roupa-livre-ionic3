import { AngularTokenService } from "angular-token";

export function getProbableApiUrl(auth: AngularTokenService, url) {
  if (url.startsWith('data:image/'))
    return url;
  var fixedUrl = url ? (url.indexOf('?') > 1 ? url + '&type=large' : url + '?type=large') : url;
  if (fixedUrl[0] == '/')
    return auth.apiBase + '/' + fixedUrl;
  else
    return fixedUrl;
};

export function getImageAsSource(auth: AngularTokenService, imageContainer) {
  let image;
  try {
    image = imageContainer.hasOwnProperty('image') ? imageContainer.image : imageContainer;

    if (image.hasOwnProperty('file_url'))
      return getProbableApiUrl(auth, image.file_url);
    else if (image.hasOwnProperty('data'))
      return image.data;
    else if (image.hasOwnProperty('url')) {
      if (image.url)
        return getProbableApiUrl(auth, image.url);
      else
        return null;
    }
    else
      return image;
  } catch (ex) {
    if (image !== undefined)
      throw ex;
  }
};

export function pureImageAsSource(auth: AngularTokenService, image) {
  try {
    return image ? getProbableApiUrl(auth, image) : null;
  } catch (ex) {
    if (image !== undefined)
      throw ex;
  }
};
