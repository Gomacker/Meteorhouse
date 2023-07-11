export abstract class GameObject {
  readonly abstract __type_id: string;
  public readonly resource_id: string;
  protected constructor(resource_id: string) {
    this.resource_id = resource_id
  }
}