import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, ModalController, ActionSheetController } from 'ionic-angular';

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

import { AuthPage } from '../auth-page';
import { LoginServiceProvider } from '../../services/login-service';
import { ItemSearcherService } from '../../services/item-searcher-service';
import { Apparel } from '../../models/apparel';
import { ItemServiceProvider } from '../../services/item-service';
import { ChatServiceProvider } from '../../services/chat-service';

@IonicPage()
@Component({
	selector: 'page-item-explore',
	templateUrl: 'item-explore.html'
})
// export class ItemExplorePage extends AuthPage {
export class ItemExplorePage {

	// VARS
	@ViewChild('cardStack') swingStack: SwingStackComponent;
	@ViewChildren('card') swingCards: QueryList<SwingCardComponent>;

	stackConfig: StackConfig;
  items: Apparel[] = [];
	isLoading: boolean = true;

	// CONSTRUCTOR
	constructor(
		private loginService: LoginServiceProvider,
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		public actionSheetCtrl: ActionSheetController,
    public itemSearcher: ItemSearcherService,
    private itemService: ItemServiceProvider,
    private chatService: ChatServiceProvider,
	) {
		//super(loginService);
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
		this.items = [];

		this.loginService.validate().then(() => {
      this.loadMore();
    })
  }

  async loadMore() {
    this.isLoading = true;
    try {
      const items = await this.itemSearcher.getNextItems();
      Array.prototype.push.apply(this.items, items);
    } finally {
      this.isLoading = false;
    }
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
    const cardsArray = this.swingCards.toArray();
    if (cardsArray.length > 1) {
      let cardBehind = cardsArray[1].getNativeElement();
      cardBehind.style['transform'] = `scale(${0.94 + 0.06 * caculatedValue}, ${0.94 + 0.06 * caculatedValue})`;
    }
  }

  private async goToNext() {
    if (this.items.length <= 2) {
      await this.loadMore();
    }

    // Item not found
    if (this.items.length <= 1) {
      let modalNotFound = this.modalCtrl.create('ItemNotFoundPage');
			modalNotFound.present();
    } else {
      this.items.shift();
    }
  }

	// SWIPE EVENTS
	async disliked() {
    const item = this.items[0];
    await this.doDislike(item);
	}

	async liked() {
    const item = this.items[0];
    await this.doLike(item);
  }

  private async doLike(item) {
    this.isLoading = true;
    try {
      const likeResult = await this.itemService.rate(item, true);
      const goNext = !(await this.checkMatching(item, likeResult));
      if (goNext)
        await this.goToNext();
    } finally {
      this.isLoading = false;
    }
  }

  private async doDislike(item) {
    const dislikeResult = await this.itemService.rate(item, false);
    // console.log('deslikeResult', dislikeResult);
    await this.goToNext();
  }

	private async checkMatching(item, likeResult) : Promise<boolean> {
    if (likeResult.chat) {
      return new Promise<boolean>((resolve, reject) => {
        this.chatService.getChat(likeResult.chat.id).then(chat => {
          let modalMatched = this.modalCtrl.create('ItemMatchedPage', { item, chat });
          modalMatched.onDidDismiss(resolve);
          modalMatched.present().catch(reject);
        }, reject);
      });
    }
    return false;
	}

	trackByFn(index, item) {
		return item.id;
	}

	// CLICK EVENTS
	goToProfile() {
		this.navCtrl.push('ProfilePage', {}, {
			direction: 'back'
		});
	}

	goToMessaging() {
		this.navCtrl.push('ChatMainPage', {}, {
			direction: 'forward'
		});
	}

	openItemDetails(item) {
    let modal = this.modalCtrl.create('ItemDetailsPage', { item,
      likeCallback: item => {
        this.doLike(item);
      },
      dislikeCallback: item => {
        this.doLike(item);
      }
    });
		modal.present();
	}

	doComplaint() {
		let complaintActionSheet = this.actionSheetCtrl.create({
			title: 'Deseja denunciar esta peça?',
			buttons: [
				{
					text: 'Não é uma peça',
					handler: () => {
						console.log('Option 1 clicked');
					}
				}, {
					text: 'É ofensivo',
					handler: () => {
						console.log('Option 2 clicked');
					}
				}, {
					text: 'É spam',
					handler: () => {
						console.log('Option 3 clicked');
					}
				}, {
					text: 'Outro motivo',
					handler: () => {
						console.log('Option 4 clicked');
					}
				}, {
					text: 'Cancelar',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});

		complaintActionSheet.present();
	}

}
