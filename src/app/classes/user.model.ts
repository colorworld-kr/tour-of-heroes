export class FirebaseUserModel {
  get isLogin(): boolean {
    return this.name !== '';
  }

  image: string;
  name: string;
  provider: string;

  constructor() {
    this.image = '';
    this.name = '';
    this.provider = '';
  }
}
