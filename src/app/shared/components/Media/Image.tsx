import React from 'react'

export type Props = {
  src: string
  alt: string
  fit: 'contain' | 'cover'
  overlay?: boolean
}

/**
 * @param src name of image(with suffix)
 * @param alt image alt text
 * @param fit object-fit css property. contain or cover;
 */
export const Image = ({ src, alt, fit, ...props }: C<Props>) => {
  const sharedClasses = `absolute top-0 left-0 w-auto h-auto max-w-full max-h-full`

  return (
    <section className={`relative overflow-hidden ${props.className}`}>
      <img
        src={require(`../../../../assets/${src}`)}
        alt={alt}
        className={`object-${fit} z-10 ${sharedClasses}`}
      />

      <div className={`z-20 ${sharedClasses}`}>
        {/* This Content will overlayed on top of the image */}
        {props.children}
      </div>
    </section>
  )
}
