import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApparelServiceProvider {

	constructor(
		public http: Http
	) {
		console.log('APPARELSERVICEPROVIDER - CONSTRUCTOR');
	}

	getApparels() {
		return new Promise(resolve => {
			console.log('APPARELSERVICEPROVIDER - GETAPPARELS');

			let data = [
				{
					id: 1,
					title: 'Vestido',
					size: 'P',
					description: 'descriçao detalhada do vestuário',
					profile_image_url: 'assets/img/hieu.png'
				},
				{
					id: 2,
					title: 'Blusa',
					size: 'XG',
					description: 'descriçao detalhada do vestuário',
					profile_image_url: 'assets/img/adam.png'
				},
				{
					id: 3,
					title: 'Casaco',
					size: 'M',
					description: 'descriçao detalhada do vestuário',
					profile_image_url: 'assets/img/ben.png'
				},
				{
					id: 4,
					title: 'Sapatos',
					size: '38',
					description: 'descriçao detalhada do vestuário',
					profile_image_url: 'assets/img/max.png'
				},
				{
					id: 5,
					title: 'Saia',
					size: '36',
					description: 'descriçao detalhada do vestuário',
					profile_image_url: 'assets/img/mike.png'
				},
				{
					id: 6,
					title: 'Camisa Social',
					size: '4',
					description: 'descriçao detalhada do vestuário',
					profile_image_url: 'assets/img/perry.png'
				}
			];

			// TODO : IMPLEMENTS WS USE TO GET DATA

			resolve(data);
		});
	}

}
