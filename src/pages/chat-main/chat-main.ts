import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthPage } from '../auth-page';
import { ChatServiceProvider } from '../../services/chat-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { ItemServiceProvider } from '../../services/item-service';
import { AnalyticsService } from '../../services/analytics-service';

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
  allMatchedApparels;
  searchTerm;

	// CONSTRUCTOR
	constructor(
    protected navCtrl: NavController,
    protected navigationService: NavigationServiceProvider,
    private chatService: ChatServiceProvider,
    private itemService: ItemServiceProvider,
    private analyticsService: AnalyticsService) {
    super(navCtrl, navigationService);

  }

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
    const params:any = { };
    return Promise.all([
      this.reloadChats(params),
      this.reloadMatched(params),
    ]);
  }

  ionViewDidEnter() {
    this.analyticsService.trackPage('chat-main');
  }

  async reloadChats(params: { term: string }) {
    try {
      this.loading = true;
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

  async reloadMatched(params: { term: string }) {
    try {
      this.loadingMatched = true;
      this.matchedApparels = [];
      this.matchedApparels = await this.itemService.getMatched(params);
      if (!params.term) {
        this.allMatchedApparels = this.matchedApparels;
      }
    } finally {
      this.loadingMatched = false;
    }
  }

  onSearchInput(ev) {
    if (this.searchTerm && this.searchTerm.length > 0) {
      const params:any = { }
      if (this.searchTerm && this.searchTerm.length > 3) {
        params.term = this.searchTerm;
      }
      return Promise.all([
        this.reloadChats(params),
        this.reloadMatched(params),
      ]);
    }
  }

  onSearchClear(ev) {
    this.chats = this.allChats;
    this.matchedApparels = this.allMatchedApparels;
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
