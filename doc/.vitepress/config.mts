import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang:"zh-CN",
  title: "魔都线下ACGN交流群-资讯站",
  description: "这是一个关于ACGN的资讯站",
  head: [
    // ... 其他部分的配置，比如
    
    [
      'script',
      {},
      `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "muobn48itt");
      `,
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: './' },
      // { text: 'Examples', link: './markdown-examples' }
    ],
    // 左侧侧边栏
    sidebar: [
      {
        text: '目录',
        items: [
          { text: 'BW & BML快速指南', link: './BW&BML基本问题解答' },
          { text: '上海未来大型活动一览', link: './上海未来大型活动一览' }
        ]
      }
    ],
    // 搜索
    search: {
      provider: 'local'
    },
    // 链接
    socialLinks: [
      { icon: 'gitlab', link: 'https://gitlab.com/shacgn/bw_docs' }
    ],
    editLink: {
      pattern: 'https://gitlab.com/shacgn/bw_docs/edit/main/docs/:path'
    },
    // 页脚
    footer: {
      message: `本网站采用<a class="link-light" rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans">
        知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议 (CC BY-NC-ND 4.0) </a>`,
      copyright: 'Copyright © 2023-2024 魔都ACGN交流群管理组'
    },
    outlineTitle: '戳这里快速跳转~'
  },
  outDir: '../public',
  // base: '/bw_docs/',
  lastUpdated: true,

})

