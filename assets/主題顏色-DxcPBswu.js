import{j as e}from"./index-CP_n1Gl5.js";import{u as t}from"./useTheme-BktufICY.js";import{h as n,t as l,a as o}from"./tomorrow-Dn7fntJZ.js";import"./toConsumableArray-Cg7-Q_9P.js";function s(){const r=t();return e.jsx(e.Fragment,{children:e.jsx("div",{children:e.jsxs("section",{children:[e.jsx("h3",{children:"color.xml"}),e.jsxs("ul",{children:[e.jsx("li",{children:"用來指定各種色彩名稱具體的顏色"}),e.jsx("li",{children:"於res/values中"}),e.jsx("li",{children:e.jsx(n,{language:"xml",style:r==="dark"?l:o,children:`<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="black">#FF000000</color>
    <color name="white">#FFFFFFFF</color>
    <color name="green">#1B5E20</color>
    <color name="green_dark">#003300</color>
    <color name="green_light">#A5D6A7</color>
    <color name="blue">#0288D1</color>
    <color name="blue_dark">#005B9F</color>
    <color name="blue_light">#81D4FA</color>
</resources>`})})]}),e.jsx("h3",{children:"style.xml"}),e.jsxs("ul",{children:[e.jsx("li",{children:"指定元件的顏色"}),e.jsx("li",{children:"於res/values中"}),e.jsx("li",{children:e.jsx(n,{language:"xml",style:r==="dark"?l:o,children:`<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="LightTextViewStyle">
        <item name="android:textColor">@color/black</item>
    </style>

    <style name="DarkTextViewStyle">
        <item name="android:textColor">@color/white</item>
    </style>

    <style name="ButtonStyle" parent="ShapeAppearanceOverlay.Material3.Button">
        <item name="android:backgroundTint">?attr/colorPrimary</item>
        <item name="android:textColor">?attr/colorOnPrimary</item>
    </style>
</resources>
`})})]}),e.jsx("h3",{children:"themes.xml"}),e.jsxs("ul",{children:[e.jsx("li",{children:"指定主要色、次要色等"}),e.jsx("li",{children:"在res/values中指定預設主題，res/values-night中指定夜間主題"}),e.jsx("li",{children:'用"?attr/"可以得到對應標籤的顏色'}),e.jsx("li",{children:e.jsx(n,{language:"xml",style:r==="dark"?l:o,children:`<resources xmlns:tools="http://schemas.android.com/tools">
    <style name="AppTheme" parent="Theme.Material3.DayNight">
        <item name="colorPrimary">@color/green</item>
        <item name="colorPrimaryVariant">@color/green_dark</item>
        <item name="colorOnPrimary">@color/white</item>
        <item name="colorSecondary">@color/blue</item>
        <item name="colorSecondaryVariant">@color/blue_dark</item>
        <item name="colorOnSecondary">@color/black</item>

		<item name="android:textViewStyle">@style/LightTextViewStyle</item>
        <item name="android:buttonStyle">@style/ButtonStyle</item>
    </style>
</resources>`})}),e.jsx("li",{children:e.jsx(n,{language:"xml",style:r==="dark"?l:o,children:`<resources xmlns:tools="http://schemas.android.com/tools">
    <style name="AppTheme" parent="Theme.Material3.DayNight">
        <item name="colorPrimary">@color/green_light</item>
        <item name="colorPrimaryVariant">@color/green</item>
        <item name="colorOnPrimary">@color/black</item>
        <item name="colorSecondary">@color/blue_light</item>
        <item name="colorSecondaryVariant">@color/blue_light</item>
        <item name="colorOnSecondary">@color/black</item>

        <item name="android:textViewStyle">@style/DarkTextViewStyle</item>
        <item name="android:buttonStyle">@style/ButtonStyle</item>
    </style>
</resources>
`})}),e.jsxs("li",{children:["個別指定按鈕顏色",e.jsx("br",{}),e.jsx(n,{language:"xml",style:r==="dark"?l:o,children:`<Button
    android:backgroundTint= "?attr/colorPrimary"
    android:textColor="?attr/colorOnPrimary" />`})]})]})]})})})}export{s as default};
