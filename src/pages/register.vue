<template>
  <div class="bg">
    <div class="reg-page">
      <el-form ref="regForm" :model="regForm" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="regForm.email" placeholder="例：12345@qq.com"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="regForm.username" placeholder="例：admin"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw1">
          <el-input type="password" v-model="regForm.psw1" auto-complete="off" placeholder="第一次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="psw2">
          <el-input type="password" v-model="regForm.psw2" auto-complete="off" placeholder="第二次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="regForm.age" placeholder="例：18"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="text-align: left" prop="sex">
          <el-radio-group v-model="regForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自我介绍" prop="introduce">
          <el-input v-model="regForm.introduce" placeholder="例：我是优秀的程序猿"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="regForm.address" placeholder="例：上海浦东"></el-input>
        </el-form-item>
        <el-button type="primary" style="width: 100%" @click="submitForm('regForm')">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",

    data() {

      // 自定义规则，判断两次密码是否相同
      const checkPsw = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.regForm.psw1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };


      return {

        regForm: {
          email: '',
          username: '',
          psw1: '',
          psw2: '',
          address: '',
          age: '',
          sex: '',
          introduce: ''
        },
        /**
         * 表单域验证规则
         */
        rules: {
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          psw1: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          psw2: [
            {validator: checkPsw, trigger: 'blur'}
          ],
          age: [
            {required: true, message: '请输入年龄', trigger: 'blur'},
            {min: 1, max: 2, message: '年龄在1-100之间', trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          introduce: [
            {required: true, message: '请输入您的自我介绍，1-100字之间', trigger: 'blur'},
            {min: 1, max: 200, message: '字数超出限制', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        /**
         * 判断表单验证是否正确
         */
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
            this.$http.post(
              "http://127.0.0.1/serve/register/reg",
              this.regForm
            ).then((msg) => {
              if (msg.data === 1) {
                this.$notify({
                  title: 'success',
                  message: '恭喜您，用户注册成功！',
                  offset: 50,
                  type: 'success'
                });
                this.$router.push({path: '/login'});
              } else {
                alert('注册失败')
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .bg {
    margin: 0;
    padding-top: 3%;
    height: 620px;
    background: url("../assets/loginbg.jpg") no-repeat;
    background-size: 100% 100%
  }

  .reg-page {
    /*margin-left: 40%;*/
    width: 30%;
    text-shadow: cornflowerblue 0.2px 0.2px 0.2px;
    margin-left: 35%;
  }
</style>
