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
	getChatMessages(id, pageSize = 20) : Promise<ApiArray<any>>{
		return this.getMany<any>(`chat_messages/?chat_id=${id}&page_size=${pageSize}`);
  }

  previousChatMessages(id, baseMessageId, pageSize = 20) : Promise<ApiArray<any>>{
		return this.getMany<any>(`chat_messages/?chat_id=${id}&base_message_id=${baseMessageId}&page_size=${pageSize}`);
  }

  getNextMessages(id, lastReadAt: Date) : Promise<ApiArray<any>>{
		return this.getMany<any>(`chat_messages/?chat_id=${id}&&last_read_at=${lastReadAt.getTime()}`);
  }

  getChat(id: number) : Promise<Chat> {
    return this.getOne(`chats/${id}`);
  }

  getChatByUser(user_id: number) : Promise<Chat> {
    return this.getOne(`chats/active_by_user/${user_id}`);
  }
  getChats(params = {}) {
    return this.getMany(`chats`, params);
  }

}
