import { useEffect, useState } from 'react';

const images = import.meta.glob('/src/assets/images/**/*');

export default function Image({ path, style, alt }) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    async function loadImage(imagePathProp) {
        try {
            setLoading(true);
            // Check if exact match exists (user must supply extension)
            let loadFn = null;
            const exactPath = `/src/assets/images${imagePathProp}`;
            if (images[exactPath]) {
                loadFn = images[exactPath];
            }

            if (!loadFn) {
                throw new Error("Image Not Found: " + imagePathProp);
            }

            const mod = await loadFn();
            setImage(mod.default);
        }
        catch (error) {
            console.warn(error);
            setImage(null);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (path) {
            loadImage(path);
        }
    }, [path]);

    return (
        <>
            {loading && <div>載入中...</div>}
            {image && <img src={image} style={style} alt={alt} />}
        </>
    );
};
