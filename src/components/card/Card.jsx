import styles from "./Card.module.css"

function Card({ handleClick, imgSrc, title }) {
    return (
        <>
            <div className={styles.card} onClick={handleClick}>
                <img src={imgSrc} />
                <p>{title}</p>
            </div>
        </>
    );
}

export default Card;