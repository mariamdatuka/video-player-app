import React from 'react'
import { useState, useRef, useEffect } from 'react';
import {AiFillPlayCircle} from 'react-icons/ai';
import {AiFillBackward }from 'react-icons/ai';
import {AiOutlineForward} from 'react-icons/ai';
import {BsFillVolumeDownFill} from 'react-icons/bs';
import {AiFillSetting} from 'react-icons/ai';
import {BsFillPauseCircleFill} from 'react-icons/bs';
import { ChangeEvent } from 'react';

const Video = () => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [play, setPlay]=useState<boolean>(false);
  const [videoTime, setVideoTime] = useState<number>(0);
  const [currTime, setCurrTime] = useState<number>(0);
  const [progress, setProgress]= useState<number>(0);
  const [volume, setVolume] = useState<number>(1.0);

  const video = videoRef.current as HTMLVideoElement; 
  const progressRef=useRef<any>(0);
 
  const videoHandler = (control:string) => {
    if (control === "play") {
      video?.play();
      setPlay(true);
      setVideoTime(video?.duration);
     } else if (control === "pause") {
      video?.pause();
      setPlay(false);
    
    }
  };

  const forwardAndBack = (value:string) => {

    if (value === 'back') {
      video.currentTime = video.currentTime - 15;


    } else if (value === 'fwd') {
      video.currentTime = video.currentTime + 15;
    }
  };

  useEffect(()=>{
    const interval= setInterval(() => {
      setCurrTime(video?.currentTime);
    }, 1000);

    return () => clearInterval(interval);
 }, [video?.onloadedmetadata])


 const handleProgress=()=>{
  if (isNaN(video.duration))
  return;
  setProgress((video?.currentTime / videoTime) * 100);
  progressRef.current.style.width=`${progress}%`;
 }
 
  return (
    <>
     <video
             className='video' 
             width='50%'
             ref={videoRef}
            onTimeUpdate={handleProgress}
           
           >
        <source  src="/Trailer720.mp4" />
     </video>
     <div className="controlsContainer">
    <AiFillBackward size={25} onClick={()=>forwardAndBack('back')}/>
    {
           play?
           (<BsFillPauseCircleFill size={30}
            onClick={()=>videoHandler('pause')}/>
            ):
            (
              <AiFillPlayCircle size={30}  onClick={() => videoHandler("play")} />
            )
    }
    

    <AiOutlineForward size={25} onClick={()=>forwardAndBack('fwd')}/>
     </div>
     <div className="timecontrols">
        <p className="controlsTime">
          {(videoTime && !isNaN(videoTime)) && Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}
        </p>
        <div className="time_progressbarContainer">
          <div ref={progressRef} className="time_progressBar"></div>
        </div>
        <p className="controlsTime">
          {currTime && !isNaN(currTime) && Math.floor(currTime / 60) + ":" + ("0" + Math.floor(currTime % 60)).slice(-2)}
        </p>
   </div>
   <BsFillVolumeDownFill size={20}/>
   <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e:ChangeEvent<HTMLInputElement>) => {
    setVolume(+e.target.value)
    video.volume =+e.target.value;

    }}/>

    </>
  )
}

export default Video