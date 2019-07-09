import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemFormPage } from './item-form';
import { PipesModule } from '../../pipes/pipes.module';
import { IonTagsInputModule } from "ionic-tags-input";
import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';


@NgModule({
	declarations: [
		ItemFormPage,
	],
	imports: [
    IonicPageModule.forChild(ItemFormPage),
    PipesModule,
    IonTagsInputModule,
  ],
  providers: [ImageCompressService, ResizeOptions],
})
export class ItemFormPageModule {}
