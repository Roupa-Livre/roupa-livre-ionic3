import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ImagePicker } from '@ionic-native/image-picker/ngx';

@IonicPage()
@Component({
	selector: 'page-item-form',
	templateUrl: 'item-form.html',
})
export class ItemFormPage {

	// VARS
  profileImages: any[];

  public category: string = "";
  public type: string = "";
  public age: string = "";
  public size: string = "";
  public modeling: string = "";
  public pattern: string = "";
  public color: string = "";

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
			'assets/img/dummy/blusa.jpg',
			'assets/img/dummy/blusa.jpg',
			'assets/img/dummy/blusa.jpg',
			''
    ];

    this.category = "1";
    this.type = "1";
    this.age = "1";
    this.size = "1";
    this.modeling = "1";
    this.pattern = "1";
    this.color = "1";
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
	save() {
		// TODO : IMPLEMENTAR SAVE
		this.viewCtrl.dismiss();
  }

  delete() {
		// TODO : IMPLEMENTAR DELETE
		this.viewCtrl.dismiss();
  }

  cancel() {
		// TODO : IMPLEMENTAR CANCEL
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
