import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatServiceProvider {

	constructor(
		public http: Http
	) {
	}

	getChatHistory() {
		return new Promise(resolve => {
			let messages = [
				{
					isMe: true,
					type: 'text',
					body: 'Olá',
					timestamp: 'Mar 10, 2018 9:47am'
				},
				{
					isMe: false,
					avatar: 'assets/img/hieu.png',
					type: 'text',
					body: 'Olá tudo bom?',
					timestamp: 'Mar 10, 2018 9:48am'
				},
				{
					isMe: true,
					type: 'text',
					body: 'Gostei do seu vestido',
					timestamp: 'Mar 10, 2018 9:50am'
				},
				{
					isMe: false,
					avatar: 'assets/img/hieu.png',
					type: 'text',
					body: 'E eu da sua bolsa',
					timestamp: 'Mar 10, 2018 9:52am'
				},
				{
					isMe: true,
					type: 'text',
					body: 'Vamos trocar?',
					timestamp: 'Mar 10, 2018 9:53am'
				},
				{
					isMe: false,
					avatar: 'assets/img/hieu.png',
					type: 'text',
					body: 'Vamos sim...',
					timestamp: 'Mar 10, 2018 9:53am'
				}
			];

			// TODO : IMPLEMENTS WS USE TO GET DATA

			resolve(messages);

		});

	}

}
