import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApparelDetailsPage } from './apparel-details';

@NgModule({
	declarations: [
		ApparelDetailsPage,
	],
	imports: [
		IonicPageModule.forChild(ApparelDetailsPage),
	],
})
export class ApparelDetailsPageModule {}
