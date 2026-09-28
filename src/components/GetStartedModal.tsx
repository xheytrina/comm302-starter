import React, { useState } from 'react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs select-none">
      <div 
        className="w-full max-w-md bg-surface-base rounded-2xl shadow-2xl border border-border-hairline overflow-hidden p-6 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              alt="TradingView Logo" 
              className="h-7 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1UYyPFVNlMx2X88RozyfG0skdaswg8o4zOpxPaQMBkibh7TNkHyvyfRXCw2OzuFdUxDc5vlrJo0J5xBvj99R60f2ZDpS4AKSW6EtZCAMVVPpWbrCscFtKxDmuN7CZyvLwobsAVOnb0hlIllina7C0Eii0ERz0omkTJGPk9R_B1lEIqb0xpWYJYpzQZYtknGP12G8A5XbbXVQfyUJC4o99ylKKTqQw9nPQtCm5PJuobfamjBFOXC7jpVkHP_" 
            />
            <span className="font-bold text-base text-text-primary">TradingView</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-surface-muted text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="text-center my-1">
          <h2 className="text-xl font-bold text-text-primary">Join 60+ million traders & investors</h2>
          <p className="text-xs text-text-secondary mt-1">
            Access real-time global markets, customizable Supercharts, and community trading ideas.
          </p>
        </div>

        {isSuccess ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center text-sm font-semibold">
            ✓ Welcome! You are now signed in to TradingView.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsSuccess(true);
                  setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                  }, 1200);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-border-hairline hover:bg-surface-subtle font-semibold text-xs text-text-primary transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => {
                  setIsSuccess(true);
                  setTimeout(() => {
                    setIsSuccess(false);
                    onClose();
                  }, 1200);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-black text-white hover:bg-black/85 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.47c.68-.82 1.13-1.97 1.01-3.12-1 .04-2.18.67-2.88 1.49-.62.72-1.16 1.88-1.01 3 .01 0 .04 0 .06 0 1.05 0 2.15-.55 2.82-1.37z" />
                </svg>
                Continue with Apple
              </button>
            </div>

            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-[1px] bg-border-hairline" />
              <span className="text-[11px] text-text-secondary uppercase">or continue with email</span>
              <div className="flex-1 h-[1px] bg-border-hairline" />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border-hairline bg-surface-subtle text-xs text-text-primary placeholder:text-text-secondary outline-none focus:border-primary-container focus:bg-surface-base transition-colors"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-primary-container hover:bg-primary text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Get started for free
              </button>
            </form>
          </>
        )}

        <p className="text-[11px] text-text-secondary text-center leading-relaxed">
          By signing up, you agree to TradingView's{' '}
          <a href="#" className="underline text-text-primary">Terms of Service</a> and{' '}
          <a href="#" className="underline text-text-primary">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};
