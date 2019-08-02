import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemListPage } from './item-list';

import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ItemListPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemListPage),
    PipesModule
  ],
})
export class ItemListPageModule {}
