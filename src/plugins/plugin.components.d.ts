import _Vue, { Component, VNode } from "vue";
export = PluginComponents;

declare namespace PluginComponents {
  export function install(Vue: typeof _Vue, options?: any): void;
}

declare module "vue/types/vue" {
  export interface Vue {
    GetChildComponents(tag: string): Array<Component>;
    GetChilds(tag: string): Array<VNode>;
    GetChildFirstComponent(tag: string): Component;
    GetChildAny(tag: string): boolean;
    GetRef(ref: string): Vue | Element | Vue[] | Element[];
    Extend(target: object, extend: object): void;
    Logout(): void;
    OffsetElement(el: Element): any;
  }
}
