<template>
  <div>
    <el-form label-width="80px" style="width: 95%">
      <el-form-item>
        <h2>添加我的新博客</h2>
        <h5 style="color: red">友情提示:用户如果未登录请先进行登录在编辑您的博客，不然无法上传</h5>
      </el-form-item>
      <el-form-item label="标题" prop="a_title">
        <el-input style="width: 50%" v-model="article.articlename"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="a_description">
        <el-input v-model="article.description"></el-input>
      </el-form-item>
      <el-form-item label="标签" style="text-align: left">
        <el-select
          clearable
          placeholder="热门标签"
          v-model="article.tag" value="">
          <el-option
            v-for="item in tagList"
            :label="item.tagname"
            :value="item.tagname"></el-option>
        </el-select>
        <el-input v-model="article.tag_comment" style="width: 20%" placeholder="没有心仪的？在这里添加你的个性标签"></el-input>
      </el-form-item>
      <el-form-item label="文章" prop="a_content">
        <quill-editor ref="myTextEditor"
                      v-model="article.content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    name: 'AddBlog',
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
          }
        });
      this.$http.get("http://127.0.0.1/serve/tags/getTagsNameList")
        .then((msg) => {
          // console.log(msg.data);
          this.tagList = msg.data;
        });
    },
    data() {
      return {
        msg: '添加我的新博客',
        editorOption: {
          // something config
        },
        article: {
          articlename: '',
          tag: '',
          tag_comment: '',
          description: '',
          content: '',
        },
        tagList: []
      }
    },
    methods: {
      onEditorBlur(editor) {
      },
      onEditorFocus(editor) {
      },
      onEditorChange(editor) {
      },
      onSubmit() {
        console.log('上传博客' + this.article.articlename);
        // console.log(this.article.content);
        this.$http.post(
          "http://127.0.0.1/serve/article/addArticle",
          this.article
        ).then((msg) => {
          if (msg.data.statusCode === 1) {
            this.$notify({
              title: 'success',
              message: "博客添加成功",
              type: 'success',
              offset: 50
            });
            this.$router.push({path: '/myBlog'});
          } else {
            this.$notify({
              title: 'erroe',
              message: '添加失败',
              offset: 50,
              type: 'warning'
            })
          }

        })
      }
    }
  }
</script>

<style scoped>

</style>
