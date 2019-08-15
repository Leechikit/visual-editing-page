<template>
    <div>
	<Modal
        title="Title"
        v-model="modal7"
        :closable="false">
      <p slot="header" style="text-align:center;margin-bottom:20px">
            <span style='font-family: arial, "Microsoft Yahei", 微软雅黑;'>任务审批</span>
      </p>      
     <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="80">

 	     <Row>
            <Col span="11">
               	<FormItem label="标题" prop="name">
	            	<Input v-model="formValidate.name" style="margin-right:50px" @on-change="valueChange"></Input>
	        	</FormItem>
            </Col>
            <Col span="4" style="text-align: center"></Col>
            <Col span="11">
                 <FormItem label="day" prop="days">
            		<Input v-model="formValidate.days"  @on-change="valueChange" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        		</FormItem>
            </Col>
        </Row>
       
          <Row>
            <Col span="11">
               	<FormItem label="原因" prop="reson">
	            	<Input v-model="formValidate.reson" style="margin-right:50px" @on-change="valueChange"></Input>
	        	</FormItem>
            </Col>
            <Col span="4" style="text-align: center"></Col>
            <Col span="11">
                 <FormItem label="编号" prop="id">
            		<Input v-model="formValidate.id"  @on-change="valueChange" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        		</FormItem>
            </Col>
        </Row>
         <FormItem label="描述" prop="desc">
            <Input v-model="formValidate.desc"  @on-change="valueChange" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
    </Form>
    <div slot="footer">      
            <Button type="primary" @click="handleSubmit('formValidate')">同意</Button>
            <Button type="error" @click="handleSubmit('formValidate')">驳回</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
    </div>
    </Modal>
</div>
</template>
<script>
import HTTP from '../../../api/work-flow.js';
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    reson:'',
                    number: '',
                    id:'',
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
