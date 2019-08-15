<template>
    <div>
      <p slot="header" style="text-align:center;margin-bottom:20px">
             <span style='font-family: arial, "Microsoft Yahei", 微软雅黑;'>新建流程模型</span>
      </p>      
     <Form ref="formValidate" :model="formValidate"  :label-width="80">
        <FormItem label="名称" prop="name">
            <Input v-model="formValidate.name"  @on-change="valueChange"></Input>
        </FormItem>
        <FormItem label="类型" prop="type">
            <Select v-model="formValidate.extendActBusinessId" @on-change="valueChange">
                <Option value="0">请假</Option>
                <Option value="1">报销</Option>
            </Select>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="formValidate.desc"  @on-change="valueChange" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
    </Form>
   <!--  <div slot="footer">      
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </div> -->
   </div>
</template>
<script>
import HTTP from '../../../api/work-flow.js';
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    type: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: 'Please select the type', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            valueChange() {
                var obj = this
                this.$emit('value', obj.formValidate)
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })

            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
