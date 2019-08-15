<style lang="less">
@import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
          <div >
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名" type="text" autocomplete='off'>
                            <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码" autocomplete='off'>
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password" v-if='showSelect&&isMulti'>
                           <Select v-model="select" >
                               <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.companyName }}</Option>
                           </Select>
                             
                          </Select>
                        </FormItem>
                        <FormItem class="forget-pwd">
                            <Row>
                                <!-- <Col span="6"  offset=4>
                                  <div v-if="isMulti">
                                    <router-link :to="{name:'corpAccount'}">
                                        <span class="link-class">创建企业</span>
                                    </router-link>
                                  </div>
                                  <span>&nbsp</span>
                                </Col> -->
                                <!-- <Col span="6" offset=18>
                                <router-link :to="{name:'updatePassword'}">
                                    <span class="link-class">修改密码</span>
                                </router-link>
                                </Col> -->
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Button size="large" v-if='!loginflag' :loading="loading2" @click="handleSubmit" type="primary" long>登录</Button>
                            <Button size="large" v-else :loading="loading" @click="login" type="primary" long>进入</Button>
                        </FormItem>
                    </Form>
                    <!--  <p class="login-tip">输入任意用户名和密码即可</p> -->
                </div>
                <div v-if="isMulti" style="text-align: center;">
                  还没有账户，立即
                  <router-link :to="{name:'corpAccount'}">
                      <span class="link-class">创建企业</span>
                  </router-link>
                </div>
            </Card>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import HTTP from '@/api/work-flow.js'
import { getUserRoleAndPermission } from '@/api/role.js'
export default {
  data() {
    return {
      loading: false,
      showSelect:false,
      loading2:false,
      loginflag:false,
      companyList:[],
      select:'',
      isMulti:false,
      form: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getFlag();
  },
  methods: {
    getFlag(){
      HTTP.isMulti().then((data)=>{
        if(data.code==0){
          this.isMulti=(data.isMulti=="true"?true:false)
          this.$store.state.app.isMulti =this.isMulti
        }
        else{
          this.$Message.error(data.msg)
        }
      }).catch((e)=>{
         this.$Message.error(e)
      })
    },

    async handleSubmit() {
      this.loading2 = true
      try {
        const valid = await this.$refs.loginForm.validate()
        if (!valid) return
        let result = await HTTP.LoginAccount({
          loginName: this.form.userName,
          password: this.form.password
        })
        if (result.code === '0'&&result.datas.length>0) {
          this.loginflag=true
          this.companyList = result.datas
          if(this.companyList&&this.companyList.length>0){
            this.showSelect = true
            if(result.datas.length==1){
               this.select=result.datas[0].id
               this.login();
            }
            else{
              this.select=result.datas[0].id
            }
           
          }  
        } else {
          this.$Message.error('用户名，密码错误')

        }
      } catch (err) {
        console.log(err)
        this.$Message.error('This is an error')
      } finally {
        this.loading2 = false
      }
    },



    async login() {
      this.loading = true
      try {
        const valid = await this.$refs.loginForm.validate()
        if (!valid) return
        let result = await HTTP.Login({
          loginName: this.form.userName,
          password: this.form.password,
          companyId: this.select
        })
        if (result.code === '0') {
          if (this.$store.state.app.isInDingTalk) {
            this.$store.commit('user/setAuthStatus', true);
          }
          Cookies.set('user', this.form.userName)
          Cookies.set('title', result.title)
          Cookies.set('userName', result.userName)

          let seconds = 10;
          let expires = new Date(new Date() * 1 + seconds * 1000);
          Cookies.set("isLogin","true",{ expires: expires }) //10秒后失效
          this.$store.commit(
            'setAvator',
            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
          );
          this.$store.commit('user/setCompanyId', result.companyId);
          // let permissionsRes = await getUserRoleAndPermission()
          // this.$store.dispatch(
          //   'user/setPermissionsObj',
          //   permissionsRes.permissions
          // )
          this.$router.push({
            name: 'home_index'
          })
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
    goToModifyPassWord() {
      this.$router.push({
        name: 'updatePassword'
      })
    }
  }
}
</script>
