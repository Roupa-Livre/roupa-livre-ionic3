import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
	selector: 'page-item-form',
	templateUrl: 'item-form.html',
})
export class ItemFormPage {

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
			'assets/img/dummy/camisa.jpg',
			'assets/img/dummy/camisa.jpg',
			'assets/img/dummy/camisa.jpg',
			'assets/img/dummy/camisa.jpg',
			'assets/img/dummy/camisa.jpg',
			''
		];
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
	save() {
		// TODO : IMPLMENTS SAVE
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
