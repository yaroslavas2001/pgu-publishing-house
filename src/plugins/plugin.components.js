// import Cookies from "js-cookie";
import {
  resolve
} from "path";

export default {
  install(Vue, options) {
    /**
     * Получаем список дочерниф компонент, по заданому тегу
     * @param {имя тега} tag
     */
    Vue.prototype.GetChildComponents = function (tag) {
      let slot = this.$slots.default;
      return slot
        .filter(
          vnode =>
          vnode.tag &&
          vnode.componentOptions &&
          vnode.componentOptions.Ctor.options.name === tag
        )
        .map(_ => _.componentInstance);
    };
    Vue.prototype.GetChilds = function (tag) {
      let slot = this.$slots.default;
      if (!slot) return [];
      return slot.filter(
        vnode =>
        vnode.tag &&
        vnode.componentOptions &&
        vnode.componentOptions.Ctor.options.name === tag
      );
    };
    /**
     * Получаем первый дочерни компонент с заданным тегом
     * @param {имя тега} tag
     */
    Vue.prototype.GetChildFirstComponent = function (tag) {
      let slot = this.$slots.default;
      return slot
        .filter(
          vnode =>
          vnode.tag &&
          vnode.componentOptions &&
          vnode.componentOptions.Ctor.options.name === tag
        )
        .map(_ => _.componentInstance)[0];
    };

    Vue.prototype.GetChildAny = function (tag) {
      let components = this.GetChildComponents(tag);
      return components && components.length > 0;
    };
    Vue.prototype.CollectRefsFromComponent = function (component, refs) {
      if (component && component.$refs) {
        Object.assign(refs, component.$refs);
      }
      if (component && component.$children) {
        component.$children.forEach(child =>
          this.CollectRefsFromComponent(child, refs)
        );
      }
    };
    Vue.prototype.GetAllRefs = function () {
      const refs = {};
      (this.$root.$children || []).forEach(child => {
        this.CollectRefsFromComponent(child, refs);
      });
      return refs;
    };
    Vue.prototype.GetRef = function (ref) {
      const refs = this.GetAllRefs();
      for (var i in refs) {
        if (i == ref) return refs[i];
      }
      return null;
    };
    Vue.prototype.Logout = function () {
      this.$websocket.logout().then(() => {
        Cookies.remove("APP_TOKEN");

        this.$dataStore.user = null;
        this.$router.push({
          name: "sign-in"
        });
      });
    };
    /**
     * Добавляет или перезаписывает поля дополняющего объекта к дополняемому
     * @param {дополняемый} target
     * @param {дополняющий} extend
     */
    Vue.prototype.Extend = function (target, extend) {
      ////console.log('Extend',target,extend);
      if (extend && target)
        for (var i in extend) {
          ////console.log('Extend item',i,extend[i]);
          target[i] = extend[i];
        }
      ////console.log('Extend end',target);
    };

    Vue.prototype.OffsetElement = function (el) {
      var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      };
    };
  }
};