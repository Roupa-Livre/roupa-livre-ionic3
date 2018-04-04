import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
	selector: 'page-apparel-edit',
	templateUrl: 'apparel-edit.html',
})
export class ApparelEditPage {

	// VARS
	profileImages: any[];

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public imagePicker: ImagePicker,
		public app: App
	) {
		this.init();
	}

	init() {
		this.profileImages = [
			'assets/img/hieu.png',
			'assets/img/hieu.png',
			'assets/img/hieu.png',
			'assets/img/hieu.png',
			'assets/img/hieu.png',
			''
		];
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
	close() {
		this.viewCtrl.dismiss();
	}

	openPhotoPicker(index) {
		this.imagePicker.getPictures({ maximumImagesCount: 1 })
		.then((results) => {
			this.profileImages[index] = results[0];
		}, (err) => {

		});
	}

	removeImage(index) {
		this.profileImages[index] = '';
	}

}
