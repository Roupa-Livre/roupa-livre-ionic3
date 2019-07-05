import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemExplorePage } from './item-explore';

import { ElasticModule } from 'ng-elastic';
import { SwingModule } from 'angular2-swing';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		ItemExplorePage,
	],
	imports: [
		IonicPageModule.forChild(ItemExplorePage),
		SwingModule,
    ElasticModule,
    ComponentsModule,
    PipesModule
	],
	entryComponents: [
		ItemExplorePage
	]
})
export class ItemExplorePageModule {}
