import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemMatchedPage } from './item-matched';

@NgModule({
	declarations: [
		ItemMatchedPage,
	],
	imports: [
		IonicPageModule.forChild(ItemMatchedPage),
	],
})
export class ItemMatchedPageModule {}
