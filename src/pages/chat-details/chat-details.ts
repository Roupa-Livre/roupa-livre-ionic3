import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { ChatServiceProvider } from './../../providers/chat-service/chat-service';

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

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private chatService: ChatServiceProvider
	) {
		this.isNewMatch = this.navParams.get('isNewMatch');
		this.init();
	}

	init() {
		if (!this.isNewMatch) {
			this.chatService.getChatHistory()
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
	sendText() {
		this.messages.push({
			isMe: true,
			type: 'text',
			body: this.typingMessage,
			timestamp: 'Mar 13, 2018 9:55am'
		});
		this.typingMessage = '';

		this.scrollToBottom();
		this.receiveMessage();
	}

	receiveMessage() {
		// TODO : CHANGE THIS TO A WS
		setTimeout(() => {
			this.messages.push({
				isMe: false,
				avatar: 'assets/img/hieu.png',
				type: 'text',
				body: 'Nice. Keep typing dude',
				timestamp: 'Oct 10, 2017 9:55am'
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
