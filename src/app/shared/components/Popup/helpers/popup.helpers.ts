const exceedsLeft = (bounding: DOMRect) => bounding.left < 0
const exceedsTop = (top: number) => top < 100 // 60 is the height of the header
const exceedsBottom = (bottom: number) =>
  bottom > (window.innerHeight || document.documentElement.clientHeight) - 10
const exceedsRight = (right: number) =>
  right > (window.innerWidth || document.documentElement.clientWidth)

// If The Element is Above The top of the viewport,
// recursively add 20px until it's not.
// There is 100% a better way to do this.
// const adjustPosition = (element: HTMLElement) => {
//   const { style } = element
//   style.marginTop = `${parseInt(style.marginTop) + 20}px`
//   const { top } = element.getBoundingClientRect()
//   if (exceedsTop(top)) adjustPosition(element)
// }

export const setPosition = (element: HTMLElement) => {
  const { style } = element

  const { height, width, bottom, right, top } = element.getBoundingClientRect()

  const {
    height: parentHeight,
    width: parentWidth,
    // @ts-ignore
  } = element.parentElement.getBoundingClientRect()

  if (exceedsBottom(bottom)) style.marginTop = `-${parentHeight}px`
  if (exceedsRight(right)) style.marginLeft = `-${parentWidth}px`
  // if (exceedsTop(top)) style.marginBottom = `-${parentHeight + 200}px`
}
