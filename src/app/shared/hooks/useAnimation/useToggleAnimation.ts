import { useSpring } from 'react-spring'

const useToggleAnimation = (predicate: boolean) => {
  const fade = useSpring({ opacity: predicate ? 0 : 1 })

  const slideLeft = useSpring({
    transform: predicate ? `translate3D(0,0,0)` : `translate3d(100%, 0, 0)`,
  })

  const slideRight = useSpring({
    transform: predicate ? `translate3D(0,0,0)` : `translate3d(-100%, 0, 0)`,
  })

  const grow = useSpring({
    transform: predicate ? `scale(1)` : `scale(1.1)`,
  })

  return { fade, slideLeft, slideRight, grow }
}

export default useToggleAnimation
