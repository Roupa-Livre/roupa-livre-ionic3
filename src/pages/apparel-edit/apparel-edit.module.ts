import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApparelEditPage } from './apparel-edit';

@NgModule({
	declarations: [
		ApparelEditPage,
	],
	imports: [
		IonicPageModule.forChild(ApparelEditPage),
	],
})
export class ApparelEditPageModule {}
