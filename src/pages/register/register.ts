import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { RegisteringUser } from '../../models/user';
import { LoginServiceProvider } from '../../services/login-service';
import { ToastService } from '../../services/toast-service';
import { NavigationServiceProvider } from '../../services/navigation-service';

const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
    private navigationService: NavigationServiceProvider,
    ) {
  }

  // LIFECYCLE EVENTS
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // CLICK EVENTS
  async register() {
    try {
      if (this.user.password != this.user.passwordConfirmation) {
        this.toast.showError(`Senha e confirmação devem ser as mesmas`);
        return;
      }
      if (!this.user.password || this.user.password.length < 6) {
        this.toast.showError(`Senha deve ter pelo menos 6 caracteres`);
        return;
      }
      if (!this.user.name || this.user.name.length < 2) {
        this.toast.showError(`Nome não preenchido corretamente`);
        return;
      }
      if (!this.user.login || !emailRegex.exec(this.user.login)) {
        this.toast.showError(`E-mail não preenchido corretamente`);
        return;
      }

      this.user.type = 'KindHeartedUser';
      await this.loginProvider.register(this.user);

      this.toast.showMessage(`Oba! Que bom que você se conectou com a gente!`);

      await this.navigationService.checkRoot();
    } catch (ex) {
      this.toast.showError(`Erro inesperado, por favor tente novamente mais tarde ou contate nosso suporte.`);
    }
  }

  login() {
    this.navCtrl.push('LoginPage', {}, {
			direction: 'forward'
		});
  }

}
