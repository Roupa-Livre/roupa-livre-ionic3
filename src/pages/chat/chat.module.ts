import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatPage } from './chat';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
	declarations: [
		ChatPage,
	],
	imports: [
		IonicPageModule.forChild(ChatPage),
		ComponentsModule,
		DirectivesModule
	]

})
export class ChatPageModule {}
