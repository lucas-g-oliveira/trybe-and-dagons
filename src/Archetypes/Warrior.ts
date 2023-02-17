import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Warrior extends Archetype {
  private type_: EnergyType;
  private static _instances = 0;

  constructor(name:string) {
    super(name);
    this.type_ = 'stamina';
    Warrior._instances += 1;
  }

  static override createdArchetypeInstances():number {
    return Warrior._instances;
  }

  get energyType(): EnergyType {
    return this.type_;
  }
}