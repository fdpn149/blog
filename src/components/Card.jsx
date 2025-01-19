import './Card.css'

function Card({handleClick, imgSrc, title}) {
    return (
        <>
            <div className="card" onClick={handleClick}>
                <img src={imgSrc} />
                <p>{title}</p>
            </div>
        </>
    );
}

export default Card;