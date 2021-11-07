const menuList = [
    {
        title: '首页',
        key: '/home',
    },
    {
        title: 'http_CRUD',
        key: '/http_user'
    },
    {
        title: 'GraphQL_CRUD',
        key: '/GraphQL_CRUD'
    },
    {
        title: '虚拟dom',
        key: '/virtualDom'
    },

    {
        title: '可视化排序',
        key: '/charts',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar'
            },
        ],
    },

    {
        title: '组件拖拽',
        key: '/drag',
        children: [
            {
                title: '元素拖拽',
                key: '/drag/native'
            },
            {
                title: 'Rxjs拖拽',
                key: '/drag/rxjs'
            },
            {
                title: '自定义组件',
                key: '/drag/form-design'
            },
        ],
    },
    {
        title: 'Hooks',
        key: '/hooks'
    },
    {
        title: '文件相关',
        key: '/aboutFile'
    },
    {
        title: 'webSocket',
        key: '/webSocket'
    },
    {
        title: 'prisma',
        key: '/prisma'
    }
];

export default menuList;
