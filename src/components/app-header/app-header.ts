import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavigationServiceProvider } from '../../services/navigation-service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {

  @Input() activeView: string;

  @Input() profilePush: boolean;
  @Input() chatPush: boolean;


  // @Output() mainClicked = new EventEmitter();
  // @Output() profileClicked = new EventEmitter();
  // @Output() chatClicked = new EventEmitter();

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    private navigationService: NavigationServiceProvider,
  ) {
    console.log('Hello AppHeaderComponent Component');

    if (!this.activeView) {
      this.activeView = "main";
    }

    // TODO : IMPLEMENTAR MODO DE OBTER SE OS INDICADORES ESTÃO ATIVOS OU NÃO
    if (!this.profilePush) {
      this.profilePush = true;
    }

    if (!this.chatPush) {
      this.chatPush = false;
    }
  }

  // CLICK METHODS
  async goMain() {
    console.log('AppHeaderComponent goMain - activeView : ', this.activeView);

    let direction = (this.activeView == "chat") ? "back" : "forward";
    await this.navigationService.checkRoot(direction);
    this.navCtrl.popToRoot();
    //this.mainClicked.emit();
  }

  goProfile() {
    console.log('AppHeaderComponent goProfile - activeView : ', this.activeView);

    this.navCtrl.push('ProfilePage', {}, {
			direction: "back"
		});
    //this.profileClicked.emit();
  }

  goChat() {
    console.log('AppHeaderComponent goChat - activeView : ', this.activeView);

    this.navCtrl.push('ChatMainPage', {}, {
			direction: "forward"
		});
    //this.chatClicked.emit();
  }

}
