import { NgModule } from '@angular/core';
import { UserImageSourcePipe } from './user-image-source/user-image-source';
import { ShortNamePipe } from './short-name/short-name';
import { DistanceToStringPipe } from './distance-to-string/distance-to-string';
import { ItemImageBgSourcePipe } from './item-image-source/item-image-bg-source';
import { ItemImageSourcePipe } from './item-image-source/item-image-source';
import { TimeToStringPipe } from './time-to-string/time-to-string';
import { GenderNamePipe } from './gender-name/gender-name';
import { AgeInfoNamePipe } from './age-info-name/age-info-name';
import { NotDestroyedPipe } from './not-destroyed/not-destroyed';
import { ImageSourcePipe } from './item-image-source/image-source';
@NgModule({
	declarations: [UserImageSourcePipe,
    ShortNamePipe,
    DistanceToStringPipe,
    ItemImageBgSourcePipe,
    ItemImageSourcePipe,
    ImageSourcePipe,
    TimeToStringPipe,
    GenderNamePipe,
    AgeInfoNamePipe,
    NotDestroyedPipe],
	imports: [],
	exports: [UserImageSourcePipe,
    ShortNamePipe,
    DistanceToStringPipe,
    ItemImageBgSourcePipe,
    ItemImageSourcePipe,
    ImageSourcePipe,
    TimeToStringPipe,
    GenderNamePipe,
    AgeInfoNamePipe,
    NotDestroyedPipe]
})
export class PipesModule {}
