<script lang="ts">
import { application } from '@/service/app.module'
import { useUserStore } from '@/store/user'
import { Vue, Options, Ref, Watch } from 'vue-property-decorator'

@Options({ name: 'Index' })
export default class Index extends Vue {
  @Ref() readonly CustomTable!: CustomerProps.CustomTable.TableRef
  @Ref('Image') readonly Image!: HTMLImageElement
  public state: Service.OrderListRes = {
    orderList: []
  }

  @Watch('storeState', { deep: true })
  onStateChanged(val: Common.StroageType, oldVal: Common.StroageType) {
    console.log(val?.token, oldVal?.token)
  }

  @Watch('storeState.token')
  onStateTokenChanged(val: string, oldVal: string) {
    console.log(val, oldVal)
  }

  public store = useUserStore()

  public storeState = storeToRefs(this.store)

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
    console.log(p2, this.Image, this.CustomTable.tableRef, this.store)
    this.state.orderList = p1.data.orderList
  }

  toggleSelection(rows?: Service.OrderItem[]): void {
    // 测试修改状态
    this.store.$patch({ token: '123' })
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
    {{ storeState.token }},123
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
