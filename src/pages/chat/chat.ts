import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { ChatServiceProvider } from './../../providers/chat-service/chat-service';

@IonicPage()
@Component({
	selector: 'page-chat',
	templateUrl: 'chat.html',
})
export class ChatPage {

	// VARS
	isNewMatch: boolean = false;
	typingMessage: string = '';
	messages: any[] = [];
	@ViewChild(Content) content: Content;

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
		console.log('CHAT-PAGE - INIT');

		if (!this.isNewMatch) {
			this.chatService.getChatHistory()
			.then((response: any[]) => {
				this.messages = response;
			});
		}
	}

	// LIFECYCLE EVENTS
	ionViewDidLoad() {
		console.log('CHAT-PAGE - IONVIEWDIDLOAD');

		this.scrollBottom();
	}

	// CLICK EVENTS
	sendText() {
		console.log('CHAT-PAGE - SENDTEXT');

		this.messages.push({
			isMe: true,
			type: 'text',
			body: this.typingMessage,
			timestamp: 'Mar 13, 2018 9:55am'
		});
		this.typingMessage = '';

		this.scrollBottom();

		this.receiveMessage();
	}

	receiveMessage() {
		console.log('CHAT-PAGE - RECEIVEMESSAGE');

		// TODO : CHANGE THIS TO A WS
		setTimeout(() => {
			this.messages.push({
				isMe: false,
				avatar: 'assets/img/hieu.png',
				type: 'text',
				body: 'Nice. Keep typing dude',
				timestamp: 'Oct 10, 2017 9:55am'
			});

			this.scrollBottom();
		}, 500);
	}

	// SCROLL METHODS
	scrollBottom() {
		console.log('CHAT-PAGE - SCROLLBOTTOM');

		this.content.resize();
		this.content.scrollTo(0, this.content.scrollHeight, 350);
	}

}
