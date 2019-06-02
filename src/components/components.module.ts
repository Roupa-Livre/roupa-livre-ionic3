import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { AppHeaderComponent } from './app-header/app-header';

import { DemoAvatarComponent } from './demo-avatar/demo-avatar';
import { GiphyComponent } from './giphy/giphy';
import { NlbrPipe } from './giphy/nlbr.pipe';

@NgModule({
	declarations: [
    AppHeaderComponent,
    DemoAvatarComponent,
		GiphyComponent,
		NlbrPipe,
	],
	imports: [
		HttpModule,
		IonicModule
	],
	entryComponents: [
		DemoAvatarComponent,
		GiphyComponent
	],
	exports: [
    AppHeaderComponent,
    DemoAvatarComponent,
		GiphyComponent,
		NlbrPipe,
	]
})
export class ComponentsModule {}
