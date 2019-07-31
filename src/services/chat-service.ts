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

  getNextMessages(id, lastReadAt: Date) : Promise<ApiArray<any>>{
		return this.getMany<any>(`chat_messages/?chat_id=${id}&&last_read_at=${lastReadAt.getTime()}`);
  }

  getChat(id: number) : Promise<Chat> {
    return this.getOne(`chats/${id}`);
  }
  getChats() {
    return this.getMany(`chats`);
  }

}
