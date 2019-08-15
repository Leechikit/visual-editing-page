<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="loginConsole">
    <div class="loginConsole-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="loginConsole-tip">协同管理系统管理台</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from './login-form'
import HTTP from '@/api/console.js'
import Cookies from 'js-cookie';
export default {
  components: {
    LoginForm
  },
  methods: {
     handleSubmit ({ userName, password }) {
       HTTP.loginConsole({loginName:userName,password:password}).then((res)=>{
         if(res.code==0){
           Cookies.set("consoleLogin",1);
           Cookies.remove('isLogin');
           HTTP.routers().then((res)=>{
             if(res.code==0){
              //  this.$router.push({
              //   name: 'consolePage'
              // })
              this.$router.push({
                 name: 'admin'
                })
             }
             else{
               this.$Message.error(res.msg);
             }
             
           })
                   
         }
         else{
            this.$Message.error(res.msg);
         }
       }).catch((e)=>{
             this.$Message.error(e.message);
       })
     
    }
  }
}
</script>

<style>

</style>
