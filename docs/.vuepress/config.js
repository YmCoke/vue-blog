module.exports = {
    title: "coke的博客",
    description: '专注于写算法的前端工程师',
    themeConfig: {
        sidebar: [
            {
                title: '前言',
                children: ['/']
            },
            {
                title: '排序算法',
                collapsable: false,
                children: [
                    { title: '快速排序', path: '/sort/quick_sort' },
                    { title: '归并排序', path: '/sort/merge_sort' }
                ]
            },
            {
                title: '二分算法',
                children: ['/binary/']
            },
        ],
        sidebarDepth: 2
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