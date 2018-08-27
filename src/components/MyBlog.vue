<template>
  <el-container>
    <el-main>

      <el-card v-for="article in articleList"
               :key="article.articleid"
               class="box-card">
        <div slot="header">
          <span>{{article.articlename}}</span>
          <br/>
          <el-button v-on:click="showBlog(article.articleid)" style="float: right; padding: 3px 0"
                     type="text">查看全文
          </el-button>
          <el-button v-on:click="articleFormVisible = true" style="float: right; padding: 3px 0;margin-right: 10px"
                     type="text">修改
          </el-button>
          <el-button v-on:click="deleteArticle(article.articleid)"
                     style="float: right; padding: 3px 0;margin-right: 10px"
                     type="text">删除
          </el-button>
          <el-button style="float: right; padding: 3px 0;margin-right: 10px;color: black"
                     type="text">创建时间：{{getData(article.createtime)}}
          </el-button>
          <el-button style="float: right; padding: 3px 0;margin-right: 10px;color: black"
                     type="text">获赞数量：{{article.goodnum}}
          </el-button>
        </div>
        <div class="text item" style="font-size: 14px">
          {{article.description}}
        </div>
      </el-card>

      <el-dialog title="修改博客信息" :visible.sync="articleFormVisible" width="1000px">
        <el-form label-width="80px" style="width: 95%">
          <el-form-item>
            <h2>修改博客</h2>
          </el-form-item>
          <el-form-item label="标题" prop="a_title">
            <el-input style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="a_description">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="标签" style="text-align: left">

            <el-input style="width: 20%" placeholder="没有心仪的？在这里添加你的个性标签"></el-input>
          </el-form-item>
          <el-form-item label="文章" prop="a_content">
            <quill-editor ref="myTextEditor"
                          :options="editorOption"
                          @blur="onEditorBlur($event)"
                          @focus="onEditorFocus($event)"
                          @change="onEditorChange($event)">
            </quill-editor>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="articleFormVisible = false">取 消</el-button>
          <el-button @click="articleFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

    </el-main>

    <el-aside>
      <h2 align="center">我的信息</h2>
      <hr/>
      <div class="myMsg">
        <h4>用户名：{{userInfo.username}}</h4>
        <h4>邮箱：{{userInfo.email}}</h4>
        <h4>电话：{{userInfo.phone}}</h4>
        <h4>性别：{{userInfo.sex}}</h4>
        <h4>自我介绍：{{userInfo.introduce}}</h4>
        <h4>博客数量：{{articleNum}}</h4>
        <h4>获赞总数：{{allGoodNum}}</h4>
        <el-button @click="dialogFormVisible = true">修改我的信息</el-button>
        <el-dialog title="修改我的信息" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="userInfoForm">
            <h3>其余信息与账号有关，暂时无法修改！</h3>
            <el-form-item label="用户名">
              <el-input v-model="userInfoForm.username" auto-complete="off" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="电话号">
              <el-input v-model="userInfoForm.phone" auto-complete="off" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="自我介绍">
              <el-input v-model="userInfoForm.introduce" auto-complete="off" style="width: 300px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
          </div>
        </el-dialog>
        <el-button @click="pswFormVisible = true">修改密码</el-button>
        <el-dialog title="修改我的信息" :visible.sync="pswFormVisible" width="500px">
          <el-form :model="psw">
            <h3>请确保两次输入密码正确，否则修改失败</h3>
            <el-form-item label="第一次输入密码" >
              <el-input v-model="psw.psw1" auto-complete="off" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="第二次输入密码" >
              <el-input v-model="psw.psw2" auto-complete="off" style="width: 300px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  // import headerComponent from '../components/Header';
  import {formatDate} from '../common.js'

  export default {
    name: "MyBlog",
    created: function () {
      // 判断用户是否登录请求
      this.$http.get("http://127.0.0.1/serve/login/isLogin")
        .then((msg) => {
          console.log(msg.data);
          if (msg.data.statusCode === 0) {
            this.$router.push({path: '/login'});
            this.$notify({
              title: '用户未登录',
              message: '您未登录，请先登录',
              offset: 50,
              type: 'warning'
            })
          } else {
            this.$http.get("http://127.0.0.1/serve/article/getArticleListByUser")
              .then((msg) => {
                this.articleList = msg.data;
              });
            this.$http.get("http://127.0.0.1/serve/user/getUserInfo")
              .then((msg) => {
                this.userInfo = msg.data;
              });
            this.$http.get("http://127.0.0.1/serve/article/getGoodNum")
              .then((msg) => {
                this.allGoodNum = msg.data;
              });
            this.$http.get("http://127.0.0.1/serve/article/getArticleNum")
              .then((msg) => {
                this.articleNum = msg.data;
              });
          }
        });

    },
    data() {
      return {
        username: '',
        article: null,
        articleList: [],
        userInfo: {
          username:'',
          email:'',
          phone:'',
          sex:'',
          introduce:''
        },
        dialogFormVisible: false,
        pswFormVisible: false,
        articleFormVisible: false,
        userInfoForm: {
          username: '',
          phone: '',
          introduce: '',
        },
        psw: {
          psw1: '',
          psw2: ''
        },
        articleNum: 0,
        allGoodNum: 0
      }
    },
    methods: {
      showBlog: function (articleid) {
        this.$router.push({path: '/showBlog/' + articleid});
      },

      editorOption(){
      },
      getData: function (dateTime) {
        let date = new Date(dateTime);
        let creatTime = formatDate(date, 'yyyy-MM-dd hh:mm');
        return creatTime;
      },

      deleteArticle: function (articleid) {
        this.$confirm('是否删除该博客?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get("http://127.0.0.1/serve/article/deleteBlog?articleId=" + articleid)
            .then((msg) => {
              if (msg.data === 1) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.$http.get("http://127.0.0.1/serve/article/getArticleListByUser")
                  .then((msg) => {
                    this.articleList = msg.data;
                  });
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      editUserInfo: function () {
        this.$http.post("http://127.0.0.1/serve/user/editUserInfo", this.userInfoForm)
          .then((msg) => {
            if (msg.data === 1) {
              this.$http.get("http://127.0.0.1/serve/user/getUserInfo")
                .then((msg) => {
                  this.userInfo = msg.data;
                });
              this.dialogFormVisible = false;
            }
          });


      }
    }
  }
</script>

<style scoped>

  .el-main {
    background-color: #E9EEF3;
    min-height: 1024px;
  }

  .el-aside {
    background-image: url("../assets/bg.gif");
  }

  .myMsg {
    margin-left: 20px;
  }

  .box-card {
    margin-top: 15px;
  }

  .box-card:first-child {
    margin-top: 0;
  }

</style>
