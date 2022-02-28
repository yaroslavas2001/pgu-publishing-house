<template>
    <div class="ui-group-validator">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Options, Vue, Prop } from "vue-property-decorator";
@Options({
    name: 'ui-group-validator'
})

export default class ControlValidatorGroupComponent extends Vue {   
    isValidChilds(vue: Vue, isValid: boolean): boolean {        
        //console.log('isv valid');
        
        vue.$slots.default().forEach(element => {
            //console.log('el: ', element);
            
            if ((element as any).isValid) {
                //console.log('CHECK');
                var validate = (element as any).isValid();                    
                isValid = isValid && validate;
            } else if (
                ((element as any).$slots || {}).default != null &&
                ((element as any).$slots || {}).default().length > 0) {
                //console.log('is VUE');
                isValid = this.isValidChilds(element as any, isValid);
            }
        });
        return isValid;
    }
    isValid(): boolean {
        return this.isValidChilds(this as Vue, true);
    }
}
</script>