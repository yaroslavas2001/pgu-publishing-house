import { App } from "vue";
import { Store } from "vuex";
import Vuex from 'vuex'

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
  CurrentUser:string
  FirstName:string
  FatherName:string
  UserRole:number
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
