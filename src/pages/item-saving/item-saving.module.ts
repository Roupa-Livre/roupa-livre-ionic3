import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSavingPage } from './item-saving';

@NgModule({
  declarations: [
    ItemSavingPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemSavingPage),
  ],
})
export class ItemSavingPageModule {}
