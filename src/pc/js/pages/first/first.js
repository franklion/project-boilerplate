import scrollMonitor from '../../libs/scrollMonitor/scrollMonitor'
/* eslint-disable-next-line */
import { TweenMax } from 'gsap'
import myIsMobile from './isMobile'
import myAnimation from './animation'
import myPromise from './promise'
import mydata from './data'


$(() => {
  // myIsMobile.init()
  // myAnimation.init()
  // myPromise.init()

  mydata.init()
  mydata.setState({ age: 30 })
  const data = mydata.getState()
  console.log(data)
})

