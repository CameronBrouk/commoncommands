import React, { useEffect } from 'react'
import { animated, useTransition } from 'react-spring'

import useClickOutside from '../useClickOutside'
import { setPosition } from '../../../utils/viewport'

import { useKeybind } from '../../../hooks/useKeybind'

export interface MenuProps extends DivElement {
  isVisible: boolean
  onClose?: () => void
}

export const Menu = ({
  isVisible,
  onClose = () => '',
  ...props
}: MenuProps) => {
  const menuRef = useClickOutside(isVisible, onClose)

  // useEffect(() => {
  //   const divElement = menuRef?.current
  //   if (divElement) setPosition(divElement)
  // })

  useKeybind(['Escape'], onClose)

  // const transitions = useTransition(isVisible, null, slideDownTransition)

  //  background: ${getStyle('menu-background')};
  //   border-radius: ${metric('largeBorderRadius')};
  //   border: 1px solid ${getStyle('menu-border-color')};
  //   box-shadow: 0 3px 10px -2px rgba(0, 0, 0, 0.05), 0 1px 1px 1px rgba(0, 0, 0, 0.05),
  //     0 2px 3px -1px rgba(0, 0, 0, 0.075);
  //   position: absolute;
  //   z-index: ${zIndex('menu')};
  //   min-width: fit-content;

  //   &:after {
  //     bottom: -2em;
  //     content: '';
  //     left: -2em;
  //     position: absolute;
  //     right: -2em;
  //     top: -2em;
  //     pointer-events: none;
  //   }

  return (
    <>
      {isVisible && (
        <animated.dialog
          aria-expanded={isVisible}
          open={isVisible}
          ref={menuRef}
          // style={transitions}
          className='absolute w-100 bg-white rounded-md border border-gray-400'>
          {props.children}
        </animated.dialog>
      )}
    </>
  )

  // return (
  //   <>
  //     {isVisible &&
  //       transitions.map(
  //         ({ item: showAnimation, props: animation, key }) =>
  //           showAnimation && (
  //             <animated.dialog
  //               aria-expanded={isVisible}
  //               className={props.className}
  //               key={key}
  //               ref={menuRef}>
  //               {props.children}
  //             </animated.dialog>
  //           ),
  //       )}
  //   </>
  // )
}

const slideDownTransition = {
  enter: {
    config: {
      friction: 32,
      mass: 1,
      tension: 1000,
    },
    transform: 'translate3d(0, 0px, 0)',
    opacity: 1,
  },
  from: {
    transform: 'translate3d(0, -15px, 0)',
    opacity: 0,
  },
  leave: {
    transform: 'translate3d(0, -15px, 0)',
    opacity: 0,
  },
}
