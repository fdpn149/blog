import{j as t}from"./index-CKLcwRDI.js";import{I as i}from"./Image-BBG-zu1U.js";import{u as s}from"./useTheme-BufUxuuL.js";import{h as n,t as l,a as r}from"./tomorrow-CHhCJzDP.js";import"./toConsumableArray-Cg7-Q_9P.js";function h(){const e=s();return t.jsx(t.Fragment,{children:t.jsx("div",{children:t.jsxs("section",{children:[t.jsx("h3",{children:"建立元件layout"}),t.jsxs("ul",{children:[t.jsxs("li",{children:["於res/layout中，建立一個layout",t.jsx("br",{}),t.jsx(i,{path:"/tutorials/AndroidApp開發/客製化元件/component_xml.png",alt:"想要元件的layout"}),t.jsx("ul",{children:t.jsx("li",{children:"這裡我取名為component_swipebutton.xml，並且使用FrameLayout(可以用其它種layout)"})})]}),t.jsxs("li",{children:["更改layout的xml",t.jsx("br",{}),t.jsx("p",{children:"從類似這樣"}),t.jsx(n,{language:"xml",style:e==="dark"?l:r,children:`<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">`}),t.jsx("p",{children:"改為這種型式"}),t.jsx(n,{language:"xml",style:e==="dark"?l:r,children:`<?xml version="1.0" encoding="utf-8"?>
<merge xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    tools:parentTag="android.widget.FrameLayout"
    android:layout_width="match_parent"
    android:layout_height="match_parent">`}),t.jsxs("ul",{children:[t.jsx("li",{children:"使用merge才不會讓元件之後在使用的時候多一個階層"}),t.jsx("li",{children:'將原本使用的layout種類放到tools:parentTag=的""裡面'})]})]})]}),t.jsx("h3",{children:"attr.xml"}),t.jsxs("ul",{children:[t.jsxs("li",{children:["在res/values中",t.jsx("ul",{children:t.jsx("li",{children:"若沒有需自行建立"})})]}),t.jsxs("li",{children:[t.jsx(n,{language:"xml",style:e==="dark"?l:r,children:`<?xml version="1.0" encoding="utf-8"?>
<resources>
    <declare-styleable name="SwipeButton">
        <attr name="centerText" format="string" />
        <attr name="startText" format="string" />
        <attr name="topText" format="string" />
        <attr name="endText" format="string" />
        <attr name="bottomText" format="string" />
    </declare-styleable>
</resources>`}),t.jsxs("ul",{children:[t.jsx("li",{children:"<declare-styleable name= 接待會建立的class(kt)之名稱"}),t.jsx("li",{children:"<attr name= 定義這個客製化元件要有什麼屬性 format= 它是什麼格式"})]})]})]}),t.jsx("h3",{children:"建立對應的kt"}),t.jsx(i,{path:"/tutorials/AndroidApp開發/客製化元件/kt.png",alt:"SwipeButton.kt"}),t.jsxs("ul",{children:[t.jsxs("li",{children:["名稱任意",t.jsx("ul",{children:t.jsx("li",{children:"這裡我取名為SwipeButton.kt"})})]}),t.jsxs("li",{children:["繼承使用的layout種類",t.jsx("ul",{children:t.jsx("li",{children:"這裡會要求加入constructor，四種分別對應不同的情況，目前只需要用(Context, AttributeSet?) ，因此選擇它"})})]}),t.jsxs("li",{children:["實作constructor",t.jsx("ul",{children:t.jsxs("li",{children:[t.jsx(n,{language:"kotlin",style:e==="dark"?l:r,children:`init {
   val typedArray =
      context.obtainStyledAttributes(attrs, R.styleable.SwipeButton, 0, 0)
   inflate(context, R.layout.component_swipebutton, this)
   (getChildAt(0) as MaterialButton).text = typedArray.getString(R.styleable.SwipeButton_centerText) ?: "center"
   (getChildAt(1) as TextView).text = typedArray.getString(R.styleable.SwipeButton_startText) ?: "start"
   (getChildAt(2) as TextView).text = typedArray.getString(R.styleable.SwipeButton_topText) ?: "top"
   (getChildAt(3) as TextView).text = typedArray.getString(R.styleable.SwipeButton_endText) ?: "end"
   (getChildAt(4) as TextView).text = typedArray.getString(R.styleable.SwipeButton_bottomText) ?: "bottom"
}`}),t.jsxs("ul",{children:[t.jsxs("li",{children:["context.obtainStyledAttributes(attrs,R.styleable.SwipeButton,0,0)",t.jsx("ul",{children:t.jsx("li",{children:"從attr.xml中取得有哪些屬性"})})]}),t.jsxs("li",{children:["inflate(context, R.layout.component_swipebutton, this)",t.jsx("ul",{children:t.jsx("li",{children:"設定這個class對應哪一個layout的xml"})})]}),t.jsxs("li",{children:["接下來設定顯示的值",t.jsxs("ul",{children:[t.jsx("li",{children:"getChildAt會從layout的xml找第幾個小孩"}),t.jsx("li",{children:"typedArray.getString(R.styleable. 會從實際使用此客製化元件的地方指定的字串值當作顯示的值，若沒指定，則使用?: 後面的預設值"})]})]})]})]})})]})]})]})})})}export{h as default};
