// .vuepress/config.js
const moment = require('moment');

module.exports = {
    // 网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。
    title: '狐狸半面添的客栈',
    // 网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中。
    description: '一个人走走停停，一个逐浪者',
    plugins: {

        '@vuepress/last-updated': {
            transformer: (timestamp) => {
                // 不要忘了安装 moment （npm add moment）
                moment.locale("zh-cn")
                // 当前格式：2023/07/22 凌晨 12:44
                return moment(timestamp).format('YYYY/MM/DD A h:mm')
            }
        },
        '@vssue/vuepress-plugin-vssue': {
            // 设置 `platform` 而不是 `api`
            platform: 'github-v4',

            // 其他的 Vssue 配置
            owner: 'Mr-Write',
            repo: 'docs',
            clientId: 'd5ea0f359f27260b88c1',
            clientSecret: '36f54b709ca39c53010aa7fc467f0a3e1748fe84',
            // autoCreateIssue 设置为 true，在对应的 Issue 不存在时，Vssue 会自动尝试为你创建 Issue。
            autoCreateIssue: true
        }
    },
    // 注入到页面的 <head> 标签中
    head: [
        // 指定图标
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['meta', { name: 'keywords', content: '是谢添啊,逐浪者,唐雨浪,博客' }],
        ['meta', { name: 'author', content: '狐狸半面添' }],
    ],
    themeConfig: {
        // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
        nextLinks: true,
        // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
        prevLinks: true,
        // 显示所有页面的标题链接
        // displayAllHeaders: true,
        // 导航栏 logo，显示在左上角位置
        logo: '/assets/img/hero.png',
        // 自动生成一个仅仅包含了当前页面标题（headers）链接的侧边栏
        // sidebar: 'auto',

        // 生成针对于不同页面的侧边栏
        sidebar: {
            '/about/': [
                '',
                'test1',
                'test2'
            ],
            '/foo/': [
                '',
                'one',
                'two'
            ],

            // fallback
            // 确保 fallback 侧边栏被最后定义。VuePress 会按顺序遍历侧边栏配置来寻找匹配的配置。
            '/': [
                ''
            ]
        },

        sidebarDepth: 2,  // 侧边栏标题深度，默认是1，最高是2

        //获取每个文件最后一次 `git` 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
        lastUpdated: '更新时间', // string | boolean
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                ariaLabel: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                algolia: {},
                // 导航栏选项
                nav: [
                    { text: 'Home', link: '/' },
                    { text: 'About', link: '/about/' },
                    { text: 'foo', link: '/foo/' },
                    { text: 'External', link: 'https://google.com' },
                    // 下拉框
                    {
                        text: '喜欢的人',
                        // ariaLabel: 'Language Menu',
                        items: [
                            { text: '唐雨浪', link: '/About/' },
                            { text: '夜莺', link: '/fox/' },
                            // 下拉框中还可以设置分组
                            {
                                text: '浪浪', items: [
                                    { text: '小浪浪', link: '/About' },
                                    { text: '浪小浪', link: '/About' }
                                ]
                            }
                        ]
                    }
                ],
                // sidebar: [
                //     '/',
                //     '/page-a',
                //     ['/page-b', 'Explicit link text']
                // ]
            },
            '/zh/': {
                // 多语言下拉菜单的标题
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },
                // 当前 locale 的 algolia docsearch 选项
                algolia: {},
                nav: [
                    { text: '嵌套', link: '/zh/nested/' }
                ],
                sidebar: {
                    '/zh/': [/* ... */],
                    '/zh/nested/': [/* ... */]
                }
            }
        }
    },
    // 基础路径
    // base: '/docs/',
    // 显示行号
    markdown: {
        lineNumbers: true
    },
    // locales: {
    //     // 键名是该语言所属的子路径
    //     // 作为特例，默认语言可以使用 '/' 作为其路径。
    //     '/': {
    //         lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
    //         // title: '英文模式',
    //         description: '欢迎你的到来'
    //     },
    //     '/zh/': {
    //         lang: 'zh-CN',
    //         // title: '简体中文模式',
    //         description: 'Vue 驱动的静态网站生成器'
    //     }
    // },
    sidebar: {
        '/about/': [
            '',     /* /foo/ */
            'one',  /* /foo/one.html */
            'two'   /* /foo/two.html */
        ],

        '/bar/': [
            '',      /* /bar/ */
            'three', /* /bar/three.html */
            'four'   /* /bar/four.html */
        ],

        // fallback
        '/': [
            '',        /* / */
            'contact', /* /contact.html */
            'about'    /* /about.html */
        ]
    },

}