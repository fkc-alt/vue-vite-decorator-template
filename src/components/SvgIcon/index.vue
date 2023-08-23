<script setup lang="ts">
defineOptions({ name: 'SvgIcon' })
interface Props {
  name: string
  prefix?: string
  className?: string
  children?: string
  // eslint-disable-next-line vue/no-reserved-props
  key?: string
}
const props = defineProps<Props>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { className, name, prefix = 'icon' } = toRefs(props)
const symbolId = computed(() => `#${name.value}`)
const svgClass = computed(() =>
  props.className ? `svg-icon ${className?.value}` : 'svg-icon'
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
