<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.quill-style{


}
</style>


<style>
    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
        height: 120px;
        margin-top: -16px;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
        background: #fff;
        padding: 16px;
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-color: transparent;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-color: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
        border-radius: 0;
        background: #fff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
        border-top: 1px solid #3399ff;
    }
    .demo-tabs-style2 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active:before{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: #3399ff;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
<template>
          <Row class="model-config">
            <i-col span="24">
              <Card>
                <Tabs value="name1">
                <TabPane label="控件属性" name="name1">
                <i-form label-position="left"
                        :label-width="70"
                        :model="model">
                  <Form-item  label="控件ID">
                      <span v-if="editSoul.uid">{{editSoul.uid}}</span>
                    </Form-item>

                  <div v-for="(config,index) in configs"
                       v-if="config.showConfig === undefined|| config.showConfig"
                       :key="index">

                    <Form-item v-if="config.type === 'text'"
                               :label="config.desc">
                       <Row>
                           <Col span="18">        
                         <i-input v-model="config.tmp"> </i-input>
                        </Col>
                        <Col span="6">
                          <Button type="dashed" @click="setValue(config)">确定</Button>
                        </Col>
                      </Row>
                    </Form-item>

                      <Form-item v-if="config.type === 'textarea'"
                               :label="config.desc">

                      <textarea rows="3" style="width:100%" v-model="config.value">
                      </textarea>
                    </Form-item>
                   

                    <Form-item v-if="config.type === 'boolean'"
                               :label="config.desc">
                      <i-switch size="large" style="margin-left:20px" v-model="config.value">
                        <span slot="open">true</span>
                        <span slot="close">false</span>
                      </i-switch>
                    </Form-item>
                     <Form-item v-if="config.type === 'checkbox'"
                               :label="config.desc">
                        <Form ref="formDynamic" :model="config" :label-width="80" >
                           <FormItem
                                  v-for="(item, index) in config.value"
                                  :key="index"
                                  :prop="'items.' + index + '.value'"
                                  :rules="{required: true, message: 'Item ' + item.index +' 不可为空', trigger: 'blur'}">
                              <Row>
                                  <Col span="16">
                                      <Input type="text" v-model="item.label" placeholder="请输入..."></Input>
                                  </Col>
                                  <Col span="4" offset="1">
                                      <Button type="ghost" size="small" @click="checkRemove(config,index)">删除</Button>
                                  </Col>
                              </Row>
                          </FormItem>
                          <FormItem>
                              <Row>
                                  <Col span="12">
                                      <Button type="dashed" long @click="checkAdd(config)" icon="plus-round">添加</Button>
                                  </Col>
                              </Row>
                          </FormItem>
                      </Form>
                    </Form-item>
                     <Form-item v-if="config.type === 'radio'"
                               :label="config.desc">
                        <Form ref="formDynamic" :model="config" :label-width="80" >
                           <FormItem
                                  v-for="(item, index) in config.value"
                                  :key="index"
                                  :prop="'items.' + index + '.value'"
                                  :rules="{required: true, message: 'Item ' + item.index +' 不可为空', trigger: 'blur'}">
                              <Row>
                                  <Col span="16">
                                      <Input type="text" v-model="item.label" placeholder="请输入..."></Input>
                                  </Col>
                                  <Col span="4" offset="1">
                                      <Button type="ghost" size="small" @click="checkRemove(config,index)">删除</Button>
                                  </Col>
                              </Row>
                          </FormItem>
                          <FormItem>
                              <Row>
                                  <Col span="12">
                                      <Button type="dashed" long @click="checkAdd(config)" icon="plus-round">添加</Button>
                                  </Col>
                              </Row>
                          </FormItem>
                      </Form>
                    </Form-item>



                     <Form-item v-if="config.type === 'selectItem'"
                               :label="config.desc">
                      <Select v-model="config.value">
                        <Option v-for="item in config.items" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </Form-item>

                    <Form-item v-if="config.type === 'select'"
                               :label="config.desc">
                        <Form ref="formDynamic" :model="config" :label-width="80" >
                           <FormItem
                                  v-for="(item, index) in config.value"
                                  v-if="item.status"
                                  :key="index"
                                  :prop="'items.' + index + '.value'"
                                  :rules="{required: true, message: 'Item ' + item.index +' 不可为空', trigger: 'blur'}">
                              <Row>
                                  <Col span="16">
                                      <Input type="text" v-model="item.label" placeholder="请输入..." @on-change="changeData(item)"></Input>
                                  </Col>
                                  <Col span="4" offset="1">
                                      <Button type="ghost" size="small" @click="handleRemove(config,index)">删除</Button>
                                  </Col>
                              </Row>
                          </FormItem>
                          <FormItem>
                              <Row>
                                  <Col span="12">
                                      <Button type="dashed" long @click="handleAdd(config)" icon="plus-round">添加</Button>
                                  </Col>
                              </Row>
                          </FormItem>
                      </Form>
                    </Form-item>
                    <Form-item v-if="config.type === 'slider'"
                               :label="config.desc">
                      <Slider v-model="config.value" :step="1" :min="0" :max="24" show-stops ></Slider>
                    </Form-item>
                     <Form-item  v-if="config.type === 'modal'" >
                          <Button type="ghost" long @click="showHideModal">设置可选范围</Button>
                           <Modal v-model="modalhide" width="900">
                              <div slot="header">
                                  设置可选范围
                              </div>
                              <div>
                                <Card>
                                 <Tag v-for="item in config.value" :key="item" :name="item" color="yellow" closable @on-close="handleClose2(config.value)">{{ item }}</Tag>
                               </Card>
                                 <div class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;margin-top:20px">
                                    <Tabs>
                                        <TabPane label="成员">
                                            <Tree :data="data3" :load-data="loadData" show-checkbox @on-check-change="changeCheckValue(config,data3)"></Tree>
                                        </TabPane>
                                        <TabPane label="部门">
                                           
                                        </TabPane>
                                        <TabPane label="角色">
                                          
                                        </TabPane>
                                    </Tabs>
                                </div>
                              </div>   
                              <div slot="footer">
                                  
                              </div>
                       </Modal>
                    </Form-item>
                   

                  </div>
                  </i-form>
                </TabPane>
                <TabPane label="表单属性" name="name2"></TabPane>
                </Tabs>
              </Card>
            </i-col>
          </Row>
     
  
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import HTTP from '../api/work-flow.js'
  export default {
    name: 'Editor',
    props: {
      pageName:'',
      editSoul: [Object]
    },
    components: {  
        quillEditor  
    },
    data(){
      return {
        content:"",
        editorOption: {

        },
        model: {},
        modalhide:false,
        configs: [],
        checkConfig:[],
        index: 1,
        checkIndex:1,
        count:[],
        data3: [
                {
                    title: '当前成员',
                    loading: false,
                    children: []
                }
            ]
        
      }
    },
    methods: {
      save(){
        for (let i = 0; i < this.configs.length; i++) {
          let config = this.configs[i]
          this.model[config.name] = config.value
        }
      },

       handleClose2 (param) {
                const index = param.indexOf(name);
                param.splice(index, 1);
            },
      handleReset (config,name) {
                this.$refs[name].resetFields();
                config.value=[];
            },
      handleAdd (config) {
          this.index++;
          config.value.push({
              label: '',
              value: "",
              status: 1
          });
      },
      changeData(item){
        item.value=item.label
      },
      setValue(config){
        config.value =config.tmp

      },
      handleRemove (config,index) {
          this.index--;
          config.value.splice(index,1);
      },
      checkReset (config,name) {
                this.$refs[name].resetFields();
                config.value=[];
            },
      checkAdd (config) {
          this.checkIndex++;
          config.value.push({
              label: '',
              value: this.checkIndex,
          });
      },
      checkRemove (config,index) {
          this.checkIndex--;
          config.value.splice(index,1);
      },
      showHideModal(){
        this.modalhide=true;
      },
      onEditorChange(event){

      },
      changeCheckValue(param,data){
        // param.value=data
        console.log(data);
        let ret =[];
        for(var index in data[0].children){
          console.log(data[0].children[index]);
          if(data[0].children[index].checked){
            ret.push(data[0].children[index].title)
          }
        }
        param.value=ret;
      },
      loadData (item, callback) {
            
            let data=[];
            HTTP.getUserList().then((res)=>{
              
               for(var index in res){
                  let tmp ={};
                  tmp.title=res[index].userName;
                  data.push(tmp);
               }
                callback(data);
            }).catch(e=>{
              this.$Message.error(e)
            })

           
            }
    },
    watch: {
      /**
       * 点击组件时显示编辑窗口
       * @param n
       */
      editSoul(n){
        /**
         * config是model里面的对象引用，所以不需要做双向绑定就能改变value：
         * label: {
              type: 'text',
              value: '测试',
              desc: 'x'
            }
         */
        this.editSoul = n
        let configs = []
        let model = {}
        try{
          for (let name in this.editSoul.model) {
            let config = this.editSoul.model[name]
            model[name] = ''
            config.name = name
            configs.push(config)
          }
          this.model = model
          this.configs = configs
        }catch (ex){
            console.warn(ex)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .model-config {
  }
</style>
