# TSX组件使用方式
### React版本
```
import SvgIcon from '@/components/SvgIcon/index.vue'

export default defineComponent({
  async setup () {
    const svgIconProps = { name: 'test' }
    return () => (
      <>
        <SvgIcon { ...svgIconProps } />
      </>
    )
  }
})
```

### Vue3版本
```
<template>
  <div>
    <SvgIcon name="test" />
  </div>
</template>
```