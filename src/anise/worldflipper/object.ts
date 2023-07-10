import type { GameObject } from "@/anise/object";

export enum Element {
  All = -1,
  Fire,
  Water,
  Thunder,
  Wind,
  Light,
  Dark
}

export enum Race {
  Human
}

export class Character implements GameObject {

  resource_id: string;
  constructor(
    public id: number,
    resource_id: string,
    public names: string[],
    public rarity: number,
    public element: Element,
    public races: Race,

  ) {
    this.resource_id = resource_id
  }
}