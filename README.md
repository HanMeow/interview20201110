## 乙太坊收藏品

# 使用
<details>
<summary><strong>初始化</strong></summary>

```sh
yarn
npm install
npm i
```

</details>

<details>
<summary><strong>第一次運行產生圖片檔</strong></summary>

```sh
yarn gulp m
npm run gulp m
```

</details>

<details>
<summary><strong>本機開發</strong></summary>

```sh
yarn start --port=3000 --path=/ --routerMode=history
或
npm run start -- --port=3000 --path=/ --routerMode=history
```

</details>

<details>
<summary><strong>發布</strong></summary>

```sh
yarn build --path=/ --routerMode=history
或
npm run build -- --path=/ --routerMode=history
```

</details>

<details>
<summary><strong>參數</strong></summary>

|參數|預設值|說明|
|-|-|-|
| **--port** | 3000 | *(可選)* 設定本機開發伺服器的 port。
| **--path** | /hance/ | *(可選)* 設定伺服器的預設路徑，會一併套用到 vue router 的 base。
| **--routerMode** | history | *(可選)* 設定 vue router mode ( hash | history )。

</details>


# Vuex 結構
<details>

|module|action/getter|說明|
|-|-|-|
| *(root)* **/** | -- | 僅紀錄讀取狀態
| | setLoading | **\[action\]** 設定讀取狀態，payload 為 string 則會顯示在讀取圖示下方。
| **images/** | -- | 圖片的讀取及取用，其中參數相依於 `src\plugins\imagesStates.js` 。
| | load | **\[action\]** 讀取指定圖片狀態；傳入 `questions/0` 會讀取 `questions/0` 內所有圖片、傳入 `questions/0/text` 會讀取 `questions/0/text` 這張圖片；回傳 `Promise`，讀取結束時 resolve。
| | /\*\*/\* | **\[getter\]** 傳入 `questions/0` 會讀取 `questions/0` 內所有圖片狀態、傳入 `questions/0/text` 會讀取 `questions/0/text` 這張圖片的狀態。回傳`(Object, Object[])`：`{src: ` \[圖片位址\] `, loaded: ` \[圖片是否已讀取\] `, img: ` \[(已讀取) 的 img 元素\] `}`。
| **storage/** | -- | 網頁端測驗結果暫存(防止非預期跳頁)。
| **analytics/** | -- | Google Analytics 及其他行為追蹤分析。

</details>

## 檔案說明
<details>

|檔案|路徑|內容|
|-|-|-|
| **index.vue** | src\components\citypack\ | 首頁

</details>