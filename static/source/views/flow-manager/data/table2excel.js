export const table2excelData = [
];

export const excelColumns = [
    {
        type: 'index',
        width: 60,
        align: 'center'
    },
    {
        'title': '任务名称',
        'width': 160,
        'key': 'taskName'
    },
    {
        'title': '业务编码',
        'key': 'code',
         width: 250
    },
    {
        'title': '业务名称',
        'key': 'busName',
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
        'title': '业务状态',
        'key': 'status',
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
        'key': 'startUserName',
         width: 250
    },
    {
        'title': '创建时间',
        'key': 'createTime',
        width: 150
    },
    {
        'title': '办理时间',
        'key': 'dealTime',
        width: 150
    }
];
