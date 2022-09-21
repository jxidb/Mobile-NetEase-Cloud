<template>

  <div>
    <van-nav-bar title="评论" fixed left-arrow @click-left="$router.back()" />
    <div class="main">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div>
        <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
        <div class="wrap" v-for="(item,index) in commnetList" :key="index">
        <!-- <div class="wrap"> -->

          <div class="img_wrap">
            <img :src="item.user.avatarUrl" alt="">
            <!-- <img src="@/assets/logo.png" alt=""> -->

          </div>
          <div class="content_wrap">
            <div class="header_wrap">
              <div class="info_wrap">
                <p>{{item.user.nickname}}</p>
                <!-- <p>名称</p> -->

                <p>{{item.timeStr}} </p>
                <!-- <p>2021 </p> -->

              </div>
              <!-- <div style="font-size:14px;  ">12点赞</div> -->

              <div style="font-size:14px;  ">{{item.likedCount}}点赞</div>
            </div>
            <div class="footer_wrap">{{item.content}}</div>
            <!-- <div class="footer_wrap">你好啊</div> -->

          </div>
        </div>

        </van-list>
      </div>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ComMent',
  data () {
    return {
      commnetList: [],
      count: 0,
      isLoading: false, // 设置刷新时是否显示顶部小圆圈
      list: [],
      loading: false, // 加载状态，底部加载中
      finished: false, // 如果设置为true，list下面就会显示没有数据了,
      page: 0// 档期那要请求的第几页评论的数据
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        // 将数据重置
        this.commnetList = []
        // 刷新的话，页码也得重置，变为1
        this.page = 1
        this.getList()
      }, 1000)
    },
    onLoad () { // 触底了  要加载下一页数据了
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求

      this.page++ // 执行onLoad，页数就加1
      this.getList() // 隐藏点：网页打开就相当于触底了，触底就会触发getList请求，所以不用再在created里面请求一次数据
      console.log('onLoad执行了')
    },
    async  getList () {
      const result = await this.$API.reqGetSongComment({ id: this.$route.query.id, limit: 20, offset: (this.page - 1) * 20 })
      result.data.comments.forEach(item =>
        this.commnetList.push(item)
      )
      // this.commnetList = result.data.comments
      this.isLoading = false
      // 隐藏点：每次请求完数据以后都要把loading设置为false，否则，就不会再次触发onLoad事件（可能会引发递归，所以必须要数据增加）
      this.loading = false
    }
  }

}
</script>
<style lang="less" scoped>
.main {
  padding-top: 46px;
}
.wrap {
  margin-bottom: 15px;
  display: flex;
}
.img_wrap {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.266667rem;
}

.img_wrap img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  }

.content_wrap{
  flex:1
}

// 右侧头部
.header_wrap{
display: flex;
.info_wrap {
  flex: 0.8;
}
.info_wrap p:first-child {
text-align: left;
  font-size: 0.373333rem;
  color: #666;
}

.info_wrap p:last-of-type {
  font-size: 0.24rem;
text-align: left;

  color: #999;
}
.header_wrap div:last-of-type {
  color: #999;
  font-size: 0.293333rem;
}
}
.footer_wrap {
  margin-top: 10px;
  font-size: 0.3rem;
  color: #333;
  text-align: left;
}
</style>
