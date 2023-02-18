import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import { Elf } from './Races';
import Race from './Races/Race';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _archetype:Archetype;
  private _maxLifePoints:number;
  private _lifePoints:number;
  private _strength:number;
  private _defense:number;
  private _dexterity:number;
  private _energy:Energy | undefined;
  private _race:Race;
  private _name:string;

  constructor(name:string) {
    this._name = name;
    const max = 10;
    const min = 1;
    this._race = new Elf(name, this.race.dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this.race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(min, max);
    this._defense = getRandomInt(min, max);
    this._dexterity = getRandomInt(min, max);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(min, max),
    };
  }

  get race():Race { return this.race; }
  get archetype():Archetype { return this._archetype; }
  get lifePoints():number { return this._lifePoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity():number { return this._dexterity; }
  get energy():Energy | undefined { return this._energy; }

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
    
    if (this._maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }

    this._lifePoints = this._maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    this._lifePoints = (attackPoints > this._defense)
      ? this._lifePoints = attackPoints - this.defense
      : this._lifePoints += 1;

    if (this._lifePoints < 0) {
      this._lifePoints = -1;
    }
    return this.lifePoints;
  }
}