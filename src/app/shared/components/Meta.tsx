import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  title: string
  description?: string
  image?: string
  url?: string
}
export const Meta = (props: Props) => {
  const description = props.description
    ? props.description
    : 'Website Description'

  return (
    <Helmet>
      {/* Google */}
      <title>{props.title}</title>
      <meta name='title' content={props.title} />
      <meta name='description' content={description} />
      {props.image && <meta property='image' content={props.image} />}
      {props.url && <meta property='url' content={props.url} />}

      {/* Facebook */}
      <meta property='og:title' content={props.title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      {props.image && <meta property='og:image' content={props.image} />}
      {props.url && <meta property='og:url' content={props.url} />}

      {/* Twitter */}
      <meta property='twitter:title' content={props.title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:type' content='website' />
      {props.image && <meta property='twitter:image' content={props.image} />}
      {props.url && <meta property='twitter:url' content={props.url} />}
    </Helmet>
  )
}
