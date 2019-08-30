import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserItemListPage } from './user-item-list';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    UserItemListPage,
  ],
  imports: [
    IonicPageModule.forChild(UserItemListPage),
    PipesModule
  ],
})
export class UserItemListPageModule {}
