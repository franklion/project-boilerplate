const init = () => {
  const container = document.querySelector('#section2')
  const ele1 = document.querySelector('.title')
  const ele2 = document.querySelector('.sub-title')

  const elementWatcher = scrollMonitor.create(container)

  elementWatcher.enterViewport(() => {
    console.log('enter the viewport!')
    genTimeline1(ele1, ele2)
    elementWatcher.destroy()
  })

  elementWatcher.exitViewport(() => {
    console.log('left the viewport!')
  })
}

const genTimeline1 = (ele1, ele2) => {
  const sec = 1
  const delay = 0.5

  return new TimelineMax({
    paused: true,
    onComplete() {
      console.log('onComplete')
    },
  })
    .to(ele1, sec, { x: '200px' })
    .to(ele2, sec, { x: '500px' }, '-=.75')
}


export default {
  init,
}
