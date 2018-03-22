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

	@ViewChild('cardStack') swingStack: SwingStackComponent;
	@ViewChildren('card') swingCards: QueryList<SwingCardComponent>;

	cards: any[];
	stackConfig: StackConfig;
	apparels: any[];
	isLoading: boolean = true;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public apparelProvider: ApparelServiceProvider,
	) {
		this.stackConfig = {
			// Default setting only allows UP, LEFT and RIGHT so you can override this as below
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

	ngAfterViewInit() {
		this.cards = [];
		this.apparels = [];

		setTimeout(() => {
			this.isLoading = false;

			this.apparelProvider.getApparels()
			.then((apparels: any[]) => {
				this.apparels = apparels;

				this.addNewCard();
				this.addNewCard();
			});

		}, 3000);
	}

	// Called whenever we drag an element
	onItemMove(element, x, y, r) {
		let nope = element.querySelector('.stamp-nope');
		let like = element.querySelector('.stamp-like');
		let caculatedValue = Math.min(100, Math.abs(x) - 20) / 100;// 0 - 1

		if (x < 0 && Math.abs(x) > 20) {
			nope.style.opacity = caculatedValue;
		} else {
			like.style.opacity = caculatedValue;
		}

		element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;

		// Zoom effect for the cards underneath
		let cardBehind = this.swingCards.toArray()[1].getNativeElement();
		cardBehind.style['transform'] = `scale(${0.94 + 0.06 * caculatedValue}, ${0.94 + 0.06 * caculatedValue})`;
	}

	// Add new cards to our array
	addNewCard() {
		let difference = _.difference(this.apparels, this.cards);
		let randomIndex = Math.floor(Math.random() * (difference.length));

		this.cards.push(difference[randomIndex]);

		console.info('EXPLOREPAGE - ADDNEWCARD - CURRENT STACK : ', this.cards.map(c => c.title));
	}

	disliked() {
		this.addNewCard();
		let removedCard = this.cards.shift();

		console.log('EXPLOREPAGE - DISLIKED - YOU DISLIKED : ' + removedCard.title);
	}

	liked() {
		this.addNewCard();
		let removedCard = this.cards.shift();
		this.checkMatching(removedCard);

		console.log('EXPLOREPAGE - LIKED - YOU LIKED : ' + removedCard.title);
	}

	checkMatching(card) {
		if (card.title == 'Sapatos') {
			let modal = this.modalCtrl.create('MatchedPage');
			modal.present();
		}
	}

	goToMe() {
		this.navCtrl.push('MePage', {}, {
			direction: 'back'
		});
	}

	goToMessaging() {
		this.navCtrl.push('MessagingPage', {}, {
			direction: 'forward'
		});
	}

	openProfile(isMe) {
		let modal = this.modalCtrl.create('ProfilePage', {isMe: isMe});
		modal.present();
	}

	getMoreCards() {
		if (this.cards.length == 0) {
			this.addNewCard();
		}
	}

	trackByFn(index, item) {
		return item.id;
	}
}
