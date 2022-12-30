import { ElButton } from 'element-plus'

export const mapHeaders: ElTableCustom.MapHeaders<Service.ArticleItem> = (param) => {
  return [
    {
      align: 'center',
      type: 'selection'
    },
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
            onClick={() => param?.handleClick?.(scope)}
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
