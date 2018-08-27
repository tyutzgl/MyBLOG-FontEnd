<template>
  <div id="header">
    <!-- router-link 可以理解为a标签的超链接 -->
    <!-- :select="handleSelect" -->
    <div>
      <el-menu router :default-active="$route.path"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <span class="logo" style="">Pepsi-Blog</span>
        <el-menu-item index="/">
          <template>
            <i class="el-icon-tickets"></i>
            <span>博客首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/helloVue">
          <template>
            <i class="el-icon-share"></i>
            <span>相关推荐</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/addBlog">
          <template>
            <i class="el-icon-edit"></i>
            <span>上传博客</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/myBlog">
          <template>
            <i class="el-icon-loading"></i>
            <span>我的博客</span>
          </template>
        </el-menu-item>
        <span class="login-link">
          <router-link to="/login" class="link" v-show="isShow">登录/注册</router-link>
          <el-button class="logoutBtn" v-on:click="logout" v-show="!isShow" style="float: right">注销</el-button>
        </span>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    /**
     * isShow:true 未登录状态
     */
    props: {
      isShow: {
        type: Boolean,
        default: true
      }
    },
    name: "Header",
    created:function () {
      this.$http.get("http://127.0.0.1/serve/login/isLogin")
        .then((msg) => {
          console.log(msg.data);
          if (msg.data.statusCode === 1) {
            this.$emit('setLogin',false);
          }
        });
    },
    methods: {
      logout() {
        this.$emit('setLogin',true);
        // this.isShow = true;
        this.$router.push({path: '/login'});
      },
    }
  }
</script>

<style scoped>
  #header {
    width: 100%;
    background-color: #545c64;
  }

  .logo {
    margin-left: 30px;
    float: left;
    position: relative;
    text-shadow: #64ddff 2px 2px 2px;
    color: white;
    font-size: 30px;
    font-style: italic;
    line-height: 54px;
  }

  .el-menu {
    margin: 0;
    border: 0;
    height: 54px;
  }

  .el-menu-item:nth-child(2) {
    margin-left: 50px;
    font-size: 15px;

  }

  .el-menu-item {
    margin-left: 20px;
    font-size: 15px;
    height: 54px;
  }

  ul, li {
    margin-left: 50px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
  }

  li {
    float: left;
    list-style: none;
    margin-left: 10px;
  }

  .login-link {
    line-height: 54px;
    color: white;
  }

  .link {
    color: white;
    float: right;
    margin-right: 30px;
    font-size: 15px;
    text-decoration: none;
  }
  .logoutBtn{
    height: 54px;
    border-radius: 0;
    background-color: #545c64;
    color: white;
    border: 0 solid;
  }

</style>
