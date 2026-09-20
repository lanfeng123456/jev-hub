<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="zh-CN">
      <head>
        <title>Sitemap · jevtypesafe.online</title>
        <meta charset="UTF-8"/>
        <style>
          body { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; background: #0a0f0a; color: #d7e8d7; margin: 0; padding: 48px 24px; }
          .wrap { max-width: 880px; margin: 0 auto; }
          h1 { font-size: 22px; color: #4ade80; margin: 0 0 6px; }
          p.sub { color: #7d9a7d; font-size: 13px; margin: 0 0 28px; }
          table { width: 100%; border-collapse: collapse; font-size: 14px; }
          th { text-align: left; color: #4ade80; border-bottom: 1px solid #234023; padding: 10px 12px; font-weight: 600; }
          td { border-bottom: 1px solid #162416; padding: 10px 12px; }
          a { color: #86efac; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .muted { color: #7d9a7d; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <h1>Sitemap</h1>
          <p class="sub">jevtypesafe.online · <xsl:value-of select="count(s:urlset/s:url)"/> 个 URL · 供搜索引擎抓取使用</p>
          <table>
            <tr><th>URL</th><th>更新日期</th><th>更新频率</th><th>优先级</th></tr>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                <td class="muted"><xsl:value-of select="s:lastmod"/></td>
                <td class="muted"><xsl:value-of select="s:changefreq"/></td>
                <td class="muted"><xsl:value-of select="s:priority"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
