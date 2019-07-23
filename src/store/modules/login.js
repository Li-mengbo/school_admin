
const login = {
  state: {
    flag: false
  },
  mutations: {
    SET_FLAG: (state, flag) => {
      state.flag = flag
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      console.log(userInfo)
      const username = userInfo.userName.trim();
      const password = userInfo.password.trim();
      return new Promise((resolve, reject) => {
        if(username == 'admin' && password == '123456') {
          resolve();
          commit('SET_FLAG', true)
        }else {
          reject();
        }
      })
    }
  }
}

export default login
