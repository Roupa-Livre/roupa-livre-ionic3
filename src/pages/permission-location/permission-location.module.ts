import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PermissionLocationPage } from './permission-location';

@NgModule({
  declarations: [
    PermissionLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(PermissionLocationPage),
  ],
})
export class PermissionLocationPageModule {}
