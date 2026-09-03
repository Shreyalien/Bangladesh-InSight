import React, { useState } from 'react';
import { Trophy, CheckCircle, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeritageQuizView({ quizData = [], isBengali }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quizData[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === currentQ.answerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < quizData.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (!quizData.length) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-800/80 backdrop-blur-lg border border-white/20 mb-3 shadow-md">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            {isBengali ? 'ঐতিহ্য ও ইতিহাস কুইজ' : 'Heritage & History Trivia'}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight font-display mb-2">
          {isBengali ? 'বাংলাদেশ হেরিটেজ কুইজ চ্যালেঞ্জ' : 'Bangladesh Heritage Quiz'}
        </h2>
        <p className="text-sm text-slate-300">
          {isBengali 
            ? 'পরীক্ষা করুন আপনার দেশপ্রেম ও বাংলাদেশের ইতিহাস-ঐতিহ্য সম্পর্কিত সাধারণ জ্ঞান' 
            : 'Test your knowledge about Bangladesh geography, archaeology, rivers, and cultural identity.'}
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
          
          {/* Progress and Score */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-3">
            <span>{isBengali ? 'প্রশ্ন' : 'Question'} {currentIdx + 1} / {quizData.length}</span>
            <span className="text-rose-400 font-mono">{isBengali ? 'স্কোর: ' : 'Score: '}{score}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 mb-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / quizData.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
            {isBengali ? currentQ.questionBn : currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3 mb-8">
            {(isBengali ? currentQ.optionsBn : currentQ.options).map((opt, idx) => {
              let btnStyle = 'bg-slate-900/60 hover:bg-slate-800 text-slate-200 border-white/10';

              if (isAnswered) {
                if (idx === currentQ.answerIndex) {
                  btnStyle = 'bg-emerald-600/90 text-white font-bold border-emerald-400 ring-2 ring-emerald-400/50';
                } else if (idx === selectedOpt) {
                  btnStyle = 'bg-rose-600/90 text-white font-bold border-rose-400 ring-2 ring-rose-400/50';
                } else {
                  btnStyle = 'opacity-50 bg-slate-900/30 text-slate-400 border-white/5';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all text-left ${btnStyle}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold font-mono">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && idx === currentQ.answerIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  )}
                  {isAnswered && idx === selectedOpt && idx !== currentQ.answerIndex && (
                    <XCircle className="w-5 h-5 text-rose-300 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 text-xs text-slate-300 mb-6 animate-in fade-in">
              <span className="font-bold text-amber-400 block mb-1">💡 {isBengali ? 'ব্যাখ্যা:' : 'Explanation:'}</span>
              {currentQ.explanation}
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all"
              >
                <span>{currentIdx + 1 < quizData.length ? (isBengali ? 'পরবর্তী প্রশ্ন' : 'Next Question') : (isBengali ? 'ফলাফল দেখুন' : 'See Results')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Results Card */
        <div className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/15 shadow-2xl text-center max-w-xl mx-auto animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Trophy className="w-10 h-10" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
            {isBengali ? 'কুইজ সম্পন্ন হয়েছে!' : 'Quiz Completed!'}
          </h3>
          <p className="text-sm text-slate-300 mb-6">
            {score >= quizData.length * 0.7 
              ? (isBengali ? 'অভিনন্দন! আপনি বাংলাদেশের ঐতিহ্য সম্পর্কে অত্যন্ত পারদর্শী!' : 'Outstanding! You have exceptional mastery of Bangladesh heritage!') 
              : (isBengali ? 'চমৎকার প্রচেষ্টা! দেশ সম্পর্কে আরও জানতে এক্সপ্লোর করুন।' : 'Great effort! Explore more to learn about historical landmarks.')}
          </p>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 text-center mb-8">
            <p className="text-xs uppercase font-bold text-slate-400 mb-1">{isBengali ? 'আপনার অর্জিত স্কোর' : 'Your Final Score'}</p>
            <p className="text-4xl font-black text-rose-400 font-mono">{score} / {quizData.length}</p>
            <p className="text-xs text-emerald-400 font-semibold mt-1">
              {Math.round((score / quizData.length) * 100)}% {isBengali ? 'সঠিক উত্তর' : 'Accuracy'}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isBengali ? 'পুনরায় কুইজ দিন' : 'Play Again'}</span>
          </button>
        </div>
      )}

    </div>
  );
}