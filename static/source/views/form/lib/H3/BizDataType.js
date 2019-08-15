//公用数据,数据类型
jQuery.extend({
    BizDataType: {
        /// 空值
        Unspecified: -1,
        /// 逻辑数组型
        BoolArray: 0,
        /// 逻辑型
        Bool: 1,
        /// 时间数组型
        DateTimeArray: 4,
        /// 日期型
        DateTime: 5,
        /// 双精度数组型
        DoubleArray: 6,
        /// 双精度数值型
        Double: 7,
        /// 整数数组型
        IntArray: 8,
        /// 整数
        Int: 9,
        /// 长整型数组型
        LongArray: 10,
        /// 长整数
        Long: 11,
        /// 字符串数组型
        StringArray: 12,
        /// 长文本
        String: 13,
        /// 短文本
        ShortString: 14,
        /// 签名
        // Sign : 15,
        /// 链接
        HyperLink: 16,
        /// 审批
        Comment: 17,
        /// 二进制流
        ByteArray: 20,
        ///图片类型
        Image: 23,
        /// 未指定类型的附件
        Attachment: 24,
        /// 时间段型
        TimeSpan: 25,
        /// 参与者（单人）
        SingleParticipant: 26,
        /// 参与者（多人）
        MultiParticipant: 27,
        /// Html
        Html: 30,
        /// 对象类型
        Object: 31,
        /// Xml
        Xml: 32,
        /// Guid  
        Guid: 33,
        /// Guid数组
        GuidArray: 34,
        /// Decimal
        Decimal: 35,
        /// Decimal数组
        DecimalArray: 36,
        /// 业务对象
        BizObject: 40,
        /// 业务对象数组
        BizObjectArray: 41,
        /// 业务结构
        BizStructure: 42,
        /// 业务结构数组
        BizStructureArray: 43,
        // 审批记录
        FormApprovalRecord: 48,
        // 代码内嵌
        FormEmbedCode: 49,
        /// 关联查询
        Association: 50,
        //关联查询多表单
        AssociationArray: 51,
        AssociationProperty:52,
        AssociationList: 53,
        //城市选择
        City: 54,
        ///地图
        Map: 55,
        //地址
        Address: 56,
        //公式型控件
        Formula:57,
         //文档库控件
        Folder:58,

        ApiTextArea:100,

        ApiNumber:101,

        ApiDateTime:102,


    }
});


// WEBPACK FOOTER //
// ./src/lib/H3/BizDataType.js