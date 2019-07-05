import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisteringUser } from '../../models/user';
import { LoginServiceProvider } from '../../services/login-service';
import { ToastService } from '../../services/toast-service';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // VARS
  public user: RegisteringUser = new RegisteringUser;

  // CONSTRUCTOR
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginProvider: LoginServiceProvider,
    private toast: ToastService,
  ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // CLICK EVENTS
  async register() {
    try {
      this.user.type = 'KindHeartedUser';
      const result = await this.loginProvider.register(this.user);

      this.toast.showMessage(`Oba! Que bom que você se conectou com a gente!`);

      this.navCtrl.push('PermissionLocationPage', {}, {
        direction: 'forward'
      });
    } catch (ex) {
      this.toast.showError(`Por favor preencha todos os campos`);
    }
  }

  login() {
    this.navCtrl.push('LoginPage', {}, {
			direction: 'forward'
		});
  }

}
