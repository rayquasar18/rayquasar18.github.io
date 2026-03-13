'use client'
import { CSSProperties } from "react"
interface BaseVideoProps {
  src: string
  className?: string
  style?: CSSProperties
}

const BaseVideo = ({ src, className = "" ,style={}}: BaseVideoProps) => {
  return (
    <video
      src={src}
      className={className}
      style={{
        ...style,
        pointerEvents: "none",
      }}
      autoPlay
      muted
      loop
      playsInline
      controls={false} 
      disablePictureInPicture 
      controlsList="nodownload nofullscreen noremoteplayback" 
    />
  )
}

export default BaseVideo 