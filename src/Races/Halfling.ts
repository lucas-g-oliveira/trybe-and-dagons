import Race from './Race';

export default class Halfling extends Race {
  private _maxLivePoints:number;
  private static _instances = 0;

  constructor(name:string, dexterity:number) {
    super(name, dexterity);
    this._maxLivePoints = 60;
    Halfling._instances += 1;
  }

  static createdRacesInstances():number {
    return Halfling._instances;
  }

  get maxLifePoints(): number {
    return this._maxLivePoints;
  }
} 