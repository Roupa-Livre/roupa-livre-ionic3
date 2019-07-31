import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatDetailsPage } from './chat-details';

import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
	declarations: [
		ChatDetailsPage,
	],
	imports: [
		IonicPageModule.forChild(ChatDetailsPage),
		ComponentsModule,
    DirectivesModule,
    PipesModule
	]

})
export class ChatDetailsPageModule {}
