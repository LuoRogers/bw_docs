import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bilibili World Docs",
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
    }
  },
  outDir: '../public',
  // base: '/bw_docs/',
  lastUpdated: true,

})

