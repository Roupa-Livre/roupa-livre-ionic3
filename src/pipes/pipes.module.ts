import { NgModule } from '@angular/core';
import { UserImageSourcePipe } from './user-image-source/user-image-source';
import { ShortNamePipe } from './short-name/short-name';
import { DistanceToStringPipe } from './distance-to-string/distance-to-string';
import { ItemImageSourcePipe } from './item-image-source/item-image-source';
import { TimeToStringPipe } from './time-to-string/time-to-string';
import { GenderNamePipe } from './gender-name/gender-name';
import { AgeInfoNamePipe } from './age-info-name/age-info-name';
@NgModule({
	declarations: [UserImageSourcePipe,
    ShortNamePipe,
    DistanceToStringPipe,
    ItemImageSourcePipe,
    TimeToStringPipe,
    GenderNamePipe,
    AgeInfoNamePipe],
	imports: [],
	exports: [UserImageSourcePipe,
    ShortNamePipe,
    DistanceToStringPipe,
    ItemImageSourcePipe,
    TimeToStringPipe,
    GenderNamePipe,
    AgeInfoNamePipe]
})
export class PipesModule {}
