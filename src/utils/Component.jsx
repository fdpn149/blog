import NotFound from '@/pages/NotFound';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

export default function Component({ props }) {
    const [loading, setLoading] = useState(false);
    const [Content, setContent] = useState(null);

    let pathname = (props && props.path) ?
        props.path : decodeURIComponent(useLocation().pathname);

    console.log(pathname);

    function getContent(page) {
        if (!props || !props.component)
            return page.default

        if (page[props.component])
            return page[props.component]

        return page.default
    }

    async function loadContent(path) {
        try {
            setLoading(true);
            let page;
            const offset = 1;
            switch (path.length - offset) {
                case 2:
                    page = await import(`@/pages/${path[offset]}/${path[offset+1]}.jsx`);
                    break;

                case 3:
                    page = await import(`@/pages/${path[offset]}/${path[offset+1]}/${path[offset+2]}.jsx`);
                    break;

                default:
                    throw ("404 Not Found");
            }
            setContent(() => getContent(page));
        }
        catch (error) {
            console.log(error)
            setContent(() => NotFound);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const path = pathname.split('/');
        loadContent(path);
    }, [pathname])

    return (
        <>
            {loading && <div>載入中...</div>}
            {Content && <Content />}
        </>
    );
};
