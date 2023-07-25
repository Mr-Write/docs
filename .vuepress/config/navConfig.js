module.exports = [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about/' },
    { text: 'foo', link: '/foo/' },
    { text: 'External', link: 'https://google.com' },
    // 下拉框
    {
        text: '喜欢的人啊',
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
]