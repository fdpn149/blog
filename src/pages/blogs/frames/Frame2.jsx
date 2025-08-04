import Component from "@/utils/Component";

function Frame2() {
    return <details>
        <summary><h3>什麼是十進制</h3></summary>
        <p>不知道大家國小數學課時，有沒有玩過這種由積木和百格板所組成的數學教材</p>
        <img src="https://img.yamol.tw/file/5e9d427f0096c.jpg#s-504,248" />
        <p>這個其實就是十進位非常好的例子</p>
        <p>對於一個〇到一千內的整數，我們可以使用</p>
        <ul>
            <li>0~9個白色積木組合出個位數</li>
            <li>0~9個橘色積木組合出十位數</li>
            <li>0~9個百格板組合出百位數</li>
        </ul>
        <p>舉例來說如以下圖片</p>
        <div className='dualDiv'>
            <img src="https://img.youtube.com/vi/CdZfDwIoiVo/0.jpg" style={{ objectFit: 'cover', objectPosition: 'top', aspectRatio: '1.6' }} />
            <img src="https://img.youtube.com/vi/REifITjP9fI/0.jpg" style={{ objectFit: 'cover', objectPosition: 'top', aspectRatio: '1.6' }} />
        </div>
        <p>我們可以輕易地用這些積木就能組合出0~999的整數，並且立方體的總數就等同實際的數值</p>
        <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <Component props={{ path: "/blogs/Blog1", component: "Frame1" }} />
        </div>
    </details>
}

export default Frame2;