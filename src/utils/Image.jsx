import { useEffect } from 'react';
import { useState } from 'react';

export default function Image({ path, style, alt }) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    async function loadImage(pathSplit) {
        try {
            setLoading(true);
            let response;
            const offset = 1;
            switch (pathSplit.length - offset) {
                case 2:
                    response = await import(`@/assets/images/${pathSplit[offset]}/${pathSplit[offset + 1]}.png`);
                    break;

                case 3:
                    response = await import(`@/assets/images/${pathSplit[offset]}/${pathSplit[offset + 1]}/${pathSplit[offset + 2]}.png`);
                    break;

                case 4:
                    response = await import(`@/assets/images/${pathSplit[offset]}/${pathSplit[offset + 1]}/${pathSplit[offset + 2]}/${pathSplit[offset + 3]}.png`);
                    break;

                case 5:
                    response = await import(`@/assets/images/${pathSplit[offset]}/${pathSplit[offset + 1]}/${pathSplit[offset + 2]}/${pathSplit[offset + 3]}/${pathSplit[offset + 4]}.png`);
                    break;

                default:
                    throw ("Image Not Found");
            }
            setImage(response.default);
        }
        catch (error) {
            console.log(error)
            setImage(<></>);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const pathSplit = path.split('/');
        loadImage(pathSplit);
    }, [path])

    return (
        <>
            {loading && <div>載入中...</div>}
            {image && <img src={image} style={style} alt={alt} />}
        </>
    );
};
