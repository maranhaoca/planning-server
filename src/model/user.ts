export class User {
  private _id: number;

  private _name: string;

  private _role: string;

  private _vote: number;

  private _roomId: number;

  private _isObserver: boolean;

  constructor() {
    this._id = Date.now();
    this._name = '';
    this._role = 'player';
    this._vote = -1;
    this._roomId = 0;
    this._isObserver = false;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get role(): string {
    return this._role;
  }

  public set role(role: string) {
    this._role = role;
  }

  public get vote(): number {
    return this._vote;
  }

  public set vote(vote: number) {
    this._vote = vote;
  }

  public get roomId(): number {
    return this._roomId;
  }

  public set roomId(roomId: number) {
    this._roomId = roomId;
  }

  public get isObserver() {
    return this._isObserver;
  }

  public set isObserver(isObserver: boolean) {
    this._isObserver = isObserver;
  }
}
