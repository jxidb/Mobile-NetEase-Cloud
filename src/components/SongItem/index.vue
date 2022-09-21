<template>
  <div>
    <van-cell @click="$router.push({path:'/comment',query:{id:id}      })" style=" text-align:left; font-size: 0.32rem; " :title="title" :label="label" center>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="play-circle-o" class="search-icon" @touchstart="playFn"/>
      </template>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'SongItem',
  props: [
    'title',
    'label',
    'id'
  ],
  methods: {
    playFn () {
      this.$router.push({
        path: '/play',
        query: {
          id: this.id
        }
      })
    }
  }
}
</script>
<style lang="less">

.search-icon{
font-size: 24px;
line-height:  inherit;
}
</style>
