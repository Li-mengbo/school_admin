<template>
  <div class="login-container">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" autocomplete="off" class="login-form">
      <h3 class="title">北京财贸</h3>
      <el-form-item prop="userName" class="el-form-item">
        <el-input v-model="loginForm.userName" name="userName" type="text" autocomplete="off" placeholder="账号"/>
      </el-form-item>
      <el-form-item prop="password" class="el-form-item">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" show-password placeholder="密码"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="submitForm('loginForm')">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Login',
    data() {
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            { validator: checkUserName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'flag'
      ])
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // console.log(this.loginForm.userName);
            // const userName = this.loginForm.userName;
            // const password = this.loginForm.password;
            this.$store.dispatch('Login', this.loginForm).then(() => {
              alert('登录成功1');
              this.$router.push({ path: '/nav/nav1' })
            }).catch(() => {
              alert('登录失败');
            })
            //alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // resetForm(formName) {
      //   alert(flag);
      // }
    }
  }
</script>

<style lang="less">
  .login-container {
    width: 100%;
    height: 100%;
    background: #2d3a4b;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
      text-align: center;
      box-sizing: border-box;
      .title {
        margin-bottom:30px;
        color: #fff;
      }
      .el-form-item__label {
        color:#fff;
      }
      .el-input input{
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #fff;
        height: 47px;
      }
    }
  }
</style>
