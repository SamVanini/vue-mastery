export const formFieldMixin = {
  inheritAttrs: false, //Avoid the inheritance of the attributes at root
  props: {
    label: {
      type: String,
      default: '',
    },
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    },
  },
}
