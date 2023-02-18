import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import { Race, Elf } from './Races/index';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race:Race;
  private _archetype:Archetype;
  private _maxLifePoints:number;
  private _lifePoints:number;
  private _strength:number;
  private _defense:number;
  private _dexterity:number;
  private _energy:Energy;
  private _name:string;

  constructor(name:string) {
    const max = 10;
    const min = 1;

    this._name = name;
    this._dexterity = getRandomInt(min, max);
    this._race = new Elf(this._name, this._dexterity);
    this._archetype = new Mage(this._name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(min, max);
    this._defense = getRandomInt(min, max);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(min, max),
    };
  }

  get race():Race { return this._race; }
  get archetype():Archetype { return this._archetype; }
  get lifePoints():number { return this._lifePoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity():number { return this._dexterity; }
  get energy():Energy | undefined {
    if (this._energy) {
      return {
        type_: this._energy.type_,
        amount: this._energy.amount,
      };
    }
    return undefined;
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  special?(enemy: Fighter): void {
    const max = 10;
    const min = 1;
    const strengthExtra = this._strength + getRandomInt(min, max);
    enemy.receiveDamage(strengthExtra);
  }

  levelUp(): void {
    const max = 10;
    const min = 1;
    this._maxLifePoints += getRandomInt(min, max);
    this._strength += getRandomInt(min, max);
    this._dexterity += getRandomInt(min, max);
    this._defense += getRandomInt(min, max);
    
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    this._lifePoints = this._maxLifePoints;
    this._energy.amount = 10;
  }

  receiveDamage(attackPoints: number): number {
    this._lifePoints = (attackPoints > this._defense)
      ? this._lifePoints - (attackPoints - this._defense)
      : this._lifePoints -= 1;

    if (this._lifePoints < 0) {
      this._lifePoints = -1;
    }
    return this._lifePoints;
  }
}