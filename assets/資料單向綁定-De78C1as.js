import{j as n}from"./index-CP_n1Gl5.js";import{u as s}from"./useTheme-BktufICY.js";import{h as e,t as l,a}from"./tomorrow-Dn7fntJZ.js";import"./toConsumableArray-Cg7-Q_9P.js";function c(){const i=s();return n.jsx(n.Fragment,{children:n.jsx("div",{children:n.jsxs("section",{children:[n.jsx("h3",{children:"開啟功能"}),n.jsx("ul",{children:n.jsxs("li",{children:["需在build.gradle.kts (Module :app)中加入",n.jsx("br",{}),n.jsx(e,{language:"kotlin",style:i==="dark"?l:a,children:`buildFeatures {
    compose = true
    dataBinding = true
}`})]})}),n.jsx("h3",{children:"建立要綁定的變數"}),n.jsx("ul",{children:n.jsxs("li",{children:["建立一個Kotlin Class",n.jsx(e,{language:"kotlin",style:i==="dark"?l:a,children:`class BindingVars(vararg closeables: Closeable?) : ViewModel(*closeables) {
    val variable = ObservableField<Float>(20.0f)

    fun setValue(value: Float) {
        variable.set(value)
    }
}`}),n.jsxs("ul",{children:[n.jsx("li",{children:"可指定初始值(20.0f)"}),n.jsx("li",{children:"需給一個設定值的function(setValue)，才可以對值做更改"})]})]})}),n.jsx("h3",{children:"於layout中使用變數"}),n.jsxs("ul",{children:[n.jsx("li",{children:"透過「Convert to data binding layout」將普通layout轉成data binding的layout"}),n.jsxs("li",{children:["加入上面定義的class，名稱不一定要相同",n.jsx(e,{language:"xml",style:i==="dark"?l:a,children:`<data>
    <variable
        name="bindVars"
        type="com.example.testime.BindingVars" />
</data>`}),n.jsx("ul",{children:n.jsx("li",{children:'之後可以以 "@{bindVars.variable}" 直接取得綁定變數 variable 的值'})})]})]}),n.jsx("h3",{children:"修改變數值"}),n.jsx("ul",{children:n.jsxs("li",{children:["程式中可以先建立Binding物件和BindingVars物件，並設定好，就可以修改值",n.jsx(e,{language:"kotlin",style:i==="dark"?l:a,children:`val secondView: FrameLayout = findViewById(R.id.second)
val binding: SecondBinding = DataBindingUtil.bind(secondView)!!
val bindVars = BindVars()
binding.bindVars = bindVars
bindVars.setValue(30.0f)`})]})})]})})})}export{c as default};
