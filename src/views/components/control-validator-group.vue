<template>
  <div class="control-validator-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

//slots.default().filter(child => child.type.name === 'Tab')
export default class ControlValidatorGroup extends Vue {
  isValidChilds(vue: Vue, isValid: boolean): boolean {
    // const items=  this.$slots.default().filter(child => child.type.name === 'Tab')
    // //console.log(`isValidChilds`);
    const x = this.$slots.default();
    this.$slots.default().forEach((element) => {
      // if ((element as any).isValid) {
      //   var validate = (element as any).isValid();
      //   isValid = isValid && validate;
      // } else if ((element ).$children.length > 0) {
      //   isValid = this.isValidChilds(element, isValid);
      // }
    });
    return isValid;
  }
  isValid(): boolean {
    // //console.log(`isValid`);
    return true;
    // return this.isValidChilds(this as Vue, true);
  }

  clearValidChilds(vue: Vue) {
    // vue.$children.forEach((element) => {
    //   if ((element as any).clearValid) {
    //     (element as any).clearValid();
    //   } else if ((element as Vue).$children.length > 0) {
    //     this.clearValidChilds(element);
    //   }
    // });
  }
  clearValid(): void {
    this.clearValidChilds(this as Vue);
  }
}
</script>
