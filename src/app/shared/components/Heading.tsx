import React from 'react'
import styled from 'styled-components'
import { useUI } from '../hooks/ui.hooks'

interface Props {
  className?: any
  title: string
}

const Heading = (props: Props) => {
  const { isMobile } = useUI()
  return (
    <header className={props.className}>
      <div className='heading-overlay'></div>
      <img
        className='heading-image'
        src={require('../../../assets/meeting.jpg')}
        alt='heading'
      />
      <h1 className='title'>{props.title}</h1>
    </header>
  )
}
export default styled(Heading)`
  width: 100vw;
  max-width: 100%;
  height: 30vh;
  display: flex;
  color: white;
  justify-content: center;
  position: relative;

  .heading-overlay,
  .heading-image {
    position: absolute;
    width: 100vw;
    max-width: 100%;
    height: 30vh;
    max-width: 100%;
    object-fit: cover;
  }

  .heading-image {
    z-index: -2;
  }

  .heading-overlay {
    background-color: rgba(0, 0, 0, 0.7);
    z-index: -1;
  }

  @media only screen and (min-width: 900px) {
    .headiing-overlay,
    .heading-image {
      margin-top: -10vh;
    }
  }
`
