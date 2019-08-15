<template>
    <div>
      <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
            <Icon type="information-circled"></Icon>
            <span>选择需要发起的流程</span>
      </p>      
     <Form :label-width="100">
        <FormItem label="类型" prop="type">
            <Select v-model="retType.defId">
                <Option v-for="item in list" :value="item.defId" :key="item.defId">{{ item.name }}</Option>
            </Select>
        </FormItem>
    </Form>
    <div slot="footer">      
            <Button type="primary" @click="handleSubmit()">Submit</Button>
            <Button type="ghost" @click="handleReset()" style="margin-left: 8px">Reset</Button>
    </div>
   </div>
</template>
<script>
import HTTP from '../../../api/work-flow.js';
    export default {
        data () {
            return {
                list:[],
                form: {},
                retType:{
                    actKey:'',
                    busId:'',
                    defId:'',
                    nodeType:''
                }
            }
        },
        props:[
            'param'
        ],
        mounted(){   
            this.getFlow();   
        },
        methods: {
            getFlow() {
                var obj = this
                HTTP.getFlowsByActKey(obj.param.actKey)
                    .then(res => {
                        this.list=res;

                    })
            },
            handleSubmit () {
                this.retType.actKey=this.param.actKey;
                this.retType.busId= this.param.id;
                this.retType.nodeType=2;
                console.log(this.param)
                HTTP.uploadFlow(this.retType)
                    .then(res => {
                        if(res.code==0){
                            this.$Message.success("提交成功")
                        }
                        else
                        this.$Message.error(res.msg)
                    })
            }
        }
    }
</script>
