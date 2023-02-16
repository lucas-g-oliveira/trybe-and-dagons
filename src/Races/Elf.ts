import Race from './Race';

export default class Elf extends Race {
  private _maxLivePoints:number;
  private static _instances = 0;

  constructor(name:string, dexterity:number) {
    super(name, dexterity);
    this._maxLivePoints = 99;
    Elf._instances += 1;
  }

  static createdRacesInstances():number {
    return Elf._instances;
    // Halfling._instances = Halfling._instances ? 1 : Halfling._instances + 1;
  }

  get maxLifePoints(): number {
    return this._maxLivePoints;
  }
} 