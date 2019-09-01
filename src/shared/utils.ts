import { ResizeOptions } from "ng2-image-compress";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

export const delay = t => new Promise(resolve => setTimeout(resolve, t));

export const ApparelResizeOptions = new ResizeOptions();
ApparelResizeOptions.Resize_Quality = 90;
ApparelResizeOptions.Resize_Max_Width = 1440;

export const UserResizeOptions = new ResizeOptions();
UserResizeOptions.Resize_Quality = 90;
UserResizeOptions.Resize_Max_Width = 800;
