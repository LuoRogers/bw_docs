import { defineConfig } from 'vitepress'
import AutoSidebarPlugin from 'vitepress-auto-sidebar-plugin'

export default defineConfig({
  lang: "zh-CN",
  title: "魔都线下ACGN交流群-资讯站",
  description: "这是一个关于ACGN的资讯站",
  srcDir: "./",
  head: [
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
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '展览',
        items: [
          { text: 'BW快速指南', link: '/guide/exhibit/BilibiliWorldBasicInfo' },
          { text: 'ChinaJoy', link: '/guide/exhibit/ChinaJoyBasicInfo' }
        ]
      },
      {
        text: '演唱会',
        items: [
          { text: 'BML快速指南', link: '/guide/concert/BilibiliMacroLinkBasicInfo' },
          { text: 'トゲナシトゲアリ Live in SHANGHAI', link: '/guide/concert/GirlsBandCryInfo' }
        ]
      },
      {
        text: '其它',
        items: [
          { text: '上海未来大型活动一览', link: '/guide/others/OverviewOfShanghaiFutureACGNActivities' },
          { text: '出国带卡指南', link: '/guide/others/card' },
          { text: '评论区', link: '/guide/Comment' },
        ]
      }
    ],

    sidebar: [
      {
        text: '目录',
        items: [
          { text: 'BW & BML快速指南', link: './BilibiliWorldBasicInfo' },
          { text: '上海未来大型活动一览', link: './OverviewOfShanghaiFutureACGNActivities' }
        ]
      }
    ],

    search: { provider: 'local' },

    socialLinks: [
      { icon: 'github', link: 'https://gitlab.com/shacgn/bw_docs' }
    ],

    editLink: {
      pattern: 'https://gitlab.com/shacgn/bw_docs/edit/main/doc/:path'
    },

    footer: {
      message: `本网站采用<a class="link-light" rel="license" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans">
        知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议 (CC BY-NC-ND 4.0)
      </a>`,
      copyright: 'Copyright © 2023-2025 魔都ACGN交流群管理组'
    },

    outlineTitle: '戳这里快速跳转~'
  },

  outDir: '../public',
  lastUpdated: true,

  vite: {
    plugins: [
      AutoSidebarPlugin({
        srcDir: './doc',
        ignoreList: ['index.md'],
      }),

      // ✅ 构建时为 Node SSR 环境补上 DOMMatrix，防止 ReferenceError
      {
        name: 'mock-dommatrix-plugin',
        apply: 'build',
        configResolved() {
          if (typeof globalThis.DOMMatrix === 'undefined') {
            globalThis.DOMMatrix = class {}
          }
        },
      },
    ],

    ssr: {
      // ✅ 防止 pdfjs-dist 被错误外部化
      noExternal: ['pdfjs-dist'],
    },

    // ✅ esbuild 只接受 JSON 或标识符
    define: {
      'globalThis.DOMMatrix': '({})',
    },
  },
})