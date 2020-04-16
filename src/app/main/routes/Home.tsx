import React from 'react'
import styled from 'styled-components'

const Home = ({ className }: any) => {
  return (
    <section className={className}>
      <div className='home-overlay'></div>
      <img
        className='home-image'
        src={require('../../../assets/meeting.jpg')}
        alt='home page'
      />
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
    </section>
  )
}

export default styled(Home)`
  .home-overlay,
  .home-image {
    position: absolute;
    margin-top: -10vh;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    object-fit: cover;
  }

  .home-image {
    z-index: -2;
  }

  .home-overlay {
    background-color: rgba(0, 0, 0, 0.7);
    z-index: -1;
  }
`
