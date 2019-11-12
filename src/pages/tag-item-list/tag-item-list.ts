import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { AnalyticsService } from '../../services/analytics-service';
import { ItemServiceProvider } from '../../services/item-service';
import { NavigationServiceProvider } from '../../services/navigation-service';
import { TagServiceProvider } from '../../services/tag-service';

@IonicPage()
@Component({
  selector: 'page-tag-item-list',
  templateUrl: 'tag-item-list.html',
})
export class TagItemListPage {

  // VARS
  public tempImage: string = "assets/img/dummy/blusa.jpg";
  public tag;
  public items;
  public count;
  public safeHTML;

	isLoading: boolean = true;


  // CONSTRUCTOR
  constructor(
    private navigationService: NavigationServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
		public viewCtrl: ViewController,
		public statusBar: StatusBar,
    public itemsService: ItemServiceProvider,
    private tagService: TagServiceProvider,
    public modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    private analyticsService: AnalyticsService
  ) {
    this.tag = this.navParams.data.tag;
    this.loadApparels();

  }

  async loadApparels() {
    this.tag = (await this.tagService.getTag(this.tag.id)) || this.tag;
    console.log(this.tag);
    this.items = await this.itemsService.findApparelsByTag(this.tag.id)
    this.count = this.items.length;
    if (this.tag.body && this.tag.body.length > 0)
      this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(this.tag.body);
  }

  ionViewDidLoad() {
    console.log('ITEMLISTPAGE - IONVIEWDIDLOAD');
  }

  ionViewDidEnter() {
    this.analyticsService.trackPage('tag-item-list');
  }

  async open(item) {
    let modal = this.modalCtrl.create('ItemDetailsPage', {
      item,
      disableOwnerPage: true,
      likeCallback: async item => {
        await this.navigationService.like(item, this.navCtrl)
      },
      dislikeCallback: async item => {
        const dislikeResult = await this.navigationService.dislike(item);
      }
    });
		modal.present();
  }
}
