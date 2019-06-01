import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PermissionNotificationPage } from './permission-notification';

@NgModule({
  declarations: [
    PermissionNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(PermissionNotificationPage),
  ],
})
export class PermissionNotificationPageModule {}
