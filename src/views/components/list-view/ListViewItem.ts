import IEqual from "../component-models/iequal";


export default class ListViewItem<T extends { id: number; name: string }> {
  Selected: boolean;
  Disabled: boolean;
  Value: IEqual<T>;
  constructor(value: IEqual<T>, selected: boolean, disabled: boolean) {
    this.Value = value;
    this.Selected = selected;
    this.Disabled = disabled;
  }
}
