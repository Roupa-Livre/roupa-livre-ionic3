import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhatYouLookForPage } from './what-you-look-for';

@NgModule({
  declarations: [
    WhatYouLookForPage,
  ],
  imports: [
    IonicPageModule.forChild(WhatYouLookForPage),
  ],
})
export class WhatYouLookForPageModule {}
