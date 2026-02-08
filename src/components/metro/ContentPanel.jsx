import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Metro.module.scss';
import { StationType } from './StationNode';

const ContentPanel = ({
    station,
    isLastStation,
    onNext,
    onNavigate
}) => {
    const { title, description, link } = station;

    return (
        <div className={styles.contentPanel}>
            <div className={styles.panelHeader}>
                <h2 className={styles.panelTitle}>{title}</h2>
                <p className={styles.panelDesc}>{description}</p>

                {/* Learning Objectives or Tags could go here */}
                <div className={styles.learningObjective}>
                    <h4 className={styles.loTitle}>本站重點</h4>
                    <p className={styles.loText}>
                        本章節將帶領您深入了解 {title} 的核心概念與實作技巧。
                    </p>
                </div>
            </div>

            <div className={styles.panelBody}>
                <div className={styles.panelProse}>
                    <p>
                        點擊右下角的按鈕進入課程，或選擇左側的其他站點進行跳轉。
                        {station.type === StationType.INTERCHANGE && (
                            <span> 此站點為轉乘站，點擊左側轉乘站可切換至其他路線。</span>
                        )}
                    </p>
                    {/* More content placeholders */}
                </div>
            </div>

            <div className={styles.panelFooter}>
                <button
                    onClick={() => link ? onNavigate(link) : onNext()} // Use onNavigate if link exists
                    className={styles.nextBtn}
                >
                    {link ? '進入課程' : (isLastStation ? '完成路線' : '下一站')}
                    <ArrowRight size={18} className={styles.iconMl} />
                </button>
            </div>
        </div>
    );
};

export default ContentPanel;
