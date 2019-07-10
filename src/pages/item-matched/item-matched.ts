import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import User from '../../models/user';
import Chat from '../../models/chat';
import { LoginServiceProvider } from '../../services/login-service';

@IonicPage()
@Component({
	selector: 'page-item-matched',
	templateUrl: 'item-matched.html',
})
export class ItemMatchedPage {

  public user: any;
  public chat: Chat;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
    public viewCtrl: ViewController,
    private loginService: LoginServiceProvider,
	) {
    this.chat = this.navParams.data.chat;
    this.user = this.loginService.user();
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
	}

	// CLICK EVENTS
	goToChat() {
		this.viewCtrl.dismiss({ page: 'ChatDetailsPage', params: { id: this.chat.id, chat: this.chat } });
	}

	close() {
		this.viewCtrl.dismiss(false);
	}
}
