import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-menu',
	templateUrl: 'menu.html',
})
export class MenuPage {
	@ViewChild(Slides) slides: Slides;
	currentSlideIndex: number = 0;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController
	) {
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
		console.log('ionViewDidLoad MePage');
	}

	slideChanged() {
		this.currentSlideIndex = this.slides.getActiveIndex();
	}

	// CLICK EVENTS
	goToExplore() {
		this.navCtrl.push('ExplorePage', {}, {
			direction: 'forward'
		});
	}

	goToSearch() {
		this.navCtrl.push('AboutPage');
	}

	goToMyApparels() {
		this.navCtrl.push('ApparelPage');
	}

	goToAbout() {
		this.navCtrl.push('AboutPage');
	}

}
