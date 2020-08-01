module.exports = {
    title: "coke的博客",
    description: '专注于写算法的前端工程师',
    base: "/vue-blog/",
    themeConfig: {
        sidebar: [
            {
                title: '前言',
                children: ['/']
            },
            {
                title: '排序算法',
                children: [
                    { title: '快速排序', path: '/sort/quick_sort' },
                    { title: '归并排序', path: '/sort/merge_sort' }
                ]
            },
            {
                title: '二分算法',
                children: ['/binary/']
            },
            {
                title: '高精度运算',
                children: [
                    { title: '介绍', path: '/high-precision/intro' },
                    { title: '高精度加法', path: '/high-precision/sum' },
                    { title: '高精度减法', path: '/high-precision/sub' },
                    { title: '高精度乘法', path: '/high-precision/mul' },
                    { title: '高精度除法', path: '/high-precision/div' }
                ]
            },
            {
                title: '前缀和与差分',
                children: [
                    {title: '前缀和算法', path: '/prefix-sum&difference/prefix-sum'},
                    {title: '差分算法', path: '/prefix-sum&difference/difference'}
                ]
            },
            {
                title: '双指针算法',
                children: ['/two-point/']
            },
            {
                title: '位运算',
                children: [
                    {title: 'lowbit算法', path: '/bit/'}
                ]
            },
            {
                title: '单调栈',
                children: [
                    {title: '算法讲解', path: '/stack/monotonousStack'},
                    {title: '习题讲解', path: '/stack/question'}
                ]
            }
        ],
        sidebarDepth: 0
    },
    plugins: [
        '@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }
    ],
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }],
        //增加manifest.json
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
}