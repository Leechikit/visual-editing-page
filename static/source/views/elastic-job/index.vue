<template>
  <div id='setlist'>
    <div class="g-left">

     <Menu  @on-select="changeMenu"  active-name="jobstat" :open-names="['job']">
          <Submenu name="global">
              <template slot="title">
                  <Icon type="ios-paper" />
                  全局配置
              </template>
              <MenuItem name="zkreg">注册中心</MenuItem>
              <MenuItem name="datasource">事件追踪数据源</MenuItem>
          </Submenu>
          <Submenu name="job">
              <template slot="title">
                  <Icon type="ios-people" />
                  作业操作
              </template>
              <MenuItem name="jobstat">作业维度</MenuItem>
              <MenuItem name="server">服务器维度</MenuItem>
          </Submenu>
          <!-- <Submenu name="history">
              <template slot="title">
                  <Icon type="ios-book-outline" />
                  作业历史
              </template>
                <MenuItem name="track">历史轨迹</MenuItem>
                <MenuItem name="status">历史状态</MenuItem>         
          </Submenu> -->
      </Menu>
    </div>
    <div class="g-right">
       <div v-if="menuName=='zkreg'">
        
         <Table border :columns="columnsZK" :data="dataZK" size="small" style="margin-top:80px"></Table>
      </div>
       <div v-if="menuName=='datasource'">
         
         <Table border :columns="columnsDB" :data="dataDB" size="small" style="margin-top:80px"></Table>
      </div>

      <div v-if="menuName=='jobstat'">
        
         <div v-show="!showJobDetail">
           <div class="control-bar">
                <div class="control-bar__query query">
                    <Button type="primary" @click="queryLogData">新增作业</Button>
                </div>
                <div class="control-bar__search">
                    <i-input v-model="searchVal" placeholder="搜索作业" style="width:200px;float:right;">
                    <Button slot="append" icon="ios-search" @click="searchLogData"></Button>
                    </i-input>
                </div>
            </div>
             <Table border :columns="columnsJob" :loading="loadingJob" :data="dataJob" size="small"></Table>
        </div>
        <div v-show="showJobDetail">
             
            <div class="job-table">
                <Icon type="arrow-left-c" size='40' @click="backToJob"  style="cursor: pointer;"></Icon>
                <Table :columns="columnsDetailJobs" :data="dataDetailJobs" :loading="loadingDetailjobs" size="small"></Table>
            </div>
            <div class="log-page">
               <Page :total="total" :current="pageNum" show-elevator show-sizer show-total class="log-page-bar" @on-change="handlePageNumChange" @on-page-size-change="handlePageSizeChange"></Page>
            </div>
        </div>
      </div>
       <div v-if="menuName=='server'">     
        <div v-show="!showServerDetail">
            <div class="control-bar">
                <div class="control-bar__search query">
                    <i-input v-model="searchVal" placeholder="搜索作业" style="width:300px;float:right;">
                    <Button slot="append" icon="ios-search" @click="searchLogData"></Button>
                    </i-input>
                </div>
            </div>
            <div class="log-table">
                <Table border :columns="columnsServer" :loading="loadServer" :data="dataServer" size="small"></Table>
            </div>
            <div class="log-page">
            <Page :total="total" :current="pageNum" show-elevator show-sizer show-total class="log-page-bar" @on-change="handlePageNumChange" @on-page-size-change="handlePageSizeChange"></Page>
            </div>
        </div>
        <div v-show="showServerDetail">
            <div class="job-table">
                <Icon type="arrow-left-c" size='40' @click="backToServer"  style="cursor: pointer;"></Icon>
                <Table :columns="columnsStatusJobs" :data="dataServerJobs" :loading="loadJobDetail" size="small"></Table>
            </div>
            <div class="log-page">
              <Page :total="total" :current="pageNum" show-elevator show-sizer show-total class="log-page-bar" @on-change="handlePageNumChange" @on-page-size-change="handlePageSizeChange"></Page>
            </div>
        </div>
      </div>
      <div class="log-container" v-if="menuName=='track'">
        <div class="control-bar">
          <div class="control-bar__query query">
           
            <i-input v-model="searchVal" placeholder="作业名称" style="width:180px;">   
            </i-input>
              <i-input v-model="searchVal" placeholder="服务器IP" style="width:180px;">   
            </i-input>
            <DatePicker type="daterange" placeholder="开始时间" style="width: 180px" @on-change="handleDateChange"></DatePicker>
            <DatePicker type="daterange" placeholder="结束时间" style="width: 180px" @on-change="handleDateChange"></DatePicker>
            <Button type="primary" @click="queryLogData">查询</Button>
          </div>
        </div>
        <div class="log-table">
          <Table :columns="columnsTrack" :data="dataTrack" :loading="loading" size="small"></Table>
        </div>
        <div class="log-page">
          <Page :total="total" :current="pageNum" show-elevator show-sizer show-total class="log-page-bar" @on-change="handlePageNumChange" @on-page-size-change="handlePageSizeChange"></Page>
        </div>
      </div>
     
      <div class="log-container" v-if="menuName=='status'">
        <div class="control-bar">
          <div class="control-bar__query query">
            <Select v-model="type" placeholder="选择日志类型" style="width:100px">
              <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <i-input v-model="searchVal" placeholder="作业名称" style="width:200px">   
            </i-input>
            <DatePicker type="daterange" placeholder="开始时间" style="width: 200px" @on-change="handleDateChange"></DatePicker>
            <DatePicker type="daterange" placeholder="结束时间" style="width: 200px" @on-change="handleDateChange"></DatePicker>
            <Button type="primary" @click="queryLogData">查询</Button>
          </div>
    
        </div>
       <div class="log-table">
            <Table :columns="columnsStatus" :data="dataStatus" :loading="loading" size="small"></Table>
            </div>
            <div class="log-page">
            <Page :total="total" :current="pageNum" show-elevator show-sizer show-total class="log-page-bar" @on-change="handlePageNumChange" @on-page-size-change="handlePageSizeChange"></Page>
        </div>
       
      </div>
    </div>
      <Modal v-model="modifyJobFlag" fullscreen title="修改作业" width='1000' :styles="{top: '20px'}">
         <Form :model="jobParam" :label-width="120">  
            <Row>
                <Col span="12">
                    <FormItem label="作业名称">
                            <Input readonly  v-model="jobParam.jobName"></Input>
                    </FormItem>
                </Col>
                
                <Col span="12">
                        <FormItem label="作业类型">
                            <Input readonly  v-model="jobParam.jobType"></Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="作业实现类">
                <Input readonly  v-model="jobParam.jobClass"></Input>
            </FormItem>
            <Row>
                    <Col span="12">
                        <FormItem label="cron表达式">
                                <Input v-model="jobParam.cron"></Input>
                        </FormItem>
                    </Col>
                    
                    <Col span="6">
                            <FormItem label="作业分片总数">
                                <InputNumber v-model="jobParam.shardingTotalCount"></InputNumber>
                        </FormItem>
                    </Col>
                      <Col span="6">
                        <FormItem label="监听作业端口">
                               <InputNumber v-model="jobParam.monitorPort"></InputNumber>
                        </FormItem>
                    </Col>
            </Row>
            <Row>
                    <Col span="12">
                        <FormItem label="自定义参数">
                                <Input v-model="jobParam.jobParameter"></Input>
                        </FormItem>
                    </Col>
                    
                    <Col span="6">
                            <FormItem label="容忍本机与注册中心的时间误差秒数">
                                <InputNumber v-model="jobParam.maxTimeDiffSeconds"></InputNumber>
                        </FormItem>
                    </Col>
                     <Col span="6">
                            <FormItem label="作业服务器状态修复周期">
                                <InputNumber v-model="jobParam.reconcileIntervalMinutes"></InputNumber>
                        </FormItem>
                    </Col>
           </Row>
             <Row>
                    <Col span="6">
                        <FormItem label="监控作业执行时状态">
                               <Checkbox v-model="jobParam.monitorExecution"></Checkbox>

                        </FormItem>
                    </Col>
                    
                    <Col span="6">
                            <FormItem label="支持错过重执行">
                                <Checkbox v-model="jobParam.misfire"></Checkbox>
                        </FormItem>
                    </Col>
                     <Col span="6">
                        <FormItem label="支持自动失效转移">
                               <Checkbox v-model="jobParam.failover"></Checkbox>

                        </FormItem>
                    </Col>
                    
                    <Col span="6">
                            <FormItem label="是否流式处理数据">
                                <Checkbox v-model="jobParam.streamingProcess"></Checkbox>
                        </FormItem>
                    </Col>
            </Row>
            <FormItem label="分片序列号/参数对照表">
                <Input v-model="jobParam.input"></Input>
            </FormItem>
            <FormItem label="分片策略实现类全路径">
                <Input v-model="jobParam.jobShardingStrategyClass"></Input>
            </FormItem>
            <FormItem label="定制异常处理类全路径">
                <Input v-model="jobParam.jobProperties.job_exception_handler"></Input>
            </FormItem>
            <FormItem label="定制线程池全路径">
                <Input v-model="jobParam.jobProperties.executor_service_handler"></Input>
            </FormItem>
            <FormItem label="作业描述信息">
                <Input v-model="jobParam.shardingItemParameters"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary"  @click="updateJobParam">提交</Button>
                <!-- <Button style="margin-left: 8px">重置</Button> -->
            </FormItem>
        </Form>

         <div slot="footer">
          </div>
    </Modal>



  </div>

</template>

<script>
import HTTP from "@/api/console";



export default {
    name: "elasticJob",

    data() {
        const vm = this;
        return {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            loadingJob:false,
            loadServer:false,
            startDate: undefined,
            endDate: undefined,
            type: 0,
            searchVal: "",
            menuName:"jobstat",
            addZKReg:false,
            modifyJobFlag:false,
            showServerDetail:false,
            currentServer:'',
            zkform: {
                    name: 'dev',
                    namespace:'boot-job',
                    zkAddressList:'',
                    digest:'',
                    activated:false
                },
            jobParam:{
                cron: "",
                description: "",
                failover: false,
                jobClass: "",
                jobName: "",
                jobParameter: "",
                jobProperties:{
                    executor_service_handler: "",
                    job_exception_handler: ""
                } ,
                jobShardingStrategyClass: "",
                jobType: "",
                maxTimeDiffSeconds: -1,
                misfire: false,
                monitorExecution: true,
                monitorPort: -1,
                reconcileIntervalMinutes: 10,
                shardingItemParameters: "",
                shardingTotalCount: 1,
                streamingProcess: false,
            },
            oldJobParam:{},
            ruleValidate: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    zkAddressList: [
                        { required: true, message: 'zk地址不能为空', trigger: 'blur' }
                    ],
                    namespace: [
                        { required: true, message: '命名空间不能为空', trigger: 'blur' }
                    ],
                  
                },
            columnsZK: [
                    {
                        title: '注册中心名称',
                        key: 'name'
                    },
                    {
                        title: '注册中心地址',
                        key: 'zkAddressList'
                    },
                    {
                        title: '命名空间',
                        key: 'namespace'
                    }
             ],
             columnsDB:[
                  {
                        title: '事件追踪数据源名称',
                        key: 'name'
                    },
                    {
                        title: '事件追踪数据源驱动',
                        key: 'driver'
                    },
                    {
                        title: '事件追踪数据源连接地址',
                        key: 'url'
                    },
                     {
                        title: '事件追踪数据源用户名',
                        key: 'username'
                    }
             ],
             columnsDetailJobs:[
                    {
                        title: '分片项',
                        key: 'item'
                    },
                    {
                        title: '服务器IP',
                        key: 'serverIp'
                    },
                    {
                        title: '进程ID',
                        key: 'instanceId'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h,params)=>{
                            return h('Tag',{
                                props:{
                                    color:this.changeSharding(params.row.status).color
                                }
                                
                              },this.changeSharding(params.row.status).name                                                
                            )
                        }
                    },
                    {
                        title: '支持自动失效转移',
                        key: 'failover',
                        render: (h, params) => {
                        return h('div', {},params.row.failover?'是':'否')
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                               
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.status=='RUNNING'||params.row.status=='PENDING'||params.row.status=='SHARDING_FLAG'?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.disableSharding(params.row.item)
                                        }
                                    }
                                }, '失效'),
                                 h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.status=='DISABLED'?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.enableSharding(params.row.item)
                                        }
                                    }
                                }, '生效')
                            ]);
                        }
                    }
             ],
             columnsJob: [
                    {
                        title: '作业名称',
                        key: 'jobName'
                    },
                    {
                        title: '作业分片',
                        key: 'shardingTotalCount'
                    },
                    {
                        title: 'cron表达式',
                        key: 'cron'
                    },
                     {
                        title: '作业描述信息',
                        key: 'description'
                    },
                     {
                        title: '状态',
                        key: 'status',
                        render: (h,params)=>{
                            return h('Tag',{
                                props:{
                                    color:this.changeJobStatus(params.row.status,params.row.instanceCount).color
                                }
                                
                              },this.changeJobStatus(params.row.status,params.row.instanceCount).name                                                
                            )
                        }
                    },
                   {
                        title: '操作',
                        key: 'action',
                        width: 340,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modifyJob(params.row.jobName)
                                        }
                                    }
                                }, '修改'),
                                  h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:(params.row.status=='OK'||params.row.status=='SHARDING_FLAG')&&params.row.instanceCount>0?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.gotoJobDetail(params.row.jobName)
                                        }
                                    }
                                }, '详情'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                         display:params.row.status=='OK'&&params.row.instanceCount>0?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.triggerJob(params.row.jobName)
                                        }
                                    }
                                }, '触发'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                         display:params.row.status=='DISABLED'&&params.row.instanceCount>0?'':'none'
                                    },
                                    on: {
                                        click: () => { 
                                            this.enableJob(params.row.jobName)
                                        }
                                    }
                                }, '生效'),
                                  h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px',
                                         display:params.row.status=='OK'&&params.row.instanceCount>0?'':'none'
                                    },
                                    on: {
                                        click: () => { 
                                            this.disableJob(params.row.jobName)
                                        }
                                    }
                                }, '失效'),
                                 h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.status=='OK'&&params.row.instanceCount>0?'':'none'

                                    },
                                    on: {
                                        click: () => {
                                            this.shutdownJob(params.row.jobName)
                                        }
                                    }
                                }, '终止'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeJob(params.row.jobName)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
             ],
              columnsStatusJobs: [
                    {
                        title: '作业名称',
                        key: 'jobName'
                    },
                    {
                        title: '作业分片',
                        key: 'shardingTotalCount'
                    },
                    {
                        title: 'cron表达式',
                        key: 'cron'
                    },
                     {
                        title: '作业描述信息',
                        key: 'description'
                    },
                     {
                        title: '状态',
                        key: 'status',
                        render: (h,params)=>{
                            return h('Tag',{
                                props:{
                                    color:this.changeJobStatus(params.row.status,params.row.instanceCount).color
                                }
                                
                              },this.changeJobStatus(params.row.status,params.row.instanceCount).name                                                
                            )
                        }
                    },
                   {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                     style: {
                                        marginRight: '5px',
                                         display:params.row.status=='DISABLED'&&params.row.instanceCount>0?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.enableServerJob(params.row.jobName)
                                        }
                                    }
                                }, '生效'),
                                 h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                         display:params.row.status=='OK'&&params.row.instanceCount>0?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.disableServerJob(params.row.jobName)
                                        }
                                    }
                                }, '失效'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.status=='OK'&&params.row.instanceCount>0?'':'none'

                                    },
                                    on: {
                                        click: () => {
                                            this.shutdownServerJob(params.row.jobName)
                                        }
                                    }
                                }, '终止'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeServerJob(params.row.jobName)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
             ],
              columnsServer: [
                    {
                        title: '服务器IP',
                        key: 'serverIp'
                    },
                    {
                        title: '运行实例数',
                        key: 'instancesNum'
                    },
                    {
                        title: '作业总数',
                        key: 'jobsNum'
                    },
                     {
                        title: '禁止作业数',
                        key: 'disabledJobsNum'
                    },
                   {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                 h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.gotoDetail(params.row.serverIp)
                                        }
                                    }
                                }, '详情'),
                                 h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.jobNames.length!=params.row.disabledJobsNum?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.disableServer(params.row.serverIp)
                                        }
                                    }
                                }, '失效'),
                                 h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:params.row.jobNames.length==params.row.disabledJobsNum?'':'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.enableServer(params.row.serverIp)
                                        }
                                    }
                                }, '生效'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.shutdownServer(params.row.serverIp)
                                        }
                                    }
                                }, '终止')
                            ]);
                        }
                    }
             ],

              columnsTrack: [
                    {
                        title: '作业名称',
                        key: 'name'
                    },
                    {
                        title: '服务器IP',
                        key: 'age'
                    },
                    {
                        title: '分片项',
                        key: 'address'
                    },
                     {
                        title: '执行结果',
                        key: 'address'
                    },
                     {
                        title: '失败原因',
                        key: 'address'
                    },
                    {
                        title: '开始时间',
                        key: 'address'
                    },
                    {
                        title: '结束时间',
                        key: 'address'
                    },
             ],
             columnsStatus:[
                   {
                        title: '作业名称',
                        key: 'name'
                    },
                   
                    {
                        title: '分片项',
                        key: 'address'
                    },
                     {
                        title: '状态',
                        key: 'address'
                    },
                     {
                        title: '创建时间',
                        key: 'address'
                    },
                    {
                        title: '备注',
                        key: 'address'
                    },
             ],
            dataJob:[],
            dataServer:[],
            dataStatus:[],
            dataTrack:[],
            dataZK: [],
            dataDB:[],
            dataServerJobs:[],
            dataDetailJobs:[],
            currentJobName:'',
            typeList: [
                { value: 0, label: "所有" },
                { value: "App_Management", label: "应用管理" },
                { value: "Interface_Management", label: "接口管理" },
                { value: "Organ_Management", label: "组织管理" },
                { value: "Report_Management", label: "报表管理" },
                { value: "Company_Management", label: "企业管理" }
            ],
            JOBSTATUS:{
                OK:{name:'运行中',color:'green'}, 
                CRASHED:{name:'已下线',color:'default'},
                DISABLED:{name:'已失效',color:'yellow'},
                SHARDING_FLAG :{name:'分片待调整',color:'#00C0EF'},
            },
            SHARDING:{
                DISABLED:{name:'已失效',color:'red'}, 
                RUNNING:{name:'正在运行',color:'green'},
                PENDING:{name:'等待运行',color:'yellow'},
                SHARDING_FLAG :{name:'分片待调整',color:'#00C0EF'},
            },
            
            modifyJobFlag:false,
            showJobDetail:false,
            loadJobDetail:false,
            loading: false
        };
    },
    mounted(){
       this.loadZK();
      
       this.loadDataSource();
    },
    methods: {

        backToServer(){
            this.showServerDetail=false;
        },
        backToJob(){
            this.showJobDetail=false;
        },

        loadDataSource(){
            this.dataDB=[];
            HTTP.loadActive().then((res)=>{
                if(res.code=='0'){
                    this.dataDB.push(res.datas);
                }
            })
        },
        addZK(){
            this.addZKReg =true;
        },
       
        modifyJob(param){
            this.modifyJobFlag=true;
            HTTP.getJobParam({jobName:param}).then((res)=>{
                if(res){
                    this.jobParam= res;
                }
            })
        },
        loadZK() {
            try {
                this.loading = true;
                const res =  HTTP.getZkList().then((res)=>{
                       if (res.code==0) {
                           if(res.datas){
                                 this.dataZK.push(res.datas);
                                  this.loadJobs();
                           }
                           else{
                                HTTP.addZKList().then((res)=>{
                                    if(res.code==0){
                                        this.dataZK.push(res.datas);
                                         this.loadJobs();
                                    }
                                    else{
                                         this.$Message.error(res.msg);
                                    }
                                })
                           }                    
                        } else {
                            throw new Error(res.msg);
                        }
                });
               
            } catch (error) {
                this.$Message.error(error.message || "数据获取失败");
            } finally {
                this.loading = false;
            }
        },
        changeJobStatus(name,num){
            if(num==0){
                return {name:'已下线',color:'default'}
            }
            else{
                 return this.JOBSTATUS[name];
            }
           
        },
        changeSharding(name){
            return  this.SHARDING[name];
        },
        gotoDetail(name){
            this.showServerDetail =true;
            this.currentServer = name;
            this.getJobs(name)
        },
        gotoJobDetail(name){
            this.showJobDetail =true;
            this.currentJobName = name;
            this.getJobsDetails(name);
        },
      
        handleDateChange(val) {
            if (!val[0]) {
                this.startDate = undefined;
                this.endDate = undefined;
            } else {
                this.startDate = new Date(`${val[0]} 00:00:00`).getTime();
                this.endDate = new Date(`${val[1]} 23:59:59`).getTime();
            }
        },
        changeMenu(name){
          this.menuName = name;
          if(name=='jobstat'){
              this.loadJobs()
          }else if(name=='server'){
              this.serverJobs()
          }else if(name== 'track'){
              this.loadExecution()
          }else if(name=='status'){
              this.loadTraceEvents();
          }
        },
        loadExecution(){
            HTTP.findJobExecutionEvents({page:1}).then((res)=>{
                if(res.code==0){

                }
            })
        },
        loadTraceEvents(){
            HTTP.findJobStatusTraceEvents({page:1}).then((res)=>{
                if(res.code==0){
                   
                }
            })
        },
        loadJobs(){
            this.loadingJob=true;
            HTTP.allJobsBriefInfo().then((res)=>{
                if(res.code==0){
                    this.dataJob=res.datas;
                }
            }).finally(()=>{
             this.loadingJob=false; 
            })
        },
        triggerJob(name){
            HTTP.triggerJob({jobName:name}).then((res)=>{
                if(res.code==0){
                    this.loadJobs();
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },

        shutdownJob(name){
            HTTP.shutdownJob({jobName:name}).then((res)=>{
                if(res.code==0){
                    this.loadJobs();
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },
        disableJob(name){
            HTTP.triggerJob({jobName:name}).then((res)=>{
                if(res.code==0){
                    this.loadJobs();
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },
       enableJob(name){
            HTTP.enableJob({jobName:name}).then((res)=>{
                if(res.code==0){
                    this.loadJobs();
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },
        disableSharding(item){
            HTTP.disableSharding({jobName:this.currentJobName,item:item}).then((res)=>{
                if(res.code==0){
                    this.getJobsDetails(this.currentJobName);
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },

        enableSharding(item){
            HTTP.enableSharding({jobName:this.currentJobName,item:item}).then((res)=>{
                if(res.code==0){
                    this.getJobsDetails(this.currentJobName);
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },

        getJobs(name){
            this.loadServer=true
            HTTP.getJobs({serverIp:name}).then((res)=>{
                if(res){
                    this.dataServerJobs =res;
                }
            }).finally(()=>{
                this.loadServer=false;
            })
        },
        getJobsDetails(name){
            this.loadJobDetail =true;
            HTTP.getShardingInfo({jobName:name}).then((res)=>{
                if(res.code==0){
                    this.dataDetailJobs =res.datas
                }
                else{
                   this.$Message.error('获取失败'); 
                }
            }).finally(()=>{
                this.loadJobDetail =false;
            })
        },
        removeJob(name){

            this.$Modal.confirm({
                    title: '删除任务',
                    content: '<p>确认删除'+name+'？</p>',
                    onOk: () => {
                         HTTP.removeJob({jobName:name}).then((res)=>{
                            if(res.code==0){
                                this.$Message.success('删除成功');
                                this.loadJobs()
                            }
                            else{
                                this.$Message.error('删除失败');
                            }
                        })
                    },
                    onCancel: () => {
                        
                    }
                });


           
        },
        
        disableServer(serverIp){
            HTTP.disableServer(serverIp).then(()=>{
                 if(res.code==0){
                    this.serverJobs();
                    this.$Message.success('操作成功');
                }
                else{
                   this.$Message.error('获取失败'); 
                }
            })
        },
        enableServer(serverIp){
            HTTP.enableServer(serverIp).then(()=>{
                 if(res.code==0){
                    this.serverJobs();
                    this.$Message.success('操作成功');
                }
                else{
                   this.$Message.error('获取失败'); 
                }
            })
        },
        shutdownServer(serverIp){
            HTTP.shutdownServer(serverIp).then(()=>{
                 if(res.code==0){
                    this.serverJobs();
                    this.$Message.success('操作成功');
                }
                else{
                   this.$Message.error('获取失败'); 
                }
            })
        },
        enableServerJob(){
             HTTP.enableServerJob({serverIp:this.currentServer,jobName:name}).then((res)=>{
                if(res.code==0){
                    this.getJobsDetails(this.currentServer);
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },
        disableServerJob(){
             HTTP.disableServerJob({serverIp:this.currentServer,jobName:name}).then((res)=>{
                if(res.code==0){
                    this.getJobsDetails(this.currentServer);
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },
        shutdownServerJob(){
             HTTP.shutdownServerJob({serverIp:this.currentServer,jobName:name}).then((res)=>{
                if(res.code==0){
                    this.getJobsDetails(this.currentServer);
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },
        removeServerJob(){
             HTTP.removeServerJob({serverIp:this.currentServer,jobName:name}).then((res)=>{
                if(res.code==0){
                    this.getJobsDetails(this.currentServer);
                    this.$Message.success('操作成功')
                }
                else{
                    this.$Message.error('操作失败')
                }
            })
        },
        serverJobs(){
            HTTP.getAllServersBriefInfo().then((res)=>{
                if(res){
                    this.dataServer=res
                }
            })
        },
        updateJobParam(){
            HTTP.modifyJobParam(this.jobParam).then((res)=>{
                if(res.code==0){
                    this.jobParam={
                        cron: "",
                        description: "",
                        failover: false,
                        jobClass: "",
                        jobName: "",
                        jobParameter: "",
                        jobProperties:{
                            executor_service_handler: "",
                            job_exception_handler: ""
                        } ,
                        jobShardingStrategyClass: "",
                        jobType: "",
                        maxTimeDiffSeconds: -1,
                        misfire: false,
                        monitorExecution: true,
                        monitorPort: -1,
                        reconcileIntervalMinutes: 10,
                        shardingItemParameters: "",
                        shardingTotalCount: 1,
                        streamingProcess: false,
                    }
                    this.modifyJobFlag=false;
                }
            })
        },
        handlePageNumChange(val) {
            this.pageNum = val;
            this.getLogData();
        },
        handlePageSizeChange(val) {
            this.pageSize = val;
            this.getLogData();
        },
        queryLogData() {
            this.pageNum = 1;
            this.searchVal = "";
            this.getLogData();
        },
        searchLogData() {
            this.pageNum = 1;
            this.getLogData();
        },
        formatDate(timestamp) {
            const date = new Date(timestamp);
            const year = date.getFullYear();
            if (Number.isNaN(year)) return "--";
            const month = `0${date.getMonth() + 1}`.slice(-2);
            const day = `0${date.getDate()}`.slice(-2);
            const hour = `0${date.getHours()}`.slice(-2);
            const minute = `0${date.getMinutes()}`.slice(-2);
            const second = `0${date.getSeconds()}`.slice(-2);
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }
    }
};
</script>

<style lang="less" scoped>
#setlist {

  width: 100%;
  height: 100%;
  background-color: #fff;
  .g-left {
    float: left;
    width: 240px;
    height: 100%;
  }
  .g-right {
    padding-left: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}

.sidebar-item{
    display: block;
    transition: all 0.2s ease-out 0s;
    margin: 0 1px 0 0;
    position: relative;
    border-left: 1px solid #fff;
    outline: none;
    text-decoration: none;
    border-top: 0;
    margin-right: 0;
    background-color: #f9fafb;
}

.log-container {
    padding: 10px 20px 20px;
}

.control-bar {
    display: flex;

    @media screen and (max-width: 720px) {
        flex-direction: column;
    }

    &__search {
        flex: 1;
    }
}

.log-table {
    margin: 10px 0;
}
.job-table {
    margin: 100px 0;
}

.log-page {
    overflow: hidden;
}

.log-page-bar {
    float: right;
}
.query{
   margin-top:20px;
   margin-bottom:20px;
}
</style>
