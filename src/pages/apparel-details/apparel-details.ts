import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Slides, ViewController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-apparel-details',
		templateUrl: 'apparel-details.html',
})
export class ApparelDetailsPage {

	// VARS
	@ViewChild(Slides) slides: Slides;

	currentSlideIndex: number = 0;
	slideImages: any[] = [
		{ url: 'assets/img/hieu.png' },
		{ url: 'assets/img/adam.png' },
		{ url: 'assets/img/max.png' }
	];
	isMe: boolean = true;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public statusBar: StatusBar,
		public platform: Platform,
		public modalCtrl: ModalController,
		public app: App
	) {
		this.isMe = (typeof this.navParams.get('isMe') == 'undefined') ? true : this.navParams.get('isMe');
		this.init();
	}

	init() {
		this.platform.ready()
		.then(() => {
			this.statusBar.hide();
		});
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	slideChanged() {
		this.currentSlideIndex = this.slides.getActiveIndex();
	}

	// CLICK EVENTS
	close() {
		this.statusBar.show();
		this.viewCtrl.dismiss();
	}

	edit() {
		this.close();
		let modal = this.modalCtrl.create('ApparelEditPage');
		modal.present();
	}

}
