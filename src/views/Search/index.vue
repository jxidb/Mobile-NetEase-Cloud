<template>
  <div>
    <!-- 热门搜索 -->
    <van-search v-model.trim="value" placeholder="请输入搜索关键词" shape="round" />
    <div class="search_wrap" v-if="searchList.length===0">
      <p class="hot_title">热门搜索</p>

      <ul class="hot_name_wrap" @click="btn">
        <li class="hot_item" v-for="(item,index) in hotList" :hhh="index" :key="index">{{item.first}}</li>
      </ul>
      <div class="search_records">
        <p>搜索记录</p>
        <ul @click="SearchRecords">
          <li v-for="(item,index) in removalValue" :ddd="index" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>

    <!-- 搜索结果 -->

    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <!-- <van-cell v-for="item in searchList" :key="item.id" :title="item.name"  :label="item.ar[0].name" style="text-align:left;  font-size: 0.35rem;" center> -->
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <!-- <template #right-icon>
          <van-icon name="play-circle-o"  class="search-icon" />
        </template> -->
      <!-- </van-cell> -->
      <SongItem v-for="item in searchList" :key="item.id" :id="item.id" :label="item.ar[0].name" :title="item.name"></SongItem>

    </div>
  </div>
</template>
<script>
import SongItem from '@/components/SongItem'
export default {
  name: 'Sea-rch',
  data () {
    return {
      value: '', // 搜索关键字
      hotList: [], // 热门搜索表单
      timer: null, // 防抖关键字
      searchList: [], // 搜索结果
      searchValue: [], // 搜索的历史记录
      removalValue: {} // 数组去重后的对象
    }
  },
  components: {
    SongItem
  },
  async created () {
    const result = await this.$API.reqHotList()
    // console.log(result)
    this.hotList = result.data.result.hots
    this.getremovalValue()
    // console.log(this.hotList)
  },

  methods: {
    // 给li的父级添加点击事件。（事件委派）可以极大的提示性能
    async btn (e) {
      const a = e.target.getAttribute('hhh')
      const b = this.hotList[a].first
      this.value = b // 点击关键字 赋予搜索框提示
      this.searchValue.push(b) // 将搜索的关键字添加到搜索历史列表中
      // 点击关键字  发起请求
      const result = await this.$API.reqSearchList({ type: 1, keywords: this.value })
      this.searchList = result.data.result.songs
      // 清除在watch里面的请求
      setTimeout(() => {
        clearTimeout(this.timer)
      })
    },
    // 点击搜索记录，直接进行搜索
    SearchRecords (e) {
      const a = e.target.getAttribute('ddd')
      this.value = this.removalValue[a]
    },
    // 获取搜索历史记录
    getremovalValue () {
      // 将搜索的记录添加到搜索列表中
      if (this.value.length === 0) {
        if (localStorage.getItem('removalValue')) {
          this.removalValue = JSON.parse(localStorage.getItem('removalValue'))
        }
      } else {
        this.searchValue.push(this.value)
        const c = new Set(this.searchValue)// 将搜索列表中的重复数据去除
        // console.log(this.removalValue)
        const d = [...c] // 展开运算符，将c里面的每一个元素都放到数组中并赋值给d
        //  为了每次刷新页面，搜索数据不丢失，就将搜索的数据存放在本地中，

        localStorage.setItem('removalValue', JSON.stringify(d))

        this.removalValue = JSON.parse(localStorage.getItem('removalValue'))
        console.log(this.removalValue)
      }
    }
  },
  watch: {
    // 监听value的变化，因为是普通类型，所以不需要使用深度监听
    value () {
      clearTimeout(this.timer) // 防止输入框空的时候，还显示请求返回回来的数据，保证最后那次网络请求关闭
      if (this.value.length === 0) {
        this.searchList = []
      } else {
        this.getremovalValue()
        this.timer = setTimeout(async () => {
          const result = await this.$API.reqSearchList({ type: 1, keywords: this.value })

          this.searchList = result.data.result.songs
          // console.log(this.searchList)
        }, 500)
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .van-field__control {
  font-size: 14px;
}
// 搜索框
.hot_title {
  font-size: 0.32rem;
  color: #666;
  text-align: left;
}
// 搜索框样式
.search_wrap {
  padding: 0.266667rem;
}
/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
  // text-align: left;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 13px;
  // font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

.search_records {
  text-align: left;
  font-size: 16px;
  p {
    margin-bottom: 10px;
  }
  li{
    margin-bottom: 10px;
  }
}
</style>
