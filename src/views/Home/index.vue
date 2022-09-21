<template>
  <div>
    <!-- 标题 -->
    <p class="title">推荐歌单</p>
    <!-- 歌单部分 -->
    <div>
      <van-row gutter="10">
        <van-col span="8" v-for="item in recommendList" :key="item.id">
          <van-image width="100%" height="100px" :src="item.picUrl" />
          <p class="song_name">{{item.name}}</p>
        </van-col>
      </van-row>
    </div>

    <p class="title">最新音乐</p>
    <van-cell-group>
   <SongItem v-for="item in songList" :key="item.id" :label="item.song.artists[0].name" :id="item.id" :title="item.name"></SongItem>

    </van-cell-group>

  </div>
</template>

<script>
import SongItem from '@/components/SongItem'
export default {
  name: 'Ho-me',
  data () {
    return {
      recommendList: [], // 推荐歌单,
      songList: []
    }
  },
  components: { SongItem },
  async created () {
    const result = await this.$API.reqSongList({ limit: 6 })
    this.recommendList = result.data.result
    // console.log(this.recommendList)
    const Result = await this.$API.reqNewSong({ limit: 6 })
    // console.log(Result)
    this.songList = Result.data.result
    // console.log(this.songList)
  }
}
</script>

<style scoped lang="less">
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  text-align: left;
  color: #333;
  font-size: 15px;
}

/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}

  .search-icon {
    font-size: 24px;
    line-height: inherit;
  }
</style>
