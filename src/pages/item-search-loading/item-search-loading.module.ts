import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSearchLoadingPage } from './item-search-loading';

@NgModule({
  declarations: [
    ItemSearchLoadingPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemSearchLoadingPage),
  ],
})
export class ItemSearchLoadingPageModule {}
