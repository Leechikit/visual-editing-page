<template>
    <div>
        <p slot="header" style="color:#f60;text-align:center;margin-bottom:20px">
            <span>新建模块</span>
        </p>
        <Form ref="formValidate" :model="formValidate"  :rules="ruleValidate" :label-width="80">
            <FormItem label="模块名">
                <Input v-model="formValidate.name"  @on-change="valueChange"></Input>
            </FormItem>
	    <FormItem label="图标">
    	    <Poptip placement="bottom-start" width="400" trigger="hover">
                    <Input search placeholder="请选择图标" v-model="formValidate.icon"/>
                    <div class="api" slot="content">
                        <center>
                          <div class="demo">
                              <div class="demo">
                                     <div>
                                        <Row  justify="start"   style="height:260px;overflow-y:auto">
                                          <Col span="8" v-for="(item, index) in cityList" :key="index" style="">
                                            <div class="icons-item" @click="valueChange1(item)">
                                             <svg class="icon" style="width: 4em; height: 4em;" aria-hidden="true" v-html="item.desc">
                                                {{item.desc}}
                                             </svg>
                                               <span style="word-break:normal; width:auto; display:block; white-space:pre-wrap;word-wrap : break-word ;overflow: hidden ;">{{item.label}}</span>
                                            </div>
                                          </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </center>
                    </div>
            </Poptip>
	    </FormItem>
        </Form>
        <!--<div slot="footer">-->
                 <!--<Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>-->
                 <!--<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>-->
         <!--</div>-->
    </div>
</template>
<script>
    import HTTP from '../../api/app-apply.js';
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
		            icon: ''
		    
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                },
		      cityList: [
                    {
                        value: "#icon-renshishenqing",
                        label: '客户',
                        desc :'<use xlink:href="#icon-renshishenqing"></use>'
                    },
                    {
                        value: "#icon-diannaoguzhang" ,
                        label: '编辑',
                        desc:'<use xlink:href="#icon-diannaoguzhang"></use>'
                    },
                    {
                        value: "#icon-buqian" ,
                        label: '饼图',
                        desc: '<use xlink:href="#icon-buqian"></use>'
                    },
                    {
                        value: "#icon-fukuanshenqing" ,
                        label: '报表',
                        desc:'<use xlink:href="#icon-fukuanshenqing"></use>'
                    },
                    {
                        value: "#icon-jiaotongbaoxiao" ,
                        label: '用户资料',
                        desc: '<use xlink:href="#icon-jiaotongbaoxiao"></use>'
                    },
                    {
                        value: "#icon-jiekuanshenqing" ,
                        label: '锁定',
                        desc : '<use xlink:href="#icon-jiekuanshenqing"></use>'
                    },
		    {
                        value: "#icon-xiujia" ,
                        label: '信息',
                        desc : '<use xlink:href="#icon-xiujia"></use>'
                    },
		    {
                        value: "#icon-ITshenqing" ,
                        label: '好评',
                        desc :'<use xlink:href="#icon-ITshenqing"></use>'
                    },
		    {
                        value: "#icon-jiaban" ,
                        label: '安装、施工',
                        desc: '<use xlink:href="#icon-jiaban"></use>'
                    },
		    {
                        value: "#icon-nan" ,
                        label: '考勤、出勤',
                        desc : '<use xlink:href="#icon-nan"></use>'
                    },
		    {
                        value: "#icon-youxiangmimagenggai" ,
                        label: '日历',
                        desc :'<use xlink:href="#icon-youxiangmimagenggai"></use>'
                    },
		    {
                        value: "#icon-nv" ,
                        label: '附件',
                        desc :'<use xlink:href="#icon-nv"></use>'
                    },
		    {
                        value: "#icon-wupinshenqing" ,
                        label: '角色、群体',
                        desc :'<use xlink:href="#icon-wupinshenqing"></use>'
                    },
		    {
                        value: "#icon-ITquanxian" ,
                        label: '闪光灯',
                        desc :  '<use xlink:href="#icon-ITquanxian"></use>'
                    },
		    {
                        value: "#icon-kaoqinyichang" ,
                        label: '用户',
                        desc : '<use xlink:href="#icon-kaoqinyichang"></use>'
                    },
		    {
                        value: "#icon-daibanshixiang" ,
                        label: '店铺',
                        desc : '<use xlink:href="#icon-daibanshixiang"></use>'
                    },

                 {
                        value: "#icon-yunshuzhongwuliu" ,
                        label: '运输中、物流',
                        desc : '<use xlink:href="#icon-yunshuzhongwuliu"></use>'
                    },
                    {
                        value: "#icon-peizaizhuangche" ,
                        label: '配载、装车',
                        desc : '<use xlink:href="#icon-peizaizhuangche"></use>'
                    },
                    {
                        value: "#icon-anquanbaozhang" ,
                        label: '安全、保障',
                        desc : '<use xlink:href="#icon-anquanbaozhang"></use>'
                    },
                     {
                        value: "#icon-qianshoushenpitongguo-xianxing" ,
                        label: '签收、审批',
                        desc : '<use xlink:href="#icon-qianshoushenpitongguo-xianxing"></use>'
                    },
                    {
                        value: "#icon-kucun-xianxing" ,
                        label: '库存',
                        desc : '<use xlink:href="#icon-kucun-xianxing"></use>'
                    },
                     {
                        value: "#icon-baoguofahuo-xianxing" ,
                        label: '包裹、发货',
                        desc : '<use xlink:href="#icon-baoguofahuo-xianxing"></use>'
                    },
                    {
                        value: "#icon-jixiaopinggu" ,
                        label: '组织架构、接口',
                        desc : '<use xlink:href="#icon-jixiaopinggu"></use>'
                    },
                     {
                        value: "#icon-lizhijiaojie" ,
                        label: '资料、手册',
                        desc : '<use xlink:href="#icon-lizhijiaojie"></use>'
                    },
                    {
                        value: "#icon-zhangdan" ,
                        label: '账单',
                        desc : '<use xlink:href="#icon-zhangdan"></use>'
                    },
                      {
                        value: "#icon-yewu" ,
                        label: '业务',
                        desc : '<use xlink:href="#icon-yewu"></use>'
                    },
                    {
                        value: "#icon-hezuoguanxi" ,
                        label: '合作、关系',
                        desc : '<use xlink:href="#icon-hezuoguanxi"></use>'
                    },
                     {
                        value: "#icon-xinwendongtai" ,
                        label: '国际',
                        desc : '<use xlink:href="#icon-xinwendongtai"></use>'
                    },
                     {
                        value: "#icon-daikuan-xianxing" ,
                        label: '贷款',
                        desc : '<use xlink:href="#icon-daikuan-xianxing"></use>'
                    },
                     {
                        value: "#icon-gongpai" ,
                        label: '寄件',
                        desc : '<use xlink:href="#icon-gongpai"></use>'
                    },
                     {
                        value: "#icon-huiyijilu" ,
                        label: '还款',
                        desc : '<use xlink:href="#icon-huiyijilu"></use>'
                    },
                     {
                        value: "#icon-jisuanqilishuai-xianxing" ,
                        label: '计算器、利率',
                        desc : '<use xlink:href="#icon-jisuanqilishuai-xianxing"></use>'
                    },
                     {
                        value: "#icon-lingdang" ,
                        label: '铃铛',
                        desc : '<use xlink:href="#icon-lingdang"></use>'
                    },
                ]
            }
        },
        methods: {
            valueChange() {
                var obj = this;

                this.$emit('value', obj.formValidate.name);
            },
	       valueChange1(item) {
                var obj = this;
                obj.formValidate.icon=item.label
		        this.$emit('icon', item.value);
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

<style lang="less">
.ivu-select-dropdown-list svg.icon {
    width: 4em;
    height: 4em;
}
</style>

