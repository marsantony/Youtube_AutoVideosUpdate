# Youtube_AutoVideosUpdate

YouTube 最新影片指令自動更新 ── 串接 YouTube Data API 取得最新影片，自動更新 StreamElements 聊天室指令。

## 線上使用

**https://marsantony.github.io/Youtube_AutoVideosUpdate/**

## 功能

- **YouTube 最新影片抓取** ── 透過 YouTube Data API v3 取得頻道最新上傳的影片
- **StreamElements 指令更新** ── 自動將影片標題與連結更新到 `!YT` 指令
- **可設定影片數** ── 支援抓取 1~5 部最新影片
- **定時自動更新** ── 每天自動執行一次
- **立即更新** ── 手動觸發一次性更新
- **背景執行** ── 使用 HackTimer 避免瀏覽器分頁閒置時計時器被節流

## 使用方式

1. 前往 [StreamElements](https://streamelements.com/dashboard/account/channels) 取得 JWT 金鑰
2. 前往 [Google Cloud Console](https://console.cloud.google.com/) 取得 YouTube Data API v3 金鑰
3. 輸入 JWT 金鑰與 YouTube 金鑰
4. 設定要抓取的影片個數
5. 選擇「立即更新」或「開始自動更新」

## 技術

- [YouTube Data API v3](https://developers.google.com/youtube/v3) ── 取得最新影片資訊
- [StreamElements API](https://dev.streamelements.com/) ── 聊天室指令管理
- [HackTimer](https://github.com/nickvdp/nickvdp.github.io) ── 避免背景分頁計時器節流
- Bootstrap 5 ── UI 介面
- LocalStorage ── 記住金鑰設定
