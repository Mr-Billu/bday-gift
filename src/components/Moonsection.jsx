import React, { useState, useEffect, Suspense } from 'react';
import moonImage from '../assets/moonphase.png';
const SecretOverlay = React.lazy(() => import('./SecretOverlay'))

const MoonSection = ({ onBackToCake }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          animation:
            Math.random() > 0.5
              ? 'animate-twinkle'
              : Math.random() > 0.5
              ? 'animate-twinkle-slow'
              : 'animate-twinkle-fast',
          delay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  const handleSecretClick = () => {
    setShowSecret(true);
  };

  const handleCloseSecret = () => {
    setShowSecret(false);
  };

  



  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a1026]">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'var(--aurora-gradient)',
          backgroundSize: '400% 400%',
          animation: 'auroraShift 20s ease infinite',
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-starlight ${star.animation}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              boxShadow: 'var(--star-glow)',
              opacity: 0.9,
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onClick={handleSecretClick}
           
          />
        ))}
      </div>

      <div
        className="absolute top-20 right-50 cursor-pointer group z-40"
        onClick={handleSecretClick}
      >
        <div className="relative">
          <div
            className="w-8 h-8 bg-starlight rounded-full animate-pulse"
            style={{
              boxShadow: 'var(--big-star-glow)',
              animation: 'float 6s ease-in-out infinite',
            }}
          />
          <div
            className="absolute z-50 bg-card/95 backdrop-blur-sm text-romantic-pink px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg border border-romantic-purple/20"
            style={{ top: '50%', right: 'calc(100% + 10px)', transform: 'translateY(-50%)' }}
          >
            Click for a secret ✨
          </div>
        </div>
      </div>

      <button
        onClick={onBackToCake}
        className="absolute font-body top-8 left-8 z-20 cursor-pointer hover:bg-transparent"
        style={{
          background: 'rgba(249, 168, 212, 0.1)',
          boxShadow: 'none',
          border: '1px solid #f9a8d4',
          color: '#f9a8d4',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          ':hover': {
            background: 'rgba(249, 168, 212, 0.1)',
            color: '#f9a8d4',
          },
        }}
      >
        ← Back to Cake
      </button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6">

        <div
          className="backdrop-blur-sm rounded-full"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.25rem',
            borderRadius: '9999px',
            background: 'transparent',
            border: '2px solid rgba(249,168,212,0.7)',
            boxShadow: '0 0 0 4px rgba(249,168,212,0.10) inset',
          }}
        >
          <h2 style={{ color: '#f9a8d4', fontWeight: 500, letterSpacing: '0.03em' }}>
            The moon when you were born
          </h2>
        </div>

        <div className='flex flex-col justify-center items-center gap-4 max-w-6xl w-4xl'
        style={{
          borderBottom: '1px solid #f9a8d4',
          paddingBottom : '20px',
          margin: '0 auto',
          borderRadius: '1px',
        }}
        >
          <div className="relative md:w-64 md:h-64 mt-6">
            <img
              src={moonImage}
              alt="Moon phase when you were born"
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(var(--moon-glow))',
                animation: 'moonRotate 30s linear infinite',
              }}
            />
          </div>
  
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-center leading-tight"
            style={{
              background: 'linear-gradient(90deg, var(--romantic-pink), var(--romantic-lavender), var(--romantic-purple))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            The moon is beautiful isn't it? 🌙
          </h1>
          </div>


        <div className="opacity-0 animate-fade-in-up-delayed-2 max-w-2xl mx-auto  flex flex-col justify-between items-center gap-4">
        <p className="text-lg md:text-xl text-romantic-lavender font-body font-light">
              Happyyy Birthdayyyy,  IFRAH 💕
            </p>

        </div>
      </div>

      {showSecret && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="dots-loader" />
            </div>
          }
        >
          <SecretOverlay onClose={handleCloseSecret} />
        </Suspense>
      )}
    </div>
  );
};

export default MoonSection;
