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
    console.log('AppHeaderComponent goMain - activeView : ', this.activeView);

    let direction = (this.activeView == "chat") ? "back" : "foward";
    this.navCtrl.push('ItemExplorePage', {}, {
			direction: direction
		});
    //this.mainClicked.emit();
  }

  goProfile() {
    console.log('AppHeaderComponent goProfile - activeView : ', this.activeView);

    this.navCtrl.push('MenuPage', {}, {
			direction: "back"
		});
    //this.profileClicked.emit();
  }

  goChat() {
    console.log('AppHeaderComponent goChat - activeView : ', this.activeView);

    this.navCtrl.push('ChatMainPage', {}, {
			direction: "foward"
		});
    //this.chatClicked.emit();
  }

}
