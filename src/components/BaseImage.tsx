 'use client'

import Image from 'next/image'

interface BaseImageProps {
  src: string
  alt: string
  className?: string
}

const BaseImage = ({ src, alt, className = "" }: BaseImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority
    />
  )
}

export default BaseImage