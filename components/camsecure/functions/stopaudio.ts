
export const stopAudio = (audio: any) => {
    if(!audio.paused && !audio.ended){
    audio.pause()
    audio.currentTime = 0
    }
    
}
    
  