import { RegisterData } from "angular-token";

export default class User {
  public email: string;
  public name: string;
  public phone: string;
  public address: string;
  public social_image: string;
  public image: string;
  public data: string; // image Data
}

export class RegisteringUser implements RegisterData {
  public login: string;
  public name: string;
  public password: string;
  public passwordConfirmation: string;
  public userType: string = 'KindHeartedUser';

  [key: string]: string;
}
