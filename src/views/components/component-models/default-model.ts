import IEqual from "./iequal";

export default class DefaultModel implements IEqual<DefaultModel> {
  id: number;
  name: string;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  public Equal(object: DefaultModel) {
    return this.id == object.id;
  }
  public EqualRelation(object: DefaultModel): boolean {
    return null;
  }
  public ToString() {
    return `${this.name}`;
  }
}
