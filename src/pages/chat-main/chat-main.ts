import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthPage } from '../auth-page';
import { ChatServiceProvider } from '../../services/chat-service';
import { NavigationServiceProvider } from '../../services/navigation-service';

@IonicPage()
@Component({
	selector: 'page-chat-main',
	templateUrl: 'chat-main.html',
})
export class ChatMainPage extends AuthPage {

  chats;

	// CONSTRUCTOR
	constructor(
    protected navCtrl: NavController,
    protected navigationService: NavigationServiceProvider,
    private chatService: ChatServiceProvider) {
    super(navCtrl, navigationService);

  }

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
   this.chatService.getChats().then(chats => {
     this.chats = chats;
   });
	}

	// CLICK EVENTS
	goToChatDetails(chat) {
		this.navCtrl.push('ChatDetailsPage', { chat, id: chat.id });
	}

	goToExplore() {
		this.navCtrl.popToRoot();
	}

}
