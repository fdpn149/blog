import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Metro.module.scss';
import { StationType } from './StationNode';
import { DynamicRouter } from '@/components';

const ContentPanel = ({
    station,
    isLastStation,
    onNext,
    onNavigate
}) => {
    const { title, description, link } = station;

    return (
        <div className={styles.contentPanel}>
            <div className={styles.panelBody}>
                <h2 className={styles.panelTitle}>{title}</h2>
                <p className={styles.panelDesc}>{description}</p>

                {/* Learning Objectives or Tags could go here */}
                {/* Learning Objectives or Tags could go here - Removed as per user request */}
                {/* <div className={styles.learningObjective}>...</div> */}

                {link ? (
                    <div className={styles.panelProse}>
                        <DynamicRouter props={{ path: link }} />
                    </div>
                ) : (
                    <div className={styles.panelProse}>
                        <p>
                            點擊右下角的按鈕進入課程，或選擇左側的其他站點進行跳轉。
                            {station.type === StationType.INTERCHANGE && (
                                <span> 此站點為轉乘站，點擊左側轉乘站可切換至其他路線。</span>
                            )}
                        </p>
                    </div>
                )}
            </div>

            <div className={styles.panelFooter}>
                {!isLastStation && (
                    <button
                        onClick={onNext}
                        className={styles.nextBtn}
                    >
                        下一站
                        <ArrowRight size={18} className={styles.iconMl} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ContentPanel;
