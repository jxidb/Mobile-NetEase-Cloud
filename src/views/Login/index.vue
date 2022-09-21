<template>
<div class="main">
<div class="login_way" v-show="login===''">
    <p @click="login='phone'">手机号登录</p>
  <p @click="login='email'">邮箱登录</p>
  <p @click="Erweima">二维码登录</p>
</div>
  <!-- 手机登录 -->
   <van-form @submit="onSubmit" v-if="login==='phone'">
  <!-- van-field中name属性是提交表单时，输入框值对于的属性名 -->
  <!--label：输入框左边的提示  -->
  <div class="icon" @click="$router.push('/layout/home')">
     <van-icon name="arrow-left"  />
  </div>
  <van-field
    v-model="username"
    name="username"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
<!-- 邮箱登录 -->
 <van-form @submit="onSubmit" v-else-if="login==='email'">
  <!-- van-field中name属性是提交表单时，输入框值对于的属性名 -->
  <!--label：输入框左边的提示  -->
  <div class="icon" @click="$router.push('/layout/home')">
     <van-icon name="arrow-left"  />
  </div>
  <van-field
    v-model="username"
    name="username"
    label="邮箱"
    placeholder="邮箱"
    :rules="[{ required: true, message: '请填写邮箱' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="password"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>

<div v-else-if="login==='erweima'">
<img :src="imgUrl" alt="">
</div>

</div>
</template>
<script>
import Vue from 'vue'
import { Form, Field, Button } from 'vant'

Vue.use(Form)
Vue.use(Button)

Vue.use(Field)
export default {
  name: 'Lo-gin',
  data () {
    return {
      username: '',
      password: '',
      login: '', // 判断是手机登录还是二维码登录还是邮箱登录
      imgUrl: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values.username)
    },
    async Erweima () {
      this.login = 'erweima'
      const result = await this.$API.reqerweimaKey()
      const key = result.data.data.unikey

      const res = await this.$API.reqErweima({ key: key, qrimg: 'base64' })
      console.log(res)
    }

  }

}
</script>
<style lang="less" scoped>
.icon{
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.main{
  p{
    background-color: skyblue;
    border-radius: 15px;
    margin-bottom: 15px;
    }
}
</style>
