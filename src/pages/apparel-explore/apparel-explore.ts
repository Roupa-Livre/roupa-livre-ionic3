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
	selector: 'page-apparel-explore',
	templateUrl: 'apparel-explore.html'
})
export class ApparelExplorePage {

	// VARS
	@ViewChild('cardStack') swingStack: SwingStackComponent;
	@ViewChildren('card') swingCards: QueryList<SwingCardComponent>;

	cards: any[];
	stackConfig: StackConfig;
	apparels: any[];
	isLoading: boolean = true;

	// CONSTRUCTOR
	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public apparelProvider: ApparelServiceProvider,
	) {
		this.init();
	}

	init() {
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

	// CARDS EVENTS
	onItemMove(element, x, y, r) {
		// CALLED WHENEVER WE DRAG AN ELEMENT

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

	addNewCard() {
		// ADD NEW CARDS TO OUR ARRAY

		let difference = _.difference(this.apparels, this.cards);
		let randomIndex = Math.floor(Math.random() * (difference.length));

		this.cards.push(difference[randomIndex]);
	}

	// SWIPE EVENTS
	disliked() {
		this.addNewCard();
		let removedCard = this.cards.shift();
	}

	liked() {
		this.addNewCard();
		let removedCard = this.cards.shift();

		this.checkMatching(removedCard);
	}

	checkMatching(card) {
		// TODO : CHANGE HOW VERIFY IF IS MATCHED
		if (card.title == 'Sapatos') {
			let modal = this.modalCtrl.create('ApparelMatchedPage');
			modal.present();
		}
	}

	trackByFn(index, item) {
		return item.id;
	}

	// CLICK EVENTS
	goToMenu() {
		this.navCtrl.push('MenuPage', {}, {
			direction: 'back'
		});
	}

	goToMessaging() {
		this.navCtrl.push('ChatMainPage', {}, {
			direction: 'forward'
		});
	}

	openApparelDetails() {
		let modal = this.modalCtrl.create('ApparelDetailsPage');

		modal.present();
	}

}
