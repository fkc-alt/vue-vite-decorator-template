import { ElButton } from 'element-plus'

export const mapColumn: CustomerProps.CustomTable.MapColumn<Service.ArticleItem> = (param) => {
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
      align: 'center',
      renderHeader (data) {
        console.log(data)
        return <div>Custom Header</div>
      }
    },
    {
      label: 'Custom',
      prop: 'custom',
      width: '120px',
      render (scope) {
        return (
          <ElButton
            type="primary"
            link
            onClick={(e) => param?.handleClick?.(scope, e)}
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
