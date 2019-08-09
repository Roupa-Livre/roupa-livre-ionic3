import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthPage } from '../auth-page';
import { ChatServiceProvider } from '../../services/chat-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { ItemServiceProvider } from '../../services/item-service';

@IonicPage()
@Component({
	selector: 'page-chat-main',
	templateUrl: 'chat-main.html',
})
export class ChatMainPage extends AuthPage {

  loading;
  chats;
  allChats;
  loadingMatched;
  matchedApparels;
  searchTerm;

	// CONSTRUCTOR
	constructor(
    protected navCtrl: NavController,
    protected navigationService: NavigationServiceProvider,
    private chatService: ChatServiceProvider,
    private itemService: ItemServiceProvider) {
    super(navCtrl, navigationService);

  }

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
    return Promise.all([
      this.reloadChats(),
      this.reloadMatched(),
    ]);
  }

  async reloadChats() {
    try {
      this.loading = true;
      const params:any = { }
      if (this.searchTerm && this.searchTerm.length > 3) {
        params.term = this.searchTerm;
      }
      this.chats = [];
      this.chats = await this.chatService.getChats(params);
      if (!params.term) {
        this.allChats = this.chats;
      }
      return this.chats;

    } finally {
      this.loading = false;
    }
  }

  async reloadMatched() {
    try {
      this.loadingMatched = true;
      this.matchedApparels = [];
      this.matchedApparels = await this.itemService.getMatched();
    } finally {
      this.loadingMatched = false;
    }
  }

  onSearchInput(ev) {
    if (this.searchTerm && this.searchTerm.length > 0) {
      this.reloadChats();
    }
  }

  onSearchClear(ev) {
    this.chats = this.allChats;
  }

	// CLICK EVENTS
	goToChatDetails(chat) {
		this.navCtrl.push('ChatDetailsPage', { chat, id: chat.id });
  }

  async goToApparelChat(apparel) {
    const chat = await this.chatService.getChatByUser(apparel.user_id);
		this.goToChatDetails(chat);
	}

	goToExplore() {
		this.navCtrl.popToRoot();
	}

}
