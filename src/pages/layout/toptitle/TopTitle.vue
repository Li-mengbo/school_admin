<template>
  <div class="top-title">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="item.url" v-for="item of breadListLast" :key="item.url">
        {{item.title}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <div class="avator">
        <img src="../../../assets/img/default.jpg" alt="">
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<style lang="less">
  .top-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    background: #eff2f7;
    padding: 0 20px;
    box-sizing: border-box;
    .avator {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width:  100%;
        height: 100%;
      }
    }
  }
</style>
<script>
export default {
    //面包屑解决方案，此方法只适用于面包屑与路由显示顺序一致，例如path：01/02/03 面包屑也是01/02/03
    data() {
      return {
        breadListLast: []
      };
    },
    methods: {
      loadChange() {
        const router = this.$router.options.routes;
        router.forEach(element => {
          if(element.children) {
            element.children.forEach(item => {
              if (this.$route.path.indexOf(item.meta.url) !== -1) {
                console.log(item.meta)
                this.breadListLast.push(item.meta);
                if(this.breadListLast.length > 1) {
                  this.breadListLast.shift();
                }
              }
            })
          }
        });
      }
    },
    watch: {
      $route(to, from) {
        this.loadChange()
      }
    },
    //页面挂载之后,解析路由，给出面包屑，路由里面一定要含有breadCom组件的path
    mounted: function () {
      this.loadChange()
    }
}
</script>

