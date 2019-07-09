import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import Chat from '../models/chat';
import { BaseService } from './base-service';

@Injectable()
export class ChatServiceProvider extends BaseService {

	// METHODS
	sendMessage(message) {
		return new Promise(resolve => {
			// TODO : CREATE REAL METHOD
			resolve(true);
		});
	}

	getChatHistory() {
		return new Promise(resolve => {
			let messages = [
				{
					isMe: true,
					type: 'text',
					body: 'Olá',
					timestamp: '10 de Março de 2019'
				},
				{
					isMe: false,
					avatar: 'assets/img/dummy/hieu.png',
					type: 'text',
					body: 'Olá tudo bom?',
					timestamp: '10 de Março de 2019'
				},
				{
					isMe: true,
					type: 'text',
					body: 'Gostei do seu vestido',
					timestamp: '10 de Março de 2019'
				},
				{
					isMe: false,
					avatar: 'assets/img/dummy/hieu.png',
					type: 'text',
					body: 'E eu da sua bolsa',
					timestamp: '10 de Março de 2019'
				},
				{
					isMe: true,
					type: 'text',
					body: 'Vamos trocar?',
					timestamp: '10 de Março de 2019'
				},
				{
					isMe: false,
					avatar: 'assets/img/dummy/hieu.png',
					type: 'text',
					body: 'Vamos sim...',
					timestamp: '10 de Março de 2019'
				}
			];

			// TODO : IMPLEMENTS WS USE TO GET DATA

			resolve(messages);

		});

  }

  getChat(id: number) : Promise<Chat> {
    return this.getOne(`chats/${id}`);
  }

}
