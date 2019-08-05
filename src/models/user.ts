import { RegisterData } from "angular-token";

export default class User {
  public email: string;
  public name: string;
  public phone: string;
  public adress: string;
}

export class RegisteringUser implements RegisterData {
  public login: string;
  public name: string;
  public password: string;
  public passwordConfirmation: string;
  public userType: string = 'KindHeartedUser';

  [key: string]: string;
}
