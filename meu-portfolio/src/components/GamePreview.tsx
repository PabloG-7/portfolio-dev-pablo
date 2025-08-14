import { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Play, Timer, Lock } from 'lucide-react';

interface GamePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  gameUrl: string;
  githubUrl: string;
  title: string;
}

const GamePreview = ({ isOpen, onClose, gameUrl, githubUrl, title }: GamePreviewProps) => {
  const [timeLeft, setTimeLeft] = useState(50);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [hasPlayedDemo, setHasPlayedDemo] = useState(false);

  useEffect(() => {
    // Safe localStorage access after component mount
    const played = localStorage.getItem(`demo-played-${title}`) === 'true';
    setHasPlayedDemo(played);
  }, [title]);

  useEffect(() => {
    if (!isOpen || !isStarted) {
      setTimeLeft(50);
      setIsTimeUp(false);
      setIsStarted(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isStarted]);

  const handleStart = () => {
    if (!hasPlayedDemo) {
      setIsStarted(true);
      localStorage.setItem(`demo-played-${title}`, 'true');
      setHasPlayedDemo(true);
    }
  };

  const handleClose = () => {
    setIsStarted(false);
    setIsTimeUp(false);
    setTimeLeft(50);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-[100] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-7xl h-full max-h-[95vh] relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-6 border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            <h3 className="text-lg sm:text-2xl font-playfair font-bold gradient-text truncate">{title}</h3>
            {isStarted && !isTimeUp && (
              <div className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-1 sm:py-2 bg-primary/20 rounded-full">
                <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-primary font-mono font-bold text-sm sm:text-base">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
            {isStarted && !isTimeUp && (
              <div className="sm:hidden flex items-center space-x-1 px-2 py-1 bg-primary/20 rounded-full">
                <Timer className="w-3 h-3 text-primary" />
                <span className="text-primary font-mono font-bold text-xs">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-1 sm:p-2 rounded-full hover:bg-muted transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Game Content */}
        <div className="relative h-full">
          {!isStarted ? (
            // Start Screen
            <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center">
              {hasPlayedDemo ? (
                <>
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-muted to-muted-foreground flex items-center justify-center mb-8">
                    <Lock className="w-16 h-16 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-playfair font-bold mb-4">
                    Demo já jogada! 🎮
                  </h4>
                  <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md">
                    Você já experimentou nossa demo. Para jogar novamente, acesse a versão completa!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={gameUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-premium hover-lift inline-flex items-center justify-center space-x-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                    >
                      <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Jogar Versão Completa</span>
                    </a>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost hover-lift inline-flex items-center justify-center space-x-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                    >
                      <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Ver Código</span>
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-6 sm:mb-8 animate-pulse">
                    <Play className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-playfair font-bold mb-4">
                    Pronto para testar sua memória?
                  </h4>
                  <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-md">
                    Você terá <span className="text-primary font-bold">50 segundos</span> para 
                    experimentar o jogo NEON MEMORY. Teste suas habilidades!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={handleStart}
                      disabled={hasPlayedDemo}
                      className="btn-premium hover-lift inline-flex items-center space-x-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Começar Demo</span>
                    </button>
                    <button
                      onClick={handleClose}
                      className="btn-ghost hover-lift inline-flex items-center space-x-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Cancelar</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Game iframe */}
              <iframe
                src={gameUrl}
                className={`w-full h-full border-0 transition-opacity duration-300 min-h-[400px] ${
                  isTimeUp ? 'opacity-30 pointer-events-none' : 'opacity-100'
                }`}
                title={title}
                allowFullScreen
                style={{ aspectRatio: '16/9' }}
              />

              {/* Time Up Overlay */}
              {isTimeUp && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4">
                  <div className="text-center p-4 sm:p-8 bg-card border border-border rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <Timer className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-playfair font-bold mb-3 sm:mb-4">
                      Tempo Esgotado! ⏰
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                      Gostou do que viu? Continue jogando na versão completa!
                    </p>
                    <div className="flex flex-col space-y-3">
                      <a
                        href={gameUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-premium hover-lift inline-flex items-center justify-center space-x-2 text-sm sm:text-base py-2 sm:py-3"
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Jogar Versão Completa</span>
                      </a>
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost hover-lift inline-flex items-center justify-center space-x-2 text-sm sm:text-base py-2 sm:py-3"
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Ver Código no GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePreview;