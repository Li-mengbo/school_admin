import { getCenterList } from '../../api/nav1.js';
import { setCentertData, delCenterData, addCenterData } from '../../api/index.js';
const indexData = {
  state: {
    dataLength: 0,  
    centerDatas: [],
  },
  mutations: {
    GET_LIST: (state, {data, page}) => {
        const pageNum = page.value ? page.value : page
        state.dataLength = data.length
        state.centerDatas = data.splice((pageNum - 1) * 10, 10)
    }
  },
  actions: {
    getCenterData({ commit }, page) {
      return new Promise((resolve, reject) => {
        getCenterList().then(res => {
            const data = res.data
            commit('GET_LIST', {data, page});
            resolve(res.data);
        }).catch(error => {
            reject(error);
        })
      })
    },
    setCentertData({dispatch, commit}, { form, value}) {
        return new Promise((resolve, reject) => {
          setCentertData(form).then(res => {
             if(res.code == 200) {
                dispatch('getCenterData', {value})
                resolve()
            }
          }).catch(error => {
            reject(error);
          })
        })
    },
    delCenterData({dispatch, commit}, { id, value}) {
        return new Promise((resolve, reject) => {
          delCenterData(id).then(res => {
             if(res.code == 200) {
                dispatch('getCenterData', {value})
                resolve()
            }
          }).catch(error => {
            reject(error);
          })
        })
      },    
    addCenterData({dispatch, commit}, { form, value}) {
        return new Promise((resolve, reject) => {
        addCenterData(form).then(res => {
             if(res.code == 200) {
                dispatch('getCenterData', {value})
                resolve()
            }
          }).catch(error => {
            reject(error);
          })
        })
      },    
  }
}

export default indexData
