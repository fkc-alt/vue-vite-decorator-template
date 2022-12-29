
import { HandleFunc, Headers } from '@/components/Table'
import { ElButton } from 'element-plus'

export const mspHeaders = <T extends Service.ArticleItem>(param?: Record<string, HandleFunc<T>>): Array<Partial<Headers<T>>> => {
  return [
    {
      prop: 'id',
      label: 'Id',
      align: 'center'
    },
    {
      prop: 'title',
      label: 'Title',
      align: 'center',
      formatter: (row, column, cellValue, index) => cellValue
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
