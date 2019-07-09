import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemMatchedPage } from './item-matched';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		ItemMatchedPage,
	],
	imports: [
    IonicPageModule.forChild(ItemMatchedPage),
    PipesModule,
	],
})
export class ItemMatchedPageModule {}
