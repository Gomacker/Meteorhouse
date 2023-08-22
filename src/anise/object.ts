export abstract class GameObject {
  readonly abstract __type_id: string;
  public readonly resource_id: string;
  protected constructor(resource_id: string) {
    this.resource_id = resource_id
  }
  res(res_group: string, suffix: string = 'png'): string {
    return `/static/${this.__type_id}/${res_group}/${this.resource_id}.${suffix}`
  }
}