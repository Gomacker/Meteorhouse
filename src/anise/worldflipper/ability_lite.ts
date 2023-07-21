class AbilityValue {
  constructor(s: RegExp) {}
}

class Targets {
  static LEADER = new AbilityValue(/队长/)


}

class Values {
  static ATTACK = new AbilityValue(/攻击力/)
}

export class AbilityLite {
  public description: string
  constructor(description: string) {
    this.description = description
  }
}
