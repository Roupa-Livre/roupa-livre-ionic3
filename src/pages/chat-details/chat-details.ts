import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { ChatServiceProvider } from './../../services/chat-service';
import Chat from '../../models/chat';

@IonicPage()
@Component({
	selector: 'page-chat-details',
	templateUrl: 'chat-details.html',
})
export class ChatDetailsPage {

	// VARS
	@ViewChild(Content) content: Content;

	isNewMatch: boolean = false;
	typingMessage: string = '';
	messages: any[] = [];
	chat: Chat = null;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private chatService: ChatServiceProvider
	) {
		this.isNewMatch = this.navParams.get('isNewMatch');
		this.chat = this.navParams.data.chat;
		this.init();
	}

	init() {
		if (!this.isNewMatch) {
			this.chatService.getChatHistory(this.chat.id)
			.then((response: any[]) => {
				this.messages = response;
			});
		}
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
		this.scrollToBottom();
	}

	// CLICK EVENTS
	sendMessage() {
		let message = {
			isMe: true,
			message: this.typingMessage,
			chat_id: this.chat.id
		};

		this.chatService.sendMessage(message)
		.then((isSended) => {

			if (isSended) {
				this.messages.push(message);
				this.typingMessage = '';

				this.scrollToBottom();
				this.receiveMessage();
			}
		});

	}

	receiveMessage() {
		// TODO : CHANGE THIS TO A WS
		setTimeout(() => {
			this.messages.push({
				isMe: false,
				avatar: 'assets/img/dummy/hieu.png',
				type: 'text',
				body: 'Show. me conta mais...',
				timestamp: '14 de Março de 2019'
			});

			this.scrollToBottom();
		}, 500);
	}

	// SCROLL METHODS
	scrollToBottom() {
		this.content.resize();
		this.content.scrollTo(0, this.content.scrollHeight, 350);
	}

}
