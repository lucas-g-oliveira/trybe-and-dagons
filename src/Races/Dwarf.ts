import Race from './Race';

export default class Dwarf extends Race {
  private _maxLivePoints:number;
  private static _instances = 0;

  constructor(name:string, dexterity:number) {
    super(name, dexterity);
    this._maxLivePoints = 80;
    Dwarf._instances += 1;
  }

  static createdRacesInstances():number {
    return Dwarf._instances;
  }

  get maxLifePoints(): number {
    return this._maxLivePoints;
  }
} 