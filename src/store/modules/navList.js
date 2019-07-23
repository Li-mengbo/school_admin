import { companyList, setCompanyList, addCompanyList } from '../../api/nav1.js';
const navList = {
  state: {
    data: [],
  },
  mutations: {
    GET_LIST: (state, data) => {
      let newData = [];
      //旧key到新key的映射
      const keyMap = {
        "positions" : "children"
      };
      for(var i = 0;i < data.length;i++){
        var obj = data[i];
        for(var key in obj){
            var newKey = keyMap[key];
            if(newKey){
              obj[newKey] = obj[key];
              delete obj[key];
            }
        }
      }
      state.data = data
    },
    SET_LIST: (state, { data, index }) => {
      state.data[index] = data
    }
  },
  actions: {
    getCompanyList({ commit }, { value }) {
      return new Promise((resolve, reject) => {
        companyList(value).then(res => {
           if(res.code == 200) {
            commit('GET_LIST', res.data);
            resolve(res.data);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    setCompanyList({commit}, { form, index }) {
      return new Promise((resolve, reject) => {
        setCompanyList(form).then(res => {
           if(res.code == 200) {
             const data = res.data;
             commit('SET_LIST', { data, index });
             resolve(res.data);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    addCompanyList({dispatch, commit}, form) {
      return new Promise((resolve, reject) => {
        addCompanyList(form).then(res => {
           if(res.code == 200) {
            dispatch('getCompanyList');
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}

export default navList
