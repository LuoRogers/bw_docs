import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "魔都线下ACGN交流群-资讯站",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: './' },
      // { text: 'Examples', link: './markdown-examples' }
    ],

    sidebar: [
      {
        text: '目录',
        items: [
          { text: '快速指南', link: './BW&BML基本问题解答' },
          { text: '上海未来大型活动一览', link: './上海未来大型活动一览' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LuoRogers/bw_docs' }
    ],
    editLink: {
      pattern: 'https://github.com/LuoRogers/bw_docs/edit/main/docs/:path'
    },
    footer: {
      message: `本网站采用<a class="link-light" rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
        知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议</a>`,
      copyright: 'Copyright © 2023-2024 魔都ACGN管理组'
    }
  },
  outDir: '../public',
  // base: '/bw_docs/',
  lastUpdated: true,

})

