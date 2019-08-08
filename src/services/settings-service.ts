import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import Chat from '../models/chat';
import { BaseService } from './base-service';
import { ApiArray } from '../models/api-array';

@Injectable()
export class SettingsServiceProvider extends BaseService {

	// METHODS
	async updateUser(user) {
		const result = await this.put('auth/', user);
		Object.assign(this.tokenService.currentUserData, user);
		return result;
	}

	async updateUserImage(user) {
		const result = await this.post('users/update_image/', user);
		Object.assign(this.tokenService.currentUserData, user);
		return result;
	}	
}
