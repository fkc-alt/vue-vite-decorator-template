const pagerDefault = () => ({ currentPage: 1, pageSize: 10, total: 0 })

/**
 * @export
 * @template T
 * @param {Record<string, any>} [inputs={}]
 * @return {*}
 * @description 分页器hook
 */
export default function (inputs: any = {}) {
  const pager = ref<ReturnType<typeof pagerDefault>>({
    ...pagerDefault(),
    ...inputs
  })
  const loading = ref(false)
  const handlePageChange = (current: number) => {
    pager.value.currentPage = current
  }
  const handleSizeChange = (size: number) => {
    pager.value.pageSize = size
    pager.value.currentPage = 1
  }
  const reset = (inputs: Record<string, any> = {}) => {
    pager.value = {
      ...pagerDefault(),
      ...inputs
    }
  }
  return { pager, loading, handleSizeChange, handlePageChange, reset }
}
