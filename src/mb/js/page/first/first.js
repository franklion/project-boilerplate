// import { initBanner, showBanner , hideBanner } from './banner.js';

import printMe from './test.js';

// import { TweenMax } from 'gsap'


// const context = 'frank555';
// showBanner(h1)
// hideBanner()

// console.log(module.hot);






if (module.hot) {
  module.hot.accept('./test.js', function() {
    console.log('Accepting the updated printMe module!');
    printMe();
    console.log('456')
  })

}

// test isMobile.js
// console.log( `isMobile: ${isMobile.any}` )
// console.log(TweenMax); 

// test jquery
// $(() => {

  // $('.title').css({ color: 'red' })


  // TweenMax.to($('.title'), 1, { alpha: 0 })
  // TweenMax.to($('.title'), 1, { alpha: 0 })
  // TweenMax.to($('.title'), 1, {
  //   alpha: 0
  // })
  // console.log( TweenMax.to )
// });
