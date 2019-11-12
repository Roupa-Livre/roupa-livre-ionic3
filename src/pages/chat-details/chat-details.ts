import { Component, ElementRef, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';
import Chat from '../../models/chat';
import { AnalyticsService } from '../../services/analytics-service';
import { LoginServiceProvider } from '../../services/login-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { ToastService } from '../../services/toast-service';
import { delay } from '../../shared/utils';
import { AuthPage } from '../auth-page';
import { ChatServiceProvider } from './../../services/chat-service';


@IonicPage()
@Component({
	selector: 'page-chat-details',
	templateUrl: 'chat-details.html',
})
export class ChatDetailsPage extends AuthPage {

	// VARS
	@ViewChild('content') contentArea: Content;
  @ViewChild('messagesList', {read: ElementRef}) messagesList: ElementRef;

	typingMessage: string = '';
	messages: any = [];
  private mutationObserver: MutationObserver;
  chat: Chat = null;
  user;
  lastReadAt: Date;
  loading = false;
  loadingPrevious = false;

	// CONSTRUCTOR
	constructor(
    navCtrl: NavController,
    navigationService: NavigationServiceProvider,
    public navParams: NavParams,
    private chatService: ChatServiceProvider,
    private loginService: LoginServiceProvider,
    private toastService: ToastService,
    private analyticsService: AnalyticsService) {
    super(navCtrl,navigationService)

	}

	async init() {
    this.loading = true;
    try {
      this.chat = this.navParams.data.chat;
      this.user = await this.loginService.user();
      this.messages = (await this.chatService.getChatMessages(this.chat.id)).reverse();
      this.lastReadAt = new Date;
    } finally {
      await delay(1000);
      this.loading = false;
    }
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
    this.mutationObserver = new MutationObserver((mutations) => {
      if (!this.loadingPrevious) {
        // this.contentArea.scrollToBottom();
      }
    });

    this.mutationObserver.observe(this.messagesList.nativeElement, {
        childList: true
    });

    this.init();
  }

  ionViewDidEnter() {
    this.analyticsService.trackPage('chat-details');
  }

	// CLICK EVENTS
	async sendMessage() {
    const loading = await this.toastService.showSimpleLoading("Enviando ...");
    try {
      let message = {
        isMe: true,
        message: this.typingMessage,
        chat_id: this.chat.id
      };

      await this.chatService.sendMessage(message)
      this.analyticsService.trackEvent('message_sent', { chatId: this.chat.id, userId: this.user.id, userName: this.user.name });

      this.typingMessage = '';
      this.receiveMessage();
    } finally {
      loading.dismiss();
    }

	}

	async receiveMessage() {
		const currentCount = this.messages.length;
    if (currentCount == 0) {
      this.init();
    } else {
      try {
        this.loading = true;
        const newMessages = (await this.chatService.getNextMessages(this.chat.id, this.lastReadAt)).reverse();
        this.lastReadAt = new Date;
        if (newMessages.length > 0) {
          Array.prototype.push.apply(this.messages, newMessages);
        }
      } finally {
        await delay(1000);
        this.loading = false;
      }

    }
  }

  async doInfinite(infiniteScroll) {
    const currentCount = this.messages.length;
    if (currentCount > 0 && !this.loading) {
      try {
        this.loading = true;
        this.loadingPrevious = true;
        const baseMessageId = this.messages[0].id;
        const newMessages = (await this.chatService.previousChatMessages(this.chat.id, baseMessageId)).reverse();
        if (newMessages.length > 0) {
          Array.prototype.unshift.apply(this.messages, newMessages);
        }
      } finally {
        infiniteScroll.complete();
        this.loading = false;
        await delay(1000);
        this.loadingPrevious = false;
      }
    } else {
      infiniteScroll.complete();
    }

  }

}
