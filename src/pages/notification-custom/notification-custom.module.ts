import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationCustomPage } from './notification-custom';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		NotificationCustomPage,
	],
	imports: [
    IonicPageModule.forChild(NotificationCustomPage),
    PipesModule,
	],
})
export class NotificationCustomPageModule {}
