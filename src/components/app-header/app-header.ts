import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  @Input() activeView: string;

  // @Output() mainClicked = new EventEmitter();
  // @Output() profileClicked = new EventEmitter();
  // @Output() chatClicked = new EventEmitter();

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
  ) {
    console.log('Hello AppHeaderComponent Component');
  }

  // CLICK METHODS
  goMain() {
    console.log('AppHeaderComponent goMain');
    this.navCtrl.setRoot('ItemExplorePage');
    //this.mainClicked.emit();
  }

  goProfile() {
    console.log('AppHeaderComponent goProfile');
    this.navCtrl.setRoot('MenuPage');
    //this.profileClicked.emit();
  }

  goChat() {
    console.log('AppHeaderComponent goChat');
    this.navCtrl.setRoot('ChatMainPage');
    //this.chatClicked.emit();
  }

}
