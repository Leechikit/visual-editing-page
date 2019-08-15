jQuery.extend({
 // 提交后台的数据模型
    Schema: {
        Properties: {},//数据项
        SummarySchema: "",//摘要
        NameSchema: "",//名称
        DescSchema:'',
        RemoveSchema: "",//可删除字段
        EnableDataAcl: true, // 是否启用数据权限
        EnableSeqNo: false,//是否启用流水号
        SeqNoDateFormat: "YYYY",//流水号格式
        //富文本规则
        RTFData:{
            isArticleMode:false,
            articleTitle:"",
            articleAuthor:""
        },
        isOpenBigForm:true,
        formCode:'',
        SeqNoPrefix: "",//流水号前缀
        SeqNoLength: 16,//流水号总长度
        DataAclInheritedFrom: "", // 数据权限的继承自哪个对象
        AssociationMappings: {} // 关联查询的关联配置传到后台进行保存 {propertyName:{sourcePropertyName:targetPropertyName,...},...}
    },

    // 提交后台的表单
    BizSheet: {
        SheetCode: "",
        DisplayName: "",
        //设计时内容
        DesignModeContent: "",
        //运行时内容
        RuntimeContent: "",
        //脚本
        Javascript: "",
        //后台代码
        BehindCode: "",
        //启用动态
        EnableHomePage: false,
        //启用任务提醒
        EnableTask: false,
        //启用表单外链
        EnableExternalForm: false,
        //关联列表
        AssociationCodes: [],
        //操作按钮
        Actions: [],
        //表单提交规则
        SubmitRules: [],
        //业务规则
        BusinessRules:[],
        
    },

    //当前表单中关联控件的表单集合
    BoSchemaCodes: [],

    EngineUsageType: {
        /// <summary>
        /// 生产环境
        /// </summary>
        Product: 0,

        /// <summary>
        /// SaaS开发环境
        /// </summary>
        SaaSDevelopment: 1,

        /// <summary>
        /// 测试环境
        /// </summary>
        Test: 2,

        /// <summary>
        /// 私有应用开发环境
        /// </summary>
        PrivateDevelopment: 3
    },

    AppSourceType: {
        /// <summary>
        /// 自开发的
        /// </summary>
        InHouse: 0,
        /// <summary>
        /// 安装的
        /// </summary>
        Installed: 1
    }
});


// WEBPACK FOOTER //
// ./src/lib/H3/Console/SheetDesigner/SheetReponse.js