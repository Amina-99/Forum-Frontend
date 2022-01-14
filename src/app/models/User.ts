export class User {
  id: number;
  name: string;
  username: string;
  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
