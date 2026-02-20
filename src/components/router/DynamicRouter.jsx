import NotFound from '@/pages/NotFound';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pages = import.meta.glob('/src/pages/**/*.jsx');

export default function DynamicRouter({ props }) {
    const [loading, setLoading] = useState(false);
    const [Content, setContent] = useState(null);

    let pathname = (props && props.path) ?
        props.path : decodeURIComponent(useLocation().pathname);

    // console.log("Router Path:", pathname);

    function getContent(page) {
        if (!page) return null;
        if (!props || !props.component)
            return page.default;

        if (page[props.component])
            return page[props.component];

        return page.default;
    }

    async function loadContent(path) {
        try {
            setLoading(true);

            // Construct target path matching import.meta.glob keys
            // e.g. /tutorials/Android -> /src/pages/tutorials/Android.jsx
            const targetPath = `/src/pages${path}.jsx`;

            // Also try index.jsx if direct file doesn't exist (optional, but good for /tutorials/Android/index.jsx)
            // But per user's original logic, they only checked file paths constructed from segments. 
            // We stick to exact match first.

            let loadFn = pages[targetPath];



            if (!loadFn) {
                throw new Error("404 Not Found: " + path);
            }

            const page = await loadFn();
            setContent(() => getContent(page));
        }
        catch (error) {
            console.warn(error);
            setContent(() => NotFound);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadContent(pathname);
    }, [pathname]);

    return (
        <>
            {loading && <div>載入中...</div>}
            {Content && <Content />}
        </>
    );
};
