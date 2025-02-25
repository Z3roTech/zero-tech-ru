import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    version: '0.1.3',
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
