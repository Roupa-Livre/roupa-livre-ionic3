import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from '../../pipes/pipes.module';
import { TagItemListPage } from './tag-item-list';

@NgModule({
  declarations: [
    TagItemListPage,
  ],
  imports: [
    IonicPageModule.forChild(TagItemListPage),
    PipesModule
  ],
})
export class TagItemListPageModule {}
