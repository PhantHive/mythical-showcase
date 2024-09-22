import React, { useEffect, useRef, useState } from 'react';
import '../styles/ParallaxBackground.css';

const ParallaxBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isRewinding, setIsRewinding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const parallax = parallaxRef.current;
      if (parallax) {
        const scrollPosition = window.pageYOffset;
        const yPos = -(scrollPosition * 0.3);
        parallax.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!isRewinding && video.currentTime >= video.duration - 0.1) {
        setIsRewinding(true);
      }
    };

    const handleEnded = () => {
      if (isRewinding) {
        video.currentTime = 0;
        setIsRewinding(false);
        video.play();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isRewinding]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const rewind = () => {
      if (video.currentTime <= 0) {
        setIsRewinding(false);
        video.play();
      } else {
        video.currentTime -= 0.033; // Rewind by approximately one frame (assuming 30fps)
        animationFrameId = requestAnimationFrame(rewind);
      }
    };

    if (isRewinding) {
      video.pause();
      animationFrameId = requestAnimationFrame(rewind);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRewinding]);

  return (
    <div className="parallax-container">
      <div className="video-container">
        <video
          ref={videoRef}
          muted
          playsInline
          autoPlay
          className="background-video"
        >
          <source src="/ena-burning.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay">
          <h2 className="patch-announcement">Coming September 25: Cardinal Patch</h2>
        </div>
      </div>
      {/*<div ref={parallaxRef} className="parallax-background"></div>*/}
      {/*<div className="glow-border"></div>*/}
    </div>
  );
};

export default ParallaxBackground;