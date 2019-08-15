export const table2csvData = [
];

export const csvColumns = [
    {
        'title': '名称',
        'key': 'name',
        'fixed': 'left',
        'width': 200
    },
    {
        'title': '业务',
        'key': 'businessName',
        'width': 157,
        'sortable': true,
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
        'title': '创建时间',
        'key': 'createTime',
        'width': 150,
        'sortable': true
    },
    {
        'title': '是否部署',
        'key': 'status',
        'width': 150,
        'sortable': true
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
                        this.show(params.index)
                    }
                }
            }, '设计流程图'),
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
            }, '查看流程图'),
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
            }, '部署'),
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
            }, '升级版本'),
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
