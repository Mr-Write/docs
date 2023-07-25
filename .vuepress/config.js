// .vuepress/config.js
const headConfig = require('./config/headConfig')
const pluginsConfig = require('./config/pluginsConfig')
const navConfig = require('./config/navConfig')
const sidebarConfig = require('./config/sidebarConfig')

module.exports = {
    // 网站的标题，它将会被用作所有页面标题的前缀，同时，默认主题下，它将显示在导航栏（navbar）上。
    title: '狐狸半面添的客栈',
    // 网站的描述，它将会以 `<meta>` 标签渲染到当前页面的 HTML 中。
    description: '一个人走走停停，一个逐浪者',
    plugins: pluginsConfig,
    // 注入到页面的 <head> 标签中
    head: headConfig,
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
        sidebar: sidebarConfig,

        sidebarDepth: 2,  // 侧边栏标题深度，默认是1，最高是2

        //获取每个文件最后一次 `git` 提交的 UNIX 时间戳(ms)，同时它将以合适的日期格式显示在每一页的底部
        lastUpdated: '更新时间', // string | boolean
        // 导航栏选项
        nav: navConfig,
    },
    // 基础路径
    // base: '/docs/',
    // 显示行号
    markdown: {
        lineNumbers: true
    },
}