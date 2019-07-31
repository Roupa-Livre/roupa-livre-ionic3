import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { ChatServiceProvider } from './../../services/chat-service';
import Chat from '../../models/chat';
import { AuthPage } from '../auth-page';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { LoginServiceProvider } from '../../services/login-service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@IonicPage()
@Component({
	selector: 'page-chat-details',
	templateUrl: 'chat-details.html',
})
export class ChatDetailsPage extends AuthPage {

	// VARS
	@ViewChild(Content) content: Content;

	typingMessage: string = '';
	messages: any = [];
  chat: Chat = null;
  user;
  lastReadAt: Date;

	// CONSTRUCTOR
	constructor(
    navCtrl: NavController,
    navigationService: NavigationServiceProvider,
    public navParams: NavParams,
    private chatService: ChatServiceProvider,
    private loginService: LoginServiceProvider) {
    super(navCtrl,navigationService)

	}

	async init() {
    this.chat = this.navParams.data.chat;
    this.user = await this.loginService.user();
    this.messages = (await this.chatService.getChatMessages(this.chat.id)).reverse();
    this.lastReadAt = new Date;
    setTimeout(() => {
      this.scrollToBottom();
    }, 400);
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
    this.init();
	}

	// CLICK EVENTS
	async sendMessage() {
		let message = {
			isMe: true,
			message: this.typingMessage,
      chat_id: this.chat.id
		};

		await this.chatService.sendMessage(message)
		this.typingMessage = '';
    this.receiveMessage();

	}

	async receiveMessage() {
		const currentCount = this.messages.length;
    if (currentCount == 0) {
      this.init();
    } else {
      const newMessages = (await this.chatService.getNextMessages(this.chat.id, this.lastReadAt)).reverse();
      this.lastReadAt = new Date;
      if (newMessages.length > 0) {
        Array.prototype.push.apply(this.messages, newMessages);
        setTimeout(() => {
          this.scrollToBottom();
        }, 400);
      }
    }
	}

	// SCROLL METHODS
	scrollToBottom() {
		// this.content.resize();
		this.content.scrollToBottom(350);
	}

}
