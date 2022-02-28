import IEqual from "@/views/components/component-models/iequal";


export default class ListViewItem<T>{
    Selected:boolean;
    Disabled:boolean;
    Value:IEqual<T>;
    constructor(value:IEqual<T>, selected:boolean, disabled:boolean){
      this.Value = value;
      this.Selected = selected;
      this.Disabled = disabled;
    }
  }