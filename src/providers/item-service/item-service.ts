import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemServiceProvider {

	// CONSTRUCTOR
	constructor(
		public http: Http
	) {
	}

	// METHODS
	getItems() {
		return new Promise(resolve => {
			let data = [
				{
					id: 1,
					title: 'Vestido',
					size: 'P',
					description: 'descriçao detalhada do vestuário',
					tags: '#tag1 #tag2 #tag3 #tag4',
					profile_image_url: 'assets/img/dummy/camisa.jpg'
				},
				{
					id: 2,
					title: 'Blusa',
					size: 'XG',
					description: 'descriçao detalhada do vestuário',
					tags: '#tag1 #tag2 #tag3 #tag4',
					profile_image_url: 'assets/img/dummy/blusa.jpg'
				},
				{
					id: 3,
					title: 'Turbante',
					size: 'M',
					description: 'descriçao detalhada do vestuário',
					tags: '#tag1 #tag2 #tag3 #tag4',
					profile_image_url: 'assets/img/dummy/turbante.jpg'
				},
				{
					id: 4,
					title: 'Sapatos',
					size: '38',
					description: 'descriçao detalhada do vestuário',
					tags: '#tag1 #tag2 #tag3 #tag4',
					profile_image_url: 'assets/img/dummy/camisa2.jpg'
				},
				{
					id: 5,
					title: 'Saia',
					size: '36',
					description: 'descriçao detalhada do vestuário',
					tags: '#tag1 #tag2 #tag3 #tag4',
					profile_image_url: 'assets/img/dummy/turbante.jpg'
				},
				{
					id: 6,
					title: 'Camisa Social',
					size: '4',
					description: 'descriçao detalhada do vestuário',
					tags: '#tag1 #tag2 #tag3 #tag4',
					profile_image_url: 'assets/img/dummy/camisa2.jpg'
				}
			];

			// TODO : IMPLEMENTS WS USE TO GET DATA

			resolve(data);
		});
	}

}
