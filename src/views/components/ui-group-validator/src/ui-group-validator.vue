<template>
    <div class="ui-group-validator">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
    name: 'ui-group-validator'
})

export default class ControlValidatorGroupComponent extends Vue {   
    isValidChilds(vue: Vue, isValid: boolean): boolean {        
        vue.$children.forEach(element => {
            if((element as any).isValid){
                var validate = (element as any).isValid();                    
                isValid = isValid && validate;
            } else if ((element as Vue).$children.length > 0) {
                isValid = this.isValidChilds(element, isValid);
            }
        });
        return isValid;
    }
    isValid(): boolean {
        return this.isValidChilds(this as Vue, true);
    }
}
</script>