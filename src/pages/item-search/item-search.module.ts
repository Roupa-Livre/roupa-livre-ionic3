import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemSearchPage } from './item-search';
import { IonTagsInputModule } from 'ionic-tags-input';

@NgModule({
	declarations: [
    ItemSearchPage,
	],
	imports: [
		IonicPageModule.forChild(ItemSearchPage),
    IonTagsInputModule,
	],
})
export class ItemSearchPageModule {}
