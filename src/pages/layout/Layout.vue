<template>
  <div class="container">
    <LeftNav/>
    <div class="right-con">
      <TopTitle/>
      <router-view/>
    </div>
  </div>
</template>
<script>
import TopTitle from './toptitle/TopTitle';
import LeftNav from './leftnav/LeftNav';
import Tabs from './tabs/Tabs';

export default {
  components: {
    TopTitle,
    LeftNav,
    Tabs
  },
}
</script>
<style lang="less">
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    .right-con {
      width: calc(100% - 200px);
      display: flex;
      flex-direction: column;
    }
  }
</style>


