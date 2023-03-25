import { defineStore } from 'pinia'

export const useStorePinia = defineStore('main', {
  state() {
    return {
      count: 10,
      content: '这是通过getters获取Pinia管理的仓库数据',
      msg: 'hello world'
    }
  },
  // 简写方式
  // state: () => ({
  //    msg: 'hello word',
  //    count: 10
  // }),
  getters: {
    getMsgFn(): string {
      return this.content
    }
  },
  actions: {
    changeMsg(val: number) {
      console.log('传入进来的值：', val)
      this.msg = '1111'
      this.count = val
    }
  }
})
