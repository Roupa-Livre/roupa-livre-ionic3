import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMainPage } from './chat-main';

import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		ChatMainPage,
	],
	imports: [
		IonicPageModule.forChild(ChatMainPage),
    ComponentsModule,
    PipesModule
	]
})
export class ChatMainPageModule {}
