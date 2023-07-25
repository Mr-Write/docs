const moment = require('moment');
const secret = require('./secret')

module.exports = {
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
        clientId: secret.clientId,
        clientSecret: secret.clientSecret,
        // autoCreateIssue 设置为 true，在对应的 Issue 不存在时，Vssue 会自动尝试为你创建 Issue。
        autoCreateIssue: true
    },
    '@vuepress/back-to-top': true
}