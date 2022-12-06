
import { TableColumnCtx } from '@/components/ElTable'
import { ElButton } from 'element-plus'

export const headers: Array<Partial<TableColumnCtx<Service.ArticleListRes>>> = [
  {
    prop: 'id',
    label: 'Id',
    align: 'center'
  },
  {
    prop: 'title',
    label: 'Title',
    align: 'center'
  },
  {
    prop: 'description',
    label: 'Description',
    align: 'center'
  },
  {
    label: 'Operation',
    render (row, column, cellValue, index) {
      return (
        <ElButton
          type="primary"
          link
          onClick={ () => console.log(row, column, cellValue, index) }
        >
          Render
        </ElButton>
      )
    }
  }
]

export {}
