<script setup lang="ts">
defineOptions({ name: 'SvgIcon' })
const props = withDefaults(
  defineProps<{
    prefix?: string
    name: string
    className?: string
  }>(),
  {
    prefix: 'icon',
    name: '',
    className: ''
  }
)
const symbolId = computed(() => `#${props.name}`)
const svgClass = computed(() =>
  props.className ? `svg-icon ${props.className}` : 'svg-icon'
)
</script>
<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use
      class="svg-use"
      :href="symbolId"
    />
  </svg>
</template>
<style scope>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
