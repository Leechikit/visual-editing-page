<style lang="less">
@import '~@/views/login.less';
</style>
<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                 <p slot="title">
                    <Icon type="ios-gear"></Icon>
                    修改密码
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules" >
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                         <FormItem prop="password">
                            <Input type="password" v-model="form.oldPassWord" placeholder="请输入旧密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.newPassWord" placeholder="请输入新密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.reNewPassword" placeholder="请确认新密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button size="large" @click="handleSubmit" type="primary" long>修改</Button>
                        </FormItem>
                        <div style="text-align: center;">
                          <router-link :to="{name:'home'}">
                              <span class="link-class">返回登录页</span>
                          </router-link>
                        </div>
                        <!-- <FormItem>
                            <Button size="large" icon="ios-arrow-back" @click="goHome" type="text" long>返回登录页</Button>
                        </FormItem> -->
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import userReq from '@/api/user.js'
export default {
  data() {
    return {
      loading: false,
      form: {
        userName: '',
        oldPassWord:'',
        newPassWord: '',
        reNewPassword: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
         oldPassWord: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPassWord: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        reNewPassword: [
          { required: true, message: '再次输入新密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      try {
        const valid = await this.$refs.loginForm.validate()
        if (!valid) return
        if (this.form.newPassWord != this.form.reNewPassword) {
          this.$Message.error('该用户两次输入新密码不一致，请重新输入！')
          return
        }

        let result = await userReq.modifyUserPassWord({
          loginName: this.form.userName,
          oldPassWd:this.form.oldPassWord,
          newPassWd: this.form.newPassWord
        })
        if (result.code === '-1') {
          this.$Message.error('错误：'+result.msg)
        }
       else if (result.code === '0') {
          this.$Message.success(
            '用户:' + this.form.userName + ',密码修改成功，即将跳转到登录页面'
          )
          var t
          clearTimeout(t)
          var tempThis = this
          t = setTimeout(function() {
            tempThis.$router.push({
              name: 'login'
            })
          }, 1500)
        } else {
          this.$Message.error(result.msg)
        }
      } catch (err) {
        console.log(err)
        this.$Message.error('This is an error')
      } finally {
        this.loading = false
      }
    },
    goHome() {
      this.$router.push({
              name: 'login'
            })
    }
  }
}
</script>
