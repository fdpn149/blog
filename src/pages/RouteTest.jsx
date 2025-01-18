import { useRef } from 'react';
import './RouteTest.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RouteTest() {
    const line1Ref = useRef(null);
    const [circle2Vis, setCircle2Vis] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const line1 = line1Ref.current;

        function handleAnimationStart() {
            setCircle2Vis(true);
        }

        line1.addEventListener('animationstart', handleAnimationStart);

        return () => {
            line1.removeEventListener('animationstart', handleAnimationStart);
        };
    }, []);

    return (
        <>
            <div className='nav-box'>
                <div className='circle' id='circle-1' onClick={() => { navigate('/1'); }} />
                <svg width="64" height="18" viewBox="0 0 64 18" fill="none" xmlns="http://www.w3.org/2000/svg" className='line' id='line-1' ref={line1Ref}>
                    <line y1="9" x2="64" y2="9" stroke="#FF0000" stroke-width="18" />
                </svg>
                <div className={'circle' + (circle2Vis ? ' emerge' : '')} id='circle-2' />
                <svg width="84" height="48" viewBox="0 0 84 48" fill="none" xmlns="http://www.w3.org/2000/svg" className='line' id='line-2'>
                    <path d="M0 9H31.8197C40.325 9 48.4803 12.3859 54.4845 18.41L77 41" stroke="#FF0000" stroke-width="18" />
                </svg>
                <div className={'circle' + (circle2Vis ? ' emerge' : '')} id='circle-3' />
            </div>
        </>
    );
}

export default RouteTest;