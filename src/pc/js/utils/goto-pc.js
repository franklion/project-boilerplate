
if (!isMobile.any) {
  console.log('Your device is pc')
  const arr = window.location.href.split('/')
  const index = arr.indexOf('mb')
  arr.splice(index, 1)
  window.location.replace(arr.join('/'))
}
