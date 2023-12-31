import { EnergyType } from '../Energy';
import Archetype from './Archetype';

export default class Necromancer extends Archetype {
  private type_: EnergyType;
  private static _instances = 0;

  constructor(name:string) {
    super(name);
    this.type_ = 'mana';
    Necromancer._instances += 1;
  }

  static override createdArchetypeInstances():number {
    return Necromancer._instances;
  }

  get energyType(): EnergyType {
    return this.type_;
  }
}