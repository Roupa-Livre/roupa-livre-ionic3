import { LoginServiceProvider } from '../providers/login-service/login-service';


export abstract class AuthPage {

	// CONSTRUCTOR
	constructor(public loginProvider: LoginServiceProvider) {}

	ionViewCanEnter() {
    return this.loginProvider.hasAgreed();
  }

}
