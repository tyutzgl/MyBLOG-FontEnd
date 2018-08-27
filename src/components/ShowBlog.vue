<template>
  <div class="bg">
    <div class="blogPage">
      <div class="blogContent">
        <h1>{{article.articlename}}</h1>
        <h3>{{article.description}}</h3>
        <hr/>
        <span>作者：{{article.userName}}</span>&nbsp;&nbsp;
        <span>标签/分类：</span>
        <el-tag>{{article.tag}}</el-tag>&nbsp;&nbsp;
        <span>创建时间：{{creatTime}}</span>&nbsp;&nbsp;
        <span style="float: right">
          <el-button size="mini" v-on:click="giveLike($event)" type="warning" icon="el-icon-star-off"></el-button>
          获赞数：{{article.goodnum}}
        </span>
        <br/>
        <hr/>
        <span v-html="article.content"></span>
      </div>
      <el-collapse accordion value="">
        <el-collapse-item>
          <template slot="title">
            <h3>此篇共有{{commentNum}}条评论（点击查看评论）<i class="header-icon el-icon-info"></i></h3>
          </template>
          <div>
            <el-input
              type="textarea"
              :rows="3"
              placeholder="留下你的评论....."
              v-model="commentarea">
            </el-input>
            <el-button :disabled="disabledStu" id="submitComment" class="submitComment" type="success"
                       v-on:click="submitComment">发表评论
            </el-button>
          </div>
          <div class="commentList" v-for="comment in commentList">
            <span style="font-size: 18px;color: #73747a">{{comment.username}}：</span>
            {{comment.content}}
            <br/>
            <span style="font-size: 10px;">{{getData(comment.createtime)}}</span>
            <hr style="border:0.5px solid #66bfb7"/>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>

  import {formatDate} from '../common.js'

  export default {
    name: "ShowBlog",
    data() {
      return {
        article: '',
        commentarea: '',
        creatTime: '',
        clickNum: 0,
        commentList: [],
        commentNum: 0,
        disabledStu: false
      }
    },
    methods: {
      /**
       * 提交评论
       */
      submitComment: function () {
        console.log('点击了提交评论');
        let content = this.commentarea;
        this.$http.get("http://127.0.0.1/serve/article/addComment?articleId="
          + this.$route.params.articleid
          + "&content=" + this.commentarea)
          .then((msg) => {
            if (msg.data === 1) {
              console.log(this.commentarea);
              this.$http.get("http://127.0.0.1/serve/article/selectCommentByArticleId?articleId=" + this.$route.params.articleid)
                .then((msg) => {
                  this.commentList = msg.data;
                });
              this.getCommentNum();
            }
          });
      },

      isLogin: function () {
        this.$http.get("http://127.0.0.1/serve/login/isLogin")
          .then((msg) => {
            console.log(msg.data);
            if (msg.data.statusCode === 0) {
              this.disabledStu = true;
            } else {
              this.disabledStu = false;
            }
          });
      },

      giveLike: function ($event) {
        console.log($event);
        let el = event.currentTarget;
        let i = this.clickNum;
        if (i === 0) {
          this.$http.get("http://127.0.0.1/serve/article/addGoodNum?articleId=" + this.$route.params.articleid)
            .then((msg) => {
              if (msg.data === 1) {
                this.article.goodnum++;
                this.clickNum++;
                el.style.color = "red";
              }
            });
        } else if (i === 1) {
          this.$http.get("http://127.0.0.1/serve/article/subGoodNum?articleId=" + this.$route.params.articleid)
            .then((msg) => {
              if (msg.data === 1) {
                this.article.goodnum--;
                this.clickNum--;
                el.style.color = "white";
              }
            });
        }
      },
      getData: function (dateTime) {
        let date = new Date(dateTime);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      },
      getCommentNum: function () {
        let articleId = this.$route.params.articleid;
        this.$http.get("http://127.0.0.1/serve/article/getCommentNum?articleId=" + articleId)
          .then((msg) => {
            this.commentNum = msg.data;
            console.log(this.commentNum);
          });
      }

    },
    created: function () {
      this.$http.get("http://127.0.0.1/serve/article/getArticleById?articleid=" + this.$route.params.articleid)
        .then((msg) => {
          this.article = msg.data;
          // 格式化日期
          let dateTime = msg.data.createtime;
          let date = new Date(dateTime);
          this.creatTime = formatDate(date, 'yyyy-MM-dd hh:mm');
          console.log(msg);
        });
      this.getCommentNum();
      this.$http.get("http://127.0.0.1/serve/article/selectCommentByArticleId?articleId=" + this.$route.params.articleid)
        .then((msg) => {
          this.commentList = msg.data;
        });
    }
  }
</script>

<style scoped>
  .bg {
    background-image: url("../assets/bgx.gif");
    padding-top: 20px;
  }

  .blogPage {
    width: 80%;
    margin-left: 10%;
    box-shadow: -15px -15px 50px #888888;
    border-radius: 5px;
    background: white;
  }

  .blogContent {
    padding: 20px;
    min-height: 725px;
  }

  .el-collapse {
    padding: 20px;
  }

  .commentList {
    margin-top: 20px;
  }

  .submitComment {
    width: 10%;
    margin-left: 90%;
    margin-top: 10px;
  }
</style>
