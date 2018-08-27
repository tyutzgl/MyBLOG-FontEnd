<template>
  <div id="home">
    <el-container>
      <!-- 正文面板 -->
      <el-main>
        <el-tabs tab-position="left"
                 @tab-click="handleClick">
          <el-tab-pane label="最新发布">
            <div class="page-list">
              <el-card v-for="article in articleList"
                       :key="article.articleid"
                       class="box-card">
                <div slot="header">
                  <span>{{article.articlename}}</span>
                  <br/>
                  <el-button v-on:click="showBlog(article.articleid)" style="float: right; padding: 3px 0"
                             type="text">查看全文
                  </el-button>
                  <el-button style="float: right; padding: 3px 0;margin-right: 10px;color: black"
                             type="text">获赞数量：{{article.goodnum}}
                  </el-button>
                </div>
                <div class="text item" style="font-size: 14px">
                  {{article.description}}
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <!-- 数据库获取标签,根据标签查询相关博客列表 -->
          <el-tab-pane v-for="tag in tagList"
                       :key="tag.tagid"
                       :label="tag.tagname">
            <el-tag type="success" class="articleTag">{{tag.tagname}}</el-tag>
            <div class="page-list">
              <el-card v-for="article in articleListByTag" :key="article.articleid" class="box-card">
                <div slot="header">
                  <span>{{article.articlename}}</span>
                  <br/>
                  <el-button v-on:click="showBlog(article.articleid)" style="float: right; padding: 3px 0"
                             type="text">查看全文
                  </el-button>
                </div>
                <div class="text item" style="font-size: 14px">
                  {{article.description}}
                </div>
              </el-card>
            </div>
            <div>
            </div>
          </el-tab-pane>

        </el-tabs>
      </el-main>
      <!-- 右侧面板 -->
      <el-aside>

        <el-form :inline="true" :model="formInLine" class="search-form-inline">
          <el-form-item>
            <el-input class="search-input" v-model="formInLine.text" placeholder="搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" v-on:click="searchArtList()" circle></el-button>
          </el-form-item>
        </el-form>

        <el-card class="hot-list">
          <h4>热门文章</h4>
          <hr/>
          <li>置顶：关于本博客相关技术</li>
          <li v-for="article in hotArticleList">
            <el-button v-on:click="showBlog(article.articleid)" style="padding:0;color: black"
                       type="text">{{article.articlename}}
            </el-button>
          </li>
        </el-card>
      </el-aside>
    </el-container>

  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        formInLine: {
          text: '',
          tabPosition: 'top',
        },
        articleList: [],
        tagList: [],
        articleListByTag: [],
        hotArticleList: [],
        tagname: ''
      }
    },
    methods: {
      showBlog: function (articleid) {
        this.$router.push({path: '/showBlog/' + articleid});
      },
      searchArtList: function () {
        this.$http.get("http://127.0.0.1/serve/article/searchArticleList?articleName="+this.formInLine.text)
          .then((msg) => {
            // console.log(msg.data);
            this.articleList = msg.data;
          });
      },
      handleClick: function (tab, event) {
        if (event.target.innerHTML === '最新发布') {
          console.log('最新发布11');
          this.$http.get("http://127.0.0.1/serve/article/newArtivleList?limit=12")
            .then((msg) => {
              // console.log(msg.data);
              this.articleList = msg.data;
            });
        } else {
          console.log(event.target.innerHTML);
          this.tagname = event.target.innerHTML;
          this.$http.get("http://127.0.0.1/serve/article/getArticleListByTag?tagname=" + this.tagname)
            .then((msg) => {
              this.articleListByTag = msg.data;
              // console.log(msg);
            });
        }
        // console.log(event);
        // console.log(tab);
      }
    },
    created: function () {
      this.$http.get("http://127.0.0.1/serve/article/newArtivleList?limit=12")
        .then((msg) => {
          // console.log(msg.data);
          this.articleList = msg.data;
        });
      this.$http.get("http://127.0.0.1/serve/article/hotArtivleList?limit=12")
        .then((msg) => {
          // console.log(msg.data);
          this.hotArticleList = msg.data;
        });
      this.$http.get("http://127.0.0.1/serve/tags/getTagsNameList")
        .then((msg) => {
          // console.log(msg.data);
          this.tagList = msg.data;
        });
    }
  }
</script>

<style scoped>

  .el-container{
    height: 1080px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 100px;
    padding: 0;
    height: 100%;
  }

  .el-tabs{
    background-image: url("../assets/bgx.gif");
    padding-top: 25px;

    min-height: 1055px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    /*line-height: 200px;*/
  }

  .search-form-inline {
    margin-top: 40px;
  }

  .search-input {
    margin: 0;
    width: 200px;
  }


  .hot-list {
    border: 0 solid;
    background-color: #D3DCE6;
    margin-top: 30px;
  }

  .hot-list li {
    list-style: none;
    margin-top: 10px;
    border-bottom: 0.5px dashed;
    text-align: left;
  }

  .page-list {
    width: 100%;
    text-align: left
  }

  .box-card {
    width: 420px;
    line-height: 30px;
    float: left;
    margin-left: 20px;
    margin-bottom: 20px
  }

  .page-list .el-card {
    height: 180px;
  }

  .articleTag {
    width: 100%;
    margin: 0;
    border: 0 solid;
    padding: 0;
    font-size: 15px;
    border-radius: 0;
  }

</style>
