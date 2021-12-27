<template>
  <div id="login">

    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="main"></div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowRegister}" class="register">
                <input type="text" placeholder="用户名" v-model="register.username">
                <input type="password" placeholder="密码" v-model="register.password">
                <p v-bind:class="{error:register.isError}">{{ register.notice }}</p>
                <div class="button" @click="onRegister">创建账号</div>
              </div>
            </transition>
            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowLogin}" class="login">
                <input type="text" placeholder="输入用户名" v-model="login.username">
                <input type="password" placeholder="密码" v-model="login.password">
                <p v-bind:class="{error:login.isError}">{{ login.notice }}</p>
                <div class="button" @click="onLogin"> 登录</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import auth from "../apis/auth";
auth.getInfo().then(data=>{
  console.log(data);
})
export default {
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false,
      login: {
        username: 'hunger',
        password: '123456',
        notice: '请输入用户名和密码',
        isError: false
      },
      register: {
        username: '',
        password: '',
        notice: '创建账户后请记住你的用户名和密码',
        isError: false
      }
    }

  },
  methods: {
    showRegister() {
      this.isShowRegister = true
      this.isShowLogin = false
    },
    showLogin() {
      this.isShowLogin = true
      this.isShowRegister = false
    },
    onRegister() {
      let result1 = this.validUsername(this.register.username)
      if (!result1.isValid) {
        this.register.isError = true
        this.register.notice = result1.notice
        return
      }
      let result2 = this.validPassword(this.register.password)
      if (!result2.isValid) {
        this.register.isError = true
        this.register.notice = result2.notice
        return
      }
      this.register.isError = false
      this.register.notice = '注册成功'
      console.log('账户:' + this.register.username, '密码:' + this.register.password)
      auth.register({username:this.register.username,password:this.register.password}).then(data=>{
        console.log(data);
      })
    },
    onLogin() {
      let result1 = this.validUsername(this.login.username)
      if (!result1.isValid) {
        this.login.isError = true
        this.login.notice = result1.notice
        return
      }
      let result2 = this.validPassword(this.login.password)
      if (!result2.isValid) {
        this.login.isError = true
        this.login.notice = result2.notice
        return
      }
      this.login.isError = false
      this.login.notice = '登入成功'
      console.log('开始登入:账户:' + this.login.username, '密码:' + this.login.password)
      auth.login({username:this.login.username,password:this.login.password}).then(data=>{
        console.log(data);
      })
    },
    validUsername(username) {
      return {
        isValid: /^[\w\u4e00-\u9fa5]{3,15}$/.test(username),
        notice: '用户名3~15个字符，仅限于字母数字下划线中文'
      }

    },
    validPassword(password) {
      return {
        isValid: /^.{6,16}$/.test(password),
        notice: '密码长度为6~16个字符'
      }
    }
  }
}
</script>

<style lang="less">

.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;

    background: url(~@/assets/cloudNote.png) center center no-repeat;

  }

  .form {
    width: 270px;
    border-left: 1px solid #ccc;
    overflow: hidden;

    h3 {
      padding: 10px 20px;
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;
      margin-top: -1px;

      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }
    }

    .button {
      background-color: #005ce6;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }

    .login, .register {
      padding: 0 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height .4s;
      &.show {
        height: 193px;
      }

      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 10px;
      }

      input:focus {
        border: 3px solid #9dcaf8;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
      }

      .error {
        color: red;
      }
    }

    .login {
      border-top: 0;
    }
  }
}

</style>
