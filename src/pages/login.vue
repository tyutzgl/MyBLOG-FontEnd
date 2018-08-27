<template>
  <div class="bg">
    <div class="login-page">
      <el-row>
        <el-col :span="8">
          <el-input id="name" v-model="userEmail" placeholder="请输入用户名/邮箱">
            <template slot="prepend">帐号</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
            <template slot="prepend">密码</template>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-button id="login" :plain="true" @click="loginCheck" style="width:100%" type="primary">登录</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="reg-t">
          <router-link to="/register">还没有账号？去注册一个</router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  import header from "../components/Header";

  export default {
    name: "login",
    data() {
      return {
        userEmail: '',
        password: '',
        username: '',
      }
    },
    created: function () {
      // 清除session
      this.$http.get("http://127.0.0.1/serve/login/clearSession")
        .then((msg) => {
        });
    },
    methods: {
      loginCheck() {
        let userEmail = this.userEmail;
        let password = this.password;
        if (userEmail === '' || password === '') {
          this.$notify({
            title: '账号或密码为空',
            dangerouslyUseHTMLString: true,
            message: '<h5>请在左侧输入框中输入正确的账号和密码</h5>',
            type: 'error',
            offset: 50
          });
        } else {
          this.$http.post(
            "http://127.0.0.1/serve/login/checkLogin",
            {
              userEmail: userEmail,
              password: password
            }
          ).then((msg) => {
            if (msg.data === 1) {
              this.$emit('setLogin',false);
              this.$router.replace({path: '/'});
              // location.reload();
            } else if (msg.data === 0) {
              this.$notify({
                title: '登录失败',
                dangerouslyUseHTMLString: true,
                message: '<h5>请检查用户名和密码</h5>',
                type: 'error',
                offset: 50
              });
            }


          });
        }
      }
    }

  }
</script>

<style scoped>
  .bg {
    margin: 0;
    padding-top: 10px;
    height: 620px;
    background-image: url("../assets/loginbg.jpg");
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-row :last-child {
    margin-bottom: 0;
    width: 100%;
  }

  .reg-t {
    text-align: right;
  }

  .login-page {
    margin-top: 5%;
    /*margin-left: 40%;*/
    width: 24%;
    text-shadow: cornflowerblue 0.2px 0.2px 0.2px;
    margin-left: 38%;
  }
</style>
