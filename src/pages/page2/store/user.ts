import { defineStore } from 'pinia'

interface UserInfo {
  userId: string | number
  avatar: string
  nickname: string
}

export const useUserStore = defineStore('useUserStore', {
  state: () => {
    return {
      user: null as UserInfo | null,
      token: null as string | null,
    }
  },
  getters: {
    getUser: (state: any) => state.user,
    getToken: (state: any) => state.token,
  },
  actions: {
    setUser(user: any) {
      this.user = user
    },
    setToken(t: any) {
      this.token = t
    }
  },
  // 持久化
  persist: [
    {
      key: '__UseStore_User__',
      pick: ['user', 'token'],
      storage: localStorage
    }
  ]
})

