import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatDetailsPage } from './chat-details';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
	declarations: [
		ChatDetailsPage,
	],
	imports: [
		IonicPageModule.forChild(ChatDetailsPage),
		ComponentsModule,
		DirectivesModule
	]

})
export class ChatDetailsPageModule {}
