import{j as i,H as s}from"./index-ChdZ4smo.js";import{s as d}from"./Blog.module-ug9AUbdn.js";import{F as l}from"./Footer-CXq5Lmu7.js";import{u as a}from"./useTheme-BBH3oOaI.js";import{h as e,t as r,a as t}from"./tomorrow-D4iv0TmF.js";import"./toConsumableArray-Cg7-Q_9P.js";function p(){const n=a();return i.jsxs(i.Fragment,{children:[i.jsx(s,{}),i.jsxs("main",{className:d.main,children:[i.jsx("h2",{children:"前置作業"}),i.jsxs("section",{children:[i.jsx("h3",{children:"建立專案"}),i.jsxs("ul",{children:[i.jsx("li",{children:"在建立專案的視窗中，選擇「No Activity」"}),i.jsx("li",{children:"名稱、package名、儲存路徑可自行定義，其它照預設即可"})]}),i.jsx("h3",{children:"基本設定"}),i.jsx("h3",{children:"AndroidManifest.xml"}),i.jsxs("ul",{children:[i.jsx("li",{children:"在app/manifests底下"}),i.jsxs("li",{children:["新增activity與service",i.jsxs("ul",{children:[i.jsx("li",{children:"先將application尾巴的「/>」改成「>」並且換行之後添加「</application>」"}),i.jsxs("li",{children:["將以下內容夾在application的標籤中",i.jsx("br",{}),i.jsx(e,{language:"xml",style:n==="dark"?r:t,children:`<activity
    android:name=".MainActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>

<service
    android:name="InputMethod"
    android:label="@string/app_name"
    android:permission="android.permission.BIND_INPUT_METHOD"
    android:exported="true">
    <intent-filter>
        <action android:name="android.view.InputMethod" />
    </intent-filter>
    <meta-data
        android:name="android.view.im"
        android:resource="@xml/method" />
</service>`}),i.jsxs("ul",{children:[i.jsx("li",{children:"這裡指定了預設的「activity」(雖然不一定用得到，但不指定會無法執行)"}),i.jsx("li",{children:"這裡還註冊了輸入法的服務，因此可以去手機的設定→語言與鍵盤找到我們做的輸入法並啟用"}),i.jsx("li",{children:"「.MainActivity」、「InputMethod」、「@xml/method」還沒定義，所以會被畫線"})]})]})]})]})]}),i.jsx("h3",{children:"MainActivity.kt"}),i.jsxs("ul",{children:[i.jsx("li",{children:"新增此Kotlin Class於kotlin+java的com.xxx.xxxxxx(package名稱)中"}),i.jsxs("li",{children:["在class的名稱後面繼承android.app的「Activity」",i.jsx(e,{language:"kotlin",style:n==="dark"?r:t,children:"class MainActivity : Activity()"}),i.jsxs("ul",{children:[i.jsx("li",{children:"跳出需要import東西直接給它import下去就可以了"}),i.jsx("li",{children:"class裡面的內容可以自行實作，不過留空也可以"}),i.jsx("li",{children:"主要實作輸入法的部分是InputMethod.kt，不是這裡"})]})]})]}),i.jsx("h3",{children:"method.xml"}),i.jsxs("ul",{children:[i.jsx("li",{children:"在app/res/xml中新增此檔案"}),i.jsxs("li",{children:["填入以下內容",i.jsx(e,{language:"xml",style:n==="dark"?r:t,children:`<?xml version="1.0" encoding="utf-8"?>
<input-method xmlns:android="http://schemas.android.com/apk/res/android">
    <subtype
        android:imeSubtypeLocale="zh_TW"
        android:imeSubtypeMode="keyboard"
        android:isAsciiCapable="true"
        android:label="@string/subtype" />
</input-method>`}),i.jsx("ul",{children:i.jsxs("li",{children:["@string/subtype應該會畫紅色的，",i.jsx("br",{}),"只要右鍵它點「Show Context Actions」並點「Create string value resource 'subtype'」，",i.jsx("br",{}),"接著在「Resource value」中輸入輸入法的「顯示名稱」(不用與先前定義的一樣，可以是中文)，",i.jsx("br",{}),"就可按「OK」結束"]})})]})]}),i.jsx("h3",{children:"InputMethod.kt"}),i.jsxs("ul",{children:[i.jsx("li",{children:"在與MainActivity相同的位置建立一個Kotlin的class"}),i.jsx("li",{children:"名稱不一定要叫InputMethod.kt，只要與AndroidManifest.xml內寫得一樣就可以"}),i.jsx("li",{children:"這個class需繼承android.inputmethodservice的「InputMethodService」"})]}),i.jsx("h3",{children:"結語"}),i.jsxs("ul",{children:[i.jsx("li",{children:"上述過程若順利，完成後利用USB偵錯或無線偵錯，將App安裝到手機，應該就會開啟一個空白的程式(MainActivity)"}),i.jsx("li",{children:"到手機設定中語言與鍵盤底下，在輸入法的地方應該就能找到我們剛建立的輸入法，可以將它打開，不過目前還沒有功能"})]})]})]}),i.jsx(l,{})]})}export{p as default};
