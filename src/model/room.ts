import { Story } from './story.js';
import { User } from './user.js';

export class Room {
  private _id: number;

  private _name: string;

  private _users: User[];

  private _stories: Story[];

  private _deck: string[];

  private _autoReveal: boolean;

  private _countdown: boolean;

  private _timer: string;

  constructor() {
    this._id = Date.now();
    this._name = '';
    this._users = [];
    this._stories = [];
    this._deck = [];
    this._autoReveal = false;
    this._countdown = false;
    this._timer = '';
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get users() {
    return this._users;
  }

  public get stories() {
    return this._stories;
  }

  public get deck(): string[] {
    return this._deck;
  }

  public get autoReveal() {
    return this._autoReveal;
  }

  public set autoReveal(autoReveal: boolean) {
    this._autoReveal = autoReveal;
  }

  public get countdown() {
    return this._countdown;
  }

  public set countdown(countdown: boolean) {
    this._countdown = countdown;
  }

  public get timer() {
    return this._timer;
  }

  public set timer(timer: string) {
    this._timer = timer;
  }
}
