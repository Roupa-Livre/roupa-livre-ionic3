import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		SettingsPage,
	],
	imports: [
		IonicPageModule.forChild(SettingsPage),
		ComponentsModule,
		PipesModule
	],
})
export class SettingsPageModule {}
