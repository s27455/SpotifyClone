import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSong = useRef<string | null>(null);
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);

    return()=>audio?.removeEventListener("ended", handleEnded)
  }, [playNext]);

  //handle song chanege
  useEffect(()=>{
    if(!audioRef.current || !currentSong) return;
    const audio = audioRef.current
    const isSongChanged = prevSong.current !== currentSong?.audioUrl
    if(isSongChanged){
        audio.src=currentSong?.audioUrl;
        //reset playback
        audio.currentTime=0;
        prevSong.current = currentSong?.audioUrl;
        if(isPlaying) audio.play();
    }
  },[currentSong,isPlaying])

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
