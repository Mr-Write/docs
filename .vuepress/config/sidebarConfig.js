module.exports = {
    '/about/': [
        '',
        'test2',
        'test1'
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
}