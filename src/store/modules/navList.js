import { companyList, setContent, setCenter, addCompanyList } from '../../api/nav1.js';
const navList = {
  state: {
    contentdata: [],
    centerdata: [],
  },
  mutations: {
    GET_LIST: (state, data) => {
      console.log(data)
      if(data.value == 0) {
        state.contentdata = data.list
      }
      //旧key到新key的映射
      const keyMap = {
        "description" : "center"
      };
      if(data.value == 1) {
        const centerList = [];
        console.log(data.list.length)
        data.list.forEach(item => {
          let name = item.title;
          item.positions.forEach(items => {
            items.type = name;
            centerList.push(items)
          })
          // if(item.positions.length > 0) {
          //   item.positions.forEach(items => {
          //     centerList.push(items)
          //   })
          // }else {
          //   // 修改key值
          //   for(var key in item){
          //     var newKey = keyMap[key];
          //     if(newKey){
          //       item[newKey] = item[key];
          //       delete item[key];
          //     }
          //   }
          //   centerList.push(item)
          // }
        });
        console.log(centerList)
        state.centerdata = centerList
      }
    },
    SET_LIST: (state, { data, index }) => {
      state.data[index] = data
    }
  },
  actions: {
    getCompanyList({ commit }, { value }) {
      return new Promise((resolve, reject) => {
        let list = [];
        for(let i = 0; i < 3; i++) {
          companyList(i).then(res => {
            if(res.code == 200) {
              list.push(res.data[value]);
              // console.log(res.data[value])
              // if(value == 0) {
              //   if(res.data[1].positions.length == 0) {
              //     list.push(res.data[1])
              //   }
              //   list.push(res.data[value]);
              // }
              // if(value == 1 && res.data[1].positions.length > 0) {
              //   list.push(res.data[value]);
              // }
            }
          }).catch(error => {
            reject(error);
          })
        }
        setTimeout(()=>{
          commit('GET_LIST', {list, value});
          resolve(list);
        },500)
      })
    },
    setContent({dispatch, commit}, { form, value }) {
      return new Promise((resolve, reject) => {
        setContent(form).then(res => {
           if(res.code == 200) {
              dispatch('getCompanyList', {value})
            //  const data = res.data;
            //  commit('SET_LIST', { data, index });
            //  resolve(res.data);
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    setCenter({dispatch, commit}, { form, value }) {
      return new Promise((resolve, reject) => {
        setCenter(form).then(res => {
           if(res.code == 200) {
            dispatch('getCompanyList', {value})
            //  const data = res.data;
            //  commit('SET_LIST', { data, index });
            //  resolve(res.data);
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
