import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ExplorePage } from './explore';

import { ElasticModule } from 'ng-elastic';
import { SwingModule } from 'angular2-swing';

@NgModule({
	declarations: [
		ExplorePage,
	],
	imports: [
		IonicPageModule.forChild(ExplorePage),
		SwingModule,
		ElasticModule,
	],
	entryComponents: [
		ExplorePage
	]
})
export class ExplorePageModule {}
