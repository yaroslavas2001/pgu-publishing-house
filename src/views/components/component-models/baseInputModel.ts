import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class BaseInputModel extends Vue {  
  @Prop({type: [String, Number, Number, Date, Object, Array] }) 
    value: any | any [] | String | Number | string | number | Date;
  @Prop({default: true}) twoWayBinding: boolean;
  innerValue: any = this.value;
  // обычное значение
  @Watch('value')
  onValueChanged() {
    this.innerValue = this.value;
  }
  // внутреннее значение
  @Watch('innerValue')
  onInnerValueChanged() {
    if (this.twoWayBinding) {
      this.$emit('input', this.innerValue);
    }    
    this.$emit('onChange', this.innerValue);
  }
created() {
  //console.log('base');
}
}