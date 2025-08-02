import { useState } from 'react';

export function useVideoCall() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return {
    isMuted,
    setIsMuted,
    isVideoOff,
    setIsVideoOff,
  };
}
