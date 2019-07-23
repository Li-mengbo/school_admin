<template>
  <div class="left-nav">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      :router=true
      :default-active="$route.path">
      <el-menu-item index="/dashboard/index" route="/dashboard/index">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/nav">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/nav/nav1" route="/nav/nav1">
            <span slot="title">修改活动位置</span>
          </el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group>
          <el-menu-item index="/nav/nav2" route="/nav/nav2">
            <span slot="title">修改活动说明</span>
          </el-menu-item>
        </el-menu-item-group> -->
      </el-submenu>
      <!--
      <el-menu-item index="/nav/nav1" route="/nav/nav1">
        <i class="el-icon-menu"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="/nav/nav2" route="/nav/nav2">
        <i class="el-icon-setting"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      -->
    </el-menu>
  </div>
</template>
<style lang="less">
  .left-nav {
    width: 200px;
    height: 100%;
    background-color: #324157;
    .el-menu {
      border: none;
    }
  }
</style>

