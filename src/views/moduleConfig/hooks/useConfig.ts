export function useConfig() {
  const { proxy } = getCurrentInstance()!
  const [categoryList, groupList] = [ref<any[]>([]), ref<any[]>([])]
  const initialConfig = async () => {
    try {
      const { data } = await proxy!.HTTPClient.productCateGoryController.list({
        currentPage: 1,
        pageSize: 999999
      })!
      categoryList.value = (data as any).item || []
    } catch (error) {}
    try {
      const { data } = await proxy!.HTTPClient.productGroupController.list({
        currentPage: 1,
        pageSize: 999999
      })!
      groupList.value = (data as any).item || []
    } catch (error) {}
  }
  return { categoryList, groupList, initialConfig }
}

export const mapValues = (v: any) => ({
  value: v.id,
  label: v.name
})
