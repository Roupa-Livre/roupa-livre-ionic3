import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ApparelExplorePage } from './apparel-explore';

import { ElasticModule } from 'ng-elastic';
import { SwingModule } from 'angular2-swing';

@NgModule({
	declarations: [
		ApparelExplorePage,
	],
	imports: [
		IonicPageModule.forChild(ApparelExplorePage),
		SwingModule,
		ElasticModule,
	],
	entryComponents: [
		ApparelExplorePage
	]
})
export class ApparelExplorePageModule {}
