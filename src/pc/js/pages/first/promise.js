const init = () => {
  new Promise((resolve, reject) => {
    resolve('success')
  })
    .then((res) => {
      console.log(`resolve: ${res}`)
    })
    .catch((err) => {
      console.log(`reject: ${err}`)
    })
}

export default {
  init,
}
