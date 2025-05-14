import {throttle} from 'lodash'



export const playAudio = throttle((audio: any) => {
   
      audio.currentTime = 0; // Reset to start
      
        audio
          .play()
          .catch((err: any) => {
            console.error('Audio playback error', err);
            });
    
  }, 2000);