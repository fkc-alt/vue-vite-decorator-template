
import { HandleFunc, TableColumnCtx } from '@/components/Table'
import { ElButton } from 'element-plus'

export const mspHeaders = (param?: Record<string, HandleFunc<Service.ArticleItem>>): Array<Partial<TableColumnCtx<Service.ArticleItem>>> => {
  return [
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
      width: '120px',
      render (scope) {
        return (
          <ElButton
            type="primary"
            link
            onClick={() => param?.handleClick(scope)}
            class="btn"
          >
            Render
          </ElButton>
        )
      }
    }
  ]
}

export {}
