/* eslint-disable @typescript-eslint/ban-types */
const pagerDefault = () => ({ currentPage: 1, pageSize: 10, total: 0 })

/**
 * @export
 * @param {Record<string, any>} [inputs={}]
 * @return {*}
 * @description 分页器hook
 */
export default function (inputs: any = {}) {
  const pager = ref<ReturnType<typeof pagerDefault> & any>({
    ...pagerDefault(),
    ...inputs
  })
  const loading = ref(false)
  const handlePageChange = (current: number, cb?: Function) => {
    pager.value.currentPage = current
    cb?.()
  }
  const handleSizeChange = (size: number, cb?: Function) => {
    pager.value.currentPage = 1
    pager.value.pageSize = size
    cb?.()
  }
  const reset = (inputs: Record<string, any> = {}, cb?: Function) => {
    pager.value = {
      ...pagerDefault(),
      ...inputs
    }
    cb?.()
  }
  return { pager, loading, handleSizeChange, handlePageChange, reset }
}
