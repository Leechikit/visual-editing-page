export const startFlowData = [
];

export const startFlowColumns = [
    {
        type: 'index',
        width: 60,
        align: 'center'
    },
     {
        'title': '申请标题',
        'key': 'title',
         width: 250
    },
    {
        'title': '申请人',
        'width': 160,
        'key': 'userId'
    },
    {
        'title': '申请类型',
        'width': 160,
        'key': 'actKey'
    },
    {
        'title': '申请原因',
        'key': 'reason',
         width: 250
    },{
        'title': '申请数目',
        'key': 'number',
        width: 150,
        filters: [
            {
                label: '大于4000',
                value: 1
            },
            {
                label: '小于4000',
                value: 2
            }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
            if (value === 1) {
                return row.show > 4000;
            } else if (value === 2) {
                return row.show < 4000;
            }
        }
    },
    {
        'title': '流程ID',
        'key': 'instanceId',
        width: 150,
        filters: [
            {
                label: '大于4000',
                value: 1
            },
            {
                label: '小于4000',
                value: 2
            }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
            if (value === 1) {
                return row.show > 4000;
            } else if (value === 2) {
                return row.show < 4000;
            }
        }
    },
    {
        'title': '流程发起人',
        'key': 'startUserId',
         width: 150
    },
     {
        'title': '流程状态',
        'key': 'status',
         width: 150
    },
    {
        'title': '创建时间',
        'key': 'createTime',
        width: 150
    },
    {
        'title': '办理时间',
        'key': 'startTime',
        width: 150
    },
    {
        'title': '审批结果',
        'key': 'actResult',
        width: 150
    },
        {
    'title': '操作',
    'key': 'action',
    'width': 590,
    'align': 'center',
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
                        this.openUploadModal(params.index)
                    }
                }
            }, '提交'),
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
                        this.remove(params.index)
                    }
                }
            }, '审查记录'),
             h('Button', {
                props: {
                    type: 'error',
                    size: 'small'
                },
                on: {
                    click: () => {
                        this.delModal(params.row.id)
                    }
                }
            }, '删除')
        ]);
    }
} 
];
