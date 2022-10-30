import { defineStore } from 'pinia'

export const useStoreSettings = defineStore('settings', {
  state (): Store.Settings<{}> {
    return {
      isCollapse: false,
      device: 'desktop',
      opened: false
    }
  },
  actions: {
    setCollapse (data: boolean): void {
      this.isCollapse = data
      if (this.device === 'mobile') this.opened = !this.opened
    },
    setDevice (data: string): void {
      this.device = data
      if (data === 'mobile' && !this.opened) {
        this.isCollapse = false
      }
      if (data === 'desktop') {
        this.opened = false
        this.isCollapse = true
      }
    },
    setOpened (data: boolean): void {
      this.opened = data
    }
  }
})
