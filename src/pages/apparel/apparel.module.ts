import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApparelPage } from './apparel';

@NgModule({
	declarations: [
		ApparelPage,
	],
	imports: [
		IonicPageModule.forChild(ApparelPage),
	],
})
export class ApparelPageModule {}
