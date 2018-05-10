import { initBanner, showBanner , hideBanner } from '../../utils/banner.js';

// import printMe from './test.js';

// import { TweenMax } from 'gsap'


// const h1 = document.createElement('h1')
// h1.innerText = 0;
// document.body.appendChild(h1)

// showBanner(h1)
// hideBanner()


// console.log(module.hot);

initBanner()
// console.log(isMobile.any)



// if (module.hot) {
//   module.hot.accept('./test.js', function() {
//     console.log('Accepting the updated printMe module!');
//     printMe();
//     console.log('456')
//   })
// }

// test isMobile.js
// console.log( `isMobile: ${isMobile.any}` )
// console.log(TweenMax); 

// test jquery
$(() => {
  console.log(456);
  $('.title').css({ color: 'pink', 'fontSize': '150px' })
});
  // $('.title').css({ color: 'orange' })


  // TweenMax.to($('.title'), 1, { alpha: 0 })
  // TweenMax.to($('.title'), 1, { alpha: 0 })
  // TweenMax.to($('.title'), 1, {
  //   alpha: 0
  // })
  // console.log( TweenMax.to )

