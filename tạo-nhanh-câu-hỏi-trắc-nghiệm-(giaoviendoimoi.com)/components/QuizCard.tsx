import React from 'react';
import { QuizQuestion } from '../types';
import MathRenderer from './MathRenderer';
import { CheckCircle, Trash2 } from 'lucide-react';

interface QuizCardProps {
  question: QuizQuestion;
  index: number;
  onDelete: (id: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, index, onDelete }) => {
  return (
    // Increased opacity to bg-white/95 to make it very readable
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/60 p-6 mb-4 transition-all hover:bg-white hover:shadow-xl group relative">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
            <span className="bg-primary text-white text-sm font-bold px-2 py-1 rounded-md shadow-sm">
                Câu {index + 1}
            </span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                {question.level}
            </span>
        </div>
        
        {/* Delete Button */}
        <button 
            onClick={() => onDelete(question.id)}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Xóa câu hỏi này"
        >
            <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6 text-lg font-medium text-slate-900 leading-relaxed drop-shadow-sm">
        <MathRenderer text={question.question_content} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((opt) => {
          const isCorrect = opt.key === question.correct_answer;
          return (
            <div 
              key={opt.key}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                isCorrect 
                  ? 'border-green-500/50 bg-green-50/80' 
                  : 'border-slate-200 hover:border-blue-400/50 bg-white/60 hover:bg-white/90'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`
                    flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow-sm
                    ${isCorrect ? 'bg-green-600 text-white' : 'bg-white text-slate-700 border border-slate-300'}
                `}>
                  {opt.key}
                </span>
                <div className="flex-grow pt-1">
                    <MathRenderer text={opt.text} className="text-slate-800 font-medium" />
                </div>
                {isCorrect && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 drop-shadow-sm" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCard;