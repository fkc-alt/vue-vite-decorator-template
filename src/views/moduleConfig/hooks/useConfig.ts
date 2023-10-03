import HTTPClient from '@/main'

export function useConfig() {
  const [categoryList, groupList] = [ref<any[]>([]), ref<any[]>([])]
  const initialConfig = () => {
    void HTTPClient.productCateGoryController
      .list({
        currentPage: 1,
        pageSize: 999999
      })
      .then(({ data }) => {
        categoryList.value = (data as any).item || []
      })
    void HTTPClient.productGroupController
      .list({
        currentPage: 1,
        pageSize: 999999
      })
      .then(({ data }) => {
        groupList.value = (data as any).item || []
      })
  }
  return { categoryList, groupList, initialConfig }
}

export const mapValues = (v: any) => ({
  value: v.id,
  label: v.name
})
