import { App } from "vue";
import { Store } from "vuex";
import Vuex from 'vuex'
import MaterialType from "@/common/MaterialType"
import PublicationStatus from "@/common/PublicationStatus"
import AllAuthorModel from "./models/author/AllAuthorModel";
interface Model {
  Id: number
  Name: string
}
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $store: Store<StateModel>;
  }
}
export class StateModel {
  DeviceType: Array<Model> = []
  PosType: Array<Model> = []
  StreetType: Array<Model> = []
  BuildingType: Array<Model> = []
  Color: Array<Model> = []
  KioskСondition: Array<Model> = []
  SettlementType: Array<Model> = []
  CurrentUser: string

  UserRole: number = null
  UserId: number = 1
  Parse(data: Object): Object {
    return JSON.parse(JSON.stringify(data))
  }
  getType(id: number): string {
    if (id)
      return MaterialType.find((el) => el.Id == id).Name;
  }
  getStatus(id: number): string {
    if (id)
      return PublicationStatus.find((el) => el.Id == id).Name;
  }
  getAvtor(item: any): string {
    if (item)
      return (
        this.ucFirst(item.lastName? item.lastName:item.secondName) +
        " " +
        this.ucFirst(item.firstName) +
        " " +
        this.ucFirst(item.sureName)
      );
  }
  ucFirst(str: string): string {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }
  
  getBase64Only(str: string): string {
    return str.replaceAll("data:application/octet-stream;base64,", "");
  }
}

const install = (app: App) => {
  const store = new Vuex.Store({
    state: new StateModel()
  })
  app.config.globalProperties.$store = store;
};

const store = {
  install,
};

export default store;
