import { radixConvert } from "@/utils/radixConvert";
import { useState } from "react";
import { useEffect } from "react";

export default function Page() {

    const [result, setResult] = useState({ valid: null, value: [] });

    useEffect(() => {
        radixConvert('-2.5', '8.7', 6)
            .then(value => {
                console.log(value);
                setResult(value);
            })
    }, [])

    return <>
        <p>{result.valid ? 'true' : 'false'}</p>
        <p>{result.value}</p>
    </>
}