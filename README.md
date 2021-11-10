# 初始化仓库

添加 react, reaact-dom, eslint, ts, 使用 vite

### 需求背景

为了满足自己能够随心所欲找电视剧看，不受正版迫害，所以有了这个项目的想法。

### 相关文档 & 资源

- 需求文档：没有
- 技术文档：vite (https://cn.vitejs.dev/)
- 数据源：
  统一用 xml 接口数据源

  - 百度资源 JSON XML
    - https://api.apibdzy.com/api.php/provide/vod
    - https://api.apibdzy.com/api.php/provide/vod/at/xml
  - 百度资源 1 XML
    - https://api.apibdzy.com/api.php/Seacms/vod
  - 快播云 JSON XML
    - http://www.kuaibozy.com/api.php/provide/vod
    - http://www.kuaibozy.com/api.php/provide/vod/at/xml
  - 天空云 JSON XML
    - https://api.tiankongapi.com/api.php/provide/vod
    - https://api.tiankongapi.com/api.php/provide/vod/at/xml
  - 人人资源 JSON XML
    - https://www.rrzyw.cc/api.php/provide/vod
    - https://www.rrzyw.cc/api.php/provide/vod/at/xml
  - 穿梭资源 JSON XML
    - http://ok.888hyk.com/api.php/provide/vod
    - http://ok.888hyk.com/api.php/provide/vod/at/xml
  - 8090 资源网 XML

    - http://zy.yilans.net:8090/api.php/provide/vod/at/xml

  <!-- - 365 影视 XML (会跳转新页面打开)
    - http://video.365tx.com/api.php/provide/vod/at/xml -->

- 设计稿：没有，全靠脑补，啊哈哈哈哈哈

### 需求分析

- 能够根据数据源找到电视剧，电影等
- 依据数据源的不同，分为直接播放，跳转解析播放，跳转只正版网站
- 能够满足提出的各个需求

### 设计方案

#### 整体方案

- 项目搭建：
  使用 vite 作为开发与打包工具，整体项目使用 react + ts + antd，数据管理使用 redux, redux-toolkit, redux-observable, 为了满足本地持久化存储，使用 redux-persist 进行存储。
- 部署方案：
  有了服务器再说，哈哈哈哈。

#### 页面设计

- 页面描述
  - 首页：网站的入口，整体参考其他成熟视频网站的设计样式(毕竟我只是一个小切图仔，哪里会设计)，顶部固定在页面最上方，提供能换源，并且还能让用户自己输入源，中间是各个视频的介绍。
