import _Vue, { createVNode, h, render } from "vue";
import UiDialogComponent from "./ui-dialog.vue";
import DialogModal, { DialogType, DialogButton } from "./model/dialogModal";
// import LocaleProvider from "../localization/localization";
import UiDialog from "@/plugins/dialog/ui-dialog.vue";
import { Events } from "./events";

export default class Dialog {
  private mounted = false;
  // private Vue: typeof _Vue;
  // private $root: UiDialog;
  private $root: any;
  readonly eventBus: Events<DialogModal> = new Events<DialogModal>();
  constructor() {
    this.eventBus = new Events<DialogModal>();
  }

  alert(errorMsg: string): Promise<boolean> {
    //data:DialogModal) {
    return this.open(
      new DialogModal({
        Type: DialogType.Error,
        Text: errorMsg,
        Title: "Внимание",
        Buttons: [this.getOkButton()],
      })
    );
  }
  success(errorMsg: string): Promise<boolean> {
    //data:DialogModal) {
    return this.open(
      new DialogModal({
        Type: DialogType.Error,
        Text: errorMsg,
        Title:"Внимание1",
        Buttons: [this.getOkButton()],
      })
    );
  }
  info(errorMsg: string): Promise<boolean> {
    //data:DialogModal) {

    return this.open(
      new DialogModal({
        Type: DialogType.Error,
        Text: errorMsg,
        Title: "Внимание2",
        Buttons: [this.getOkButton()],
      })
    );
  }
  warning(errorMsg: string): Promise<boolean> {
    //data:DialogModal) {

    return this.open(
      new DialogModal({
        Type: DialogType.Error,
        Text: errorMsg,
        Title: "Внимание3",
        Buttons: [this.getOkButton()],
      })
    );
  }
  custom(data: DialogModal): Promise<any> {
    return this.open(data);
  }
  private open(data: DialogModal): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.mounted) {
        this.mount(UiDialog, { props: { eventBus: this.eventBus } });
      }
      this.mounted = true;
      data.Callback = (res: boolean) => resolve(res);
      this.eventBus.trigger(data);
    });
  }

  confirm(text: string, buttons?: DialogButton[]): Promise<boolean> {
    return this.open(
      new DialogModal({
        Type: DialogType.Error,
        Text: text,
        Title:"Внимание",
        Buttons: buttons || [this.getYesButton(),this.getNoButton()],
      })
    );
  }

  getYesButton = () =>
    new DialogButton({ Title: "Да", Value: true, Color: "#FFFFFF", BgColor: "#71b92f" });
  getNoButton = () =>
    new DialogButton({ Title: "Нет", Value: false, Color: "#8797AF", BgColor: "#D0D9DE" });
  getOkButton = () => new DialogButton({ Title: "Ok", Value: true, Color: "#162A47", BgColor: "#F0F0F0" });

  mount = (component, { props = {}, children = {}, element = null, app = null } = {}) => {
    //console.log("MOUNT");

    let el = element ? element : this.createElement();
    if (element == null) {
      document.querySelector("body").appendChild(el);
    }

    let vNode = h(component, props, children);
    if (app && app._context) {
      vNode.appContext = app._context;
    }

    render(vNode, el);

    const destroy = () => {
      if (el) {
        render(null, el);
      }
      el = null;
      vNode = null;
    };
    return { vNode, destroy, el };
  };
  private createElement = () => typeof document !== "undefined" && document.createElement("div");
}
