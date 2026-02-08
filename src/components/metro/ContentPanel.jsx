import React from 'react';
import { ArrowRight } from 'lucide-react';
import './styles.css';

const ContentPanel = ({ station, isLastStation, onNext, onNavigate }) => {
    return (
        <div className="metro-content-panel">
            {/* Header */}
            <div className="metro-panel-header">
                <h1 className="metro-panel-title">
                    {station.title}
                </h1>
                <p className="metro-panel-desc">
                    {station.description}
                </p>
            </div>

            {/* Main Content Body */}
            <div className="metro-panel-body">
                <div className="metro-panel-prose">
                    <p>
                        Welcome to the <strong>{station.title}</strong> module. Here you would typically find video lectures,
                        interactive quizzes, and reading materials designed to master this topic.
                    </p>
                    <div className="metro-learning-objective">
                        <h4 className="metro-lo-title">學習目標</h4>
                        <p className="metro-lo-text">
                            By reaching this station, you demonstrate a core understanding of the subject matter before transferring to the next line.
                        </p>
                    </div>
                    <p>
                        (點擊下方按鈕開始詳細課程內容)
                    </p>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="metro-panel-footer">
                {station.link && (
                    <button
                        onClick={() => onNavigate(station.link)}
                        className="metro-next-btn"
                        style={{ marginRight: '10px' }}
                    >
                        進入課程
                        <ArrowRight size={18} className="metro-icon-ml" />
                    </button>
                )}

                {!isLastStation && (
                    <button
                        onClick={onNext}
                        className="metro-next-btn"
                    >
                        下一站
                        <ArrowRight size={18} className="metro-icon-ml" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ContentPanel;
