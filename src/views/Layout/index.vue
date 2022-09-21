<template>
  <div>
    <!-- 头部导航栏  navbar -->
    <van-nav-bar :title="activeTitle"  fixed/>

    <div class="main">
      <keep-alive>
       <router-view></router-view>
      </keep-alive>

    </div>
    <!-- 底部导航栏   tabbar -->

      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" replace to="/layout/home">首页</van-tabbar-item>
        <van-tabbar-item icon="search" replace to="/layout/search">搜索</van-tabbar-item>
        <van-tabbar-item icon="user-o" replace to="/login">登录</van-tabbar-item>

      </van-tabbar>

  </div>
</template>
<script>
// import { Notify } from 'vant'
export default {
  name: 'Lay-out',
  data () {
    return {
      active: 0,
      activeTitle: this.$route.meta.title
    }
  },
  methods: {},
  watch: {
    $route () {
      this.activeTitle = this.$route.meta.title
      // console.log(this.$route)
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
