import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ActionSheetController } from "ionic-angular";
import { getLocalizedMessage } from "./current-lang";
import { getParentInjectorLocation } from "@angular/core/src/render3/di";

export const ApparelCameraOptions = (camera: Camera) : CameraOptions => ({
  quality: 100,
  destinationType: camera.DestinationType.DATA_URL,
  encodingType: camera.EncodingType.JPEG,
  mediaType: camera.MediaType.PICTURE
});

export const UserCameraOptions = (camera: Camera) : CameraOptions => ({
  quality: 100,
  destinationType: camera.DestinationType.DATA_URL,
  encodingType: camera.EncodingType.JPEG,
  mediaType: camera.MediaType.PICTURE
});

export const getPictureSource = (camera: Camera, actionSheetCtrl: ActionSheetController) : Promise<number> => {
  return new Promise((resolve) => {
    let actionSheet = actionSheetCtrl.create({
      title: getLocalizedMessage('apparel_form.messages.new_photo.title'),
      buttons: [
        {
          text: getLocalizedMessage('apparel_form.messages.new_photo.buttons.new'),
          handler: () => { resolve(camera.PictureSourceType.CAMERA) }
        }, {
          text: getLocalizedMessage('apparel_form.messages.new_photo.buttons.gallery'),
          handler: () => { resolve(camera.PictureSourceType.PHOTOLIBRARY) }
        }, {
          text: 'Cancelar', role: 'cancel', handler: () => { resolve(null); }
        }
      ]
    });
    actionSheet.present();
  });
};

export const getPicture = async (camera: Camera, actionSheetCtrl: ActionSheetController, options: CameraOptions = {}) => {
  options.sourceType = await getPictureSource(camera, actionSheetCtrl);
  if (options.sourceType != null) {
    return await camera.getPicture(options);
  } else {
    return Promise.resolve(null);
  }
}
