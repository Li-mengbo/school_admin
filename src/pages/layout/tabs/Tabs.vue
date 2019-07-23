<template>
  <div class="tabs">
    <el-tabs v-model="editableTabsValue" type="card" closable @edit="handleTabsEdit">
      <el-tab-pane
        :key="item.url"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.url"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        editableTabsValue: '',
        editableTabs: [],
      }
    },
    methods: {
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          if (this.editableTabs.length > 0) {
              if (this.editableTabs.indexOf(targetName) == -1) {
                    this.editableTabs.push(targetName);
                }
          } else {
            this.editableTabs.push(targetName);
          }
          this.editableTabsValue = targetName.url;
          this.$router.push({ path: targetName.url })
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          tabs.forEach((tab, index) => {
            if (tab.url === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.url;
              }
            }
          });
          this.editableTabsValue = activeName;
          this.$router.push({ path: activeName })
          this.editableTabs = tabs.filter(tab => tab.url !== targetName);
        }
      },
      initTab () {
        const router = this.$router.options.routes;
        const path = this.$route.path;
        this.editableTabsValue = path;
        router.forEach(element => {
            if(element.children) {
              element.children.forEach(item => {
                if (path.indexOf(item.meta.url) !== -1) {
                  this.handleTabsEdit(item.meta, 'add')
                }
              })
            }
        });
      }
    },
    watch: {
      $route(to, from) {
        this.initTab()
      }
    },
    mounted: function () {
        this.initTab()
    }
  }
</script>
<style lang="less">
  .tabs {
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #ccc;
    padding: 4px 0;
    box-sizing: border-box;
    .el-tabs--card {
      margin: 0;
      .el-tabs__header {
        border: none;
        margin: 0;
        .el-tabs__item {
          border: 1px solid #ccc;
          margin: 0 5px;
          height: 32px;
          line-height: 32px;
        }
        .el-tabs__nav {
          border: none;
        }
      }
    }
    .el-tabs__item.is-active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
    }
  }
</style>

