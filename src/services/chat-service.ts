import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import Chat from '../models/chat';
import { BaseService } from './base-service';
import { ApiArray } from '../models/api-array';

@Injectable()
export class ChatServiceProvider extends BaseService {
	
	// METHODS
	sendMessage(message) {
		return new Promise(resolve => {
			const data = { chat_message: Object.assign({}, message) }
			if (message.id > 0) {
				resolve (this.put(`chat_messages/${message.id}`, data));
			} else {
				resolve (this.post('chat_messages', data));
			}
		});
	}

	// METHODS
	getChatMessages(id) : Promise<ApiArray<any>>{
		return this.getMany<any>(`chat_messages/?chat_id=${id}`);
  	}

	getChatHistory(id) {
		return new Promise(resolve => {
			let messages = this.getChatMessages(id);

			// TODO : IMPLEMENTS WS USE TO GET DATA
			// {
			// 	isMe: true,
			// 	type: 'text',
			// 	body: 'Olá',
			// 	timestamp: '10 de Março de 2019'
			// }

			resolve(messages);

		});

  }

  getChat(id: number) : Promise<Chat> {
    return this.getOne(`chats/${id}`);
  }

}
