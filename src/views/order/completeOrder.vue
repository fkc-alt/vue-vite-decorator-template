<script lang="ts">
import { application } from '@/service/app.module'
import { Vue, Options, Ref } from 'vue-property-decorator'

@Options({ name: 'Index' })
export default class Index extends Vue {
  @Ref() readonly CustomTable!: CustomerProps.CustomTable.TableRef
  @Ref('Image') readonly Image!: HTMLImageElement
  public state: Service.OrderListRes = {
    orderList: []
  }

  public override activated() {}

  public override created() {
    console.log('created')
  }

  public override async mounted() {
    const [p1, p2] = [
      await application.orderController.GetOrderList({
        currentPage: 1,
        pageSize: 10
      }),
      await application.userController.UserInfo({
        id: 1,
        phone: '17223418891'
      })
    ]
    console.log(p2, this.Image, this.CustomTable.tableRef)
    this.state.orderList = p1.data.orderList
  }

  toggleSelection(rows?: Service.OrderItem[]): void {
    if (rows != null) {
      rows.forEach(row => {
        this.CustomTable.tableRef.toggleRowSelection(
          row,
          undefined as unknown as boolean
        )
      })
    } else {
      this.CustomTable.tableRef.clearSelection()
    }
  }
}
</script>

<template>
  <div>
    <img
      ref="Image"
      :src="Test"
      alt=""
    />
    <ElButton @click="toggleSelection([state.orderList[1], state.orderList[2]])"
      >Toggle selection status of second and third rows</ElButton
    >
    <CustomTable
      :column="[
        {
          align: 'center',
          type: 'selection'
        },
        {
          prop: 'name',
          label: '姓名'
        }
      ]"
      :data="state.orderList"
      ref="CustomTable"
    />
  </div>
</template>
