import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

import 'rxjs/Rx';
import * as _ from 'lodash';

import {
	Direction,
	StackConfig,
	Stack,
	Card,
	ThrowEvent,
	DragEvent,
	SwingStackComponent,
	SwingCardComponent } from 'angular2-swing';

import { ApparelServiceProvider } from './../../providers/apparel-service/apparel-service';

@IonicPage()
@Component({
	selector: 'page-explore',
	templateUrl: 'explore.html'
})
export class ExplorePage {

	// VARS
	cards: any[];
	stackConfig: StackConfig;
	apparels: any[];
	isLoading: boolean = true;

	@ViewChild('cardStack') swingStack: SwingStackComponent;
	@ViewChildren('card') swingCards: QueryList<SwingCardComponent>;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public apparelProvider: ApparelServiceProvider,
	) {
		console.log('EXPLORE-PAGE - CONSTRUCTOR');

		this.stackConfig = {
			allowedDirections: [
				Direction.LEFT,
				Direction.RIGHT
			],
			throwOutConfidence: (offsetX, offsetY, element) => {
				return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
			},
			transform: (element, x, y, r) => {
				this.onItemMove(element, x, y, r);
			},
			throwOutDistance: (d) => {
				return 800;
			}
		};

	}

	// LIFECYCLE EVENTS
	ngAfterViewInit() {
		console.log('EXPLORE-PAGE - NGAFTERVIEWINIT');

		this.cards = [];
		this.apparels = [];

		setTimeout(() => {
			console.log('EXPLORE-PAGE - NGAFTERVIEWINIT - SETTIMEOUT');
			this.isLoading = false;

			this.apparelProvider.getApparels()
			.then((apparels: any[]) => {
				console.log('EXPLORE-PAGE - NGAFTERVIEWINIT - GETAPPARELS - APPARELS : ', apparels);

				this.apparels = apparels;

				this.addNewCard();
				this.addNewCard();
			});

		}, 3000);
	}

	// CALLED WHENEVER WE DRAG AN ELEMENT
	onItemMove(element, x, y, r) {
		console.log('EXPLORE-PAGE - ONITEMMOVE');

		let nope = element.querySelector('.stamp-nope');
		let like = element.querySelector('.stamp-like');

		let caculatedValue = Math.min(100, Math.abs(x) - 20) / 100;// 0 - 1

		if (x < 0 && Math.abs(x) > 20) {
			nope.style.opacity = caculatedValue;
		} else {
			like.style.opacity = caculatedValue;
		}

		element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;

		// ZOOM EFFECT FOR THE CARDS UNDERNEATH
		let cardBehind = this.swingCards.toArray()[1].getNativeElement();
		cardBehind.style['transform'] = `scale(${0.94 + 0.06 * caculatedValue}, ${0.94 + 0.06 * caculatedValue})`;
	}

	// ADD NEW CARDS TO OUR ARRAY
	addNewCard() {
		console.log('EXPLORE-PAGE - ADDNEWCARD');

		let difference = _.difference(this.apparels, this.cards);
		let randomIndex = Math.floor(Math.random() * (difference.length));

		this.cards.push(difference[randomIndex]);

		console.info('EXPLORE-PAGE - ADDNEWCARD - CURRENT STACK : ', this.cards.map(c => c.title));
	}

	// CLICK EVENTS
	disliked() {
		console.log('EXPLORE-PAGE - DISLIKED');

		this.addNewCard();
		let removedCard = this.cards.shift();

		console.log('EXPLORE-PAGE - DISLIKED - YOU DISLIKED : ', removedCard.title);
	}

	liked() {
		console.log('EXPLORE-PAGE - LIKED');

		this.addNewCard();
		let removedCard = this.cards.shift();

		this.checkMatching(removedCard);

		console.log('EXPLORE-PAGE - LIKED - YOU LIKED : ', removedCard.title);
	}

	checkMatching(card) {
		console.log('EXPLORE-PAGE - CHECKMATCHING');

		// TODO : CHANGE HOW VERIFY IF IS MATCHED
		if (card.title == 'Sapatos') {
			console.log('EXPLORE-PAGE - CHECKMATCHING - MATCHED');
			let modal = this.modalCtrl.create('MatchedPage');
			modal.present();
		}
	}

	goToMenu() {
		console.log('EXPLORE-PAGE - GOTOMENU');

		this.navCtrl.push('MenuPage', {}, {
			direction: 'back'
		});
	}

	goToMessaging() {
		console.log('EXPLORE-PAGE - GOTOMESSAGING');

		this.navCtrl.push('MessagingPage', {}, {
			direction: 'forward'
		});
	}

	openProfile(isMe) {
		console.log('EXPLORE-PAGE - OPENPROFILE');

		let modal = this.modalCtrl.create('ProfilePage', {isMe: isMe});
		modal.present();
	}

	trackByFn(index, item) {
		console.log('EXPLORE-PAGE - TRACKBYFN');

		return item.id;
	}
}
