import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemFormPage } from './item-form';

@NgModule({
	declarations: [
		ItemFormPage,
	],
	imports: [
		IonicPageModule.forChild(ItemFormPage),
	],
})
export class ItemFormPageModule {}
