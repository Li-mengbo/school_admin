const getters = {
  flag: state => state.login.flag,
  contentdata: state => state.navList.contentdata,
  centerdata: state => state.navList.centerdata,
  centerDatas: state => state.indexData.centerDatas,
  dataLength: state => state.indexData.dataLength
}
export default getters
