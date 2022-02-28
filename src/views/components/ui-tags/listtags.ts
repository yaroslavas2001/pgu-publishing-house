import IEqual from "../component-models/iequal";


export default class ListTags{
    Selected:boolean;
    Disabled:boolean;
    Value:IEqual<Object>;
    constructor(value:IEqual<Object>, selected:boolean, disabled:boolean){
      this.Value = value;
      this.Selected = selected;
      this.Disabled = disabled;
    }
  }