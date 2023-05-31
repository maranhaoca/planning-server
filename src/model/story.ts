export interface Vote {
  id: number;
  value: number;
}

export class Story {
  private _id: number;

  private _title: string;

  private _content: string;

  private _dateAdded: Date;

  private _average: number | undefined;

  private _estimate: number | undefined;

  private _votes: Vote[];

  constructor() {
    this._id = Date.now();
    this._title = '';
    this._content = '';
    this._dateAdded = new Date();
    this._votes = [];
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get content() {
    return this._content;
  }

  public set content(content: string) {
    this._content = content;
  }

  public get average() {
    return this._average!;
  }

  public set average(average: number) {
    this._average = average;
  }

  public get estimate() {
    return this._estimate!;
  }

  public set estimate(estimate: number) {
    this._estimate = estimate;
  }
}
