import styles from "./Card.module.scss"

function Card({ handleClick, imgSrc, title, description }) {
    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.imageWrapper}>
                <img src={imgSrc} alt={title} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                {description && <p className={styles.description}>{description}</p>}
            </div>
        </div>
    );
}

export default Card;