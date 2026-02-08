import React from 'react';
import { Station } from '../types';
import { ArrowRight } from 'lucide-react';

interface ContentPanelProps {
  station: Station;
  isLastStation: boolean;
  onNext: () => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ station, isLastStation, onNext }) => {
  return (
    <div className="content-panel">
      {/* Header */}
      <div className="panel-header">
        <h1 className="panel-title">
          {station.title}
        </h1>
        <p className="panel-desc">
          {station.description}
        </p>
      </div>

      {/* Main Content Body */}
      <div className="panel-body">
        <div className="panel-prose">
          <p>
            Welcome to the <strong>{station.title}</strong> module. Here you would typically find video lectures,
            interactive quizzes, and reading materials designed to master this topic.
          </p>
          <div className="learning-objective">
            <h4 className="lo-title">Learning Objective</h4>
            <p className="lo-text">
              By reaching this station, you demonstrate a core understanding of the subject matter before transferring to the next line.
            </p>
          </div>
          <p>
            (Placeholder content: Imagine a rich text editor or markdown rendered content here representing the actual course material.)
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="panel-footer">
        {!isLastStation && (
          <button 
            onClick={onNext}
            className="next-btn"
          >
            Next Station
            <ArrowRight size={18} className="icon-ml" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentPanel;