<template>
  <div class="icon-wrapper">
    <svg class="icon" :width="width" :height="height" data-testid="icon">
      <use v-bind="{ 'xlink:href': '/feather-sprite.svg#' + name }" />
    </svg>
    <!--
    SLOTS

    In these tags will be inserted a custom template
    
    If default configuration is desired, the template should be written
    directly inside the slot. In this case, the content to be shown will
    change only if a different template is inserted in the call of the component

    Slot can access the parent properties

    If there is more than 1 slot a slot's name is needed
  -->
    <slot></slot>
  </div>
</template>

<!--
Creation of an icon, using feather-icons dependency
-->
<script>
import feather from 'feather-icons'

export default {
  props: {
    name: String,
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
  computed: {
    svg() {
      return feather.icons[this.name].toSvg({
        class: 'icons',
        width: this.width,
        height: this.height,
      })
    },
  },
}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
  margin-right: 6px;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
