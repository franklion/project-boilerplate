
/* @flow */
const initBanner = () => {
  const h1 = document.createElement('h1')
  document.body && document.body.appendChild(h1)
  h1.innerText = '1';

  let count = '100';
  setInterval(() => {
    // count++
    const count = h1.innerText || 0
    
    h1.innerText = (parseInt(count, 10) * 20).toString()
  }, 1000)

}


const showBanner = (h1: HTMLElement) =>{

  // console.log(h1.innerText)

  let count = 100;
  setInterval(() => {
    // count++
    const count = h1 && h1.innerText || 0
    const num = parseInt(count, 10) - 2
    h1.innerText = num.toString()
  }, 1000)

  // console.log( `banner context is ${context}` )
}

const hideBanner  = () => {
  console.log( `banner is hide` )
}

export { initBanner, showBanner, hideBanner };