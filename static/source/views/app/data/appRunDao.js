export const appRunData = [
];

export const appRunColumns = [
    {
        type: 'index',
        width: 60,
        align: 'center'
    },
    {
        'title': '应用运行名称',
        'key': 'appRunName',
        width: 250
    },
    {
        'title': '应用id',
        'width': 160,
        'key': 'appId'
    },
    {
        'title': '应用名称',
        'width': 160,
        'key': 'appName'
    },
    {
        'title': 'act实例Id',
        'width': 160,
        'key': 'instanceId'
    },
    {
        'title': '模型id',
        width: 250,
        'key': 'modelId'
    },
    {
        'title': '状态',
        width: 150,
        'key': 'status'
    },
    {
        'title': '流程发起人',
        'key': 'startUserId',
        width: 150
    },
    {
        'title': '流程发起时间',
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
        'width': 100,
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
                        this.openLogModal(params)
                        }
                    }
                }, '审查记录')
            ]);
        }
    }
];
