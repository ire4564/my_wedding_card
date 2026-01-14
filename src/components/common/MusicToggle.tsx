'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MusicToggleProps {
  musicUrls: string[];
}

export default function MusicToggle({ musicUrls }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 랜덤으로 시작 트랙 선택
    const randomTrack = Math.floor(Math.random() * musicUrls.length);
    setCurrentTrack(randomTrack);

    // 오디오 엘리먼트 생성
    const audio = new Audio(musicUrls[randomTrack]);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // 자동 재생 시도 (모바일에서는 실패할 수 있음)
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('자동 재생 실패:', error);
        setIsPlaying(false);
      }
    };

    playAudio();

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [musicUrls]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <Button
      onClick={toggleMusic}
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-white/90 shadow-lg hover:bg-white backdrop-blur-sm"
      aria-label={isPlaying ? '음악 끄기' : '음악 켜기'}
    >
      {isPlaying ? (
        <Volume2 className="h-6 w-6 text-primary" />
      ) : (
        <VolumeX className="h-6 w-6 text-gray-400" />
      )}
    </Button>
  );
}
