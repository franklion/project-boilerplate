
const initBanner = () => {
  const h1 = document.createElement('h1')
  h1.innerText = 0;
  document.body.appendChild(h1)

  let count = 100;
  setInterval(() => {
    // count++
    const count = h1.innerText
    
    h1.innerText = parseInt(count, 10) * 20 
  }, 1000)

}


const showBanner = (h1) =>{

  // console.log(h1.innerText)

  let count = 100;
  setInterval(() => {
    // count++
    const count = h1.innerText
    
    h1.innerText = parseInt(count, 10) - 2 
  }, 1000)

  // console.log( `banner context is ${context}` )
}

const hideBanner  = () => {
  console.log( `banner is hide` )
}

export { initBanner, showBanner, hideBanner };