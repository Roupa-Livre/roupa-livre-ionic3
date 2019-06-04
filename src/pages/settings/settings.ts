import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {
	profileImages: any[];

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public imagePicker: ImagePicker,
		public app: App ) {
			this.profileImages = [
				'assets/img/dummy/hieu.png',
				'assets/img/dummy/hieu.png',
				'assets/img/dummy/hieu.png',
				'assets/img/dummy/hieu.png',
				'assets/img/dummy/hieu.png',
				''
			]
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
	}

	close() {
		this.viewCtrl.dismiss();
	}

	openPhotoPicker(index) {
		this.imagePicker.getPictures({ maximumImagesCount: 1 })
			.then((results) => {
				this.profileImages[index] = results[0];
			}, (err) => { });
	}

	removeImage(index) {
		this.profileImages[index] = '';
	}

}
