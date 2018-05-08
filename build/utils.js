const hashTime = () => {
  let currentTime = new Date();

  const YEAR    = currentTime.getFullYear();
  const MONTH   = ('0' + ( currentTime.getMonth() + 1 ) ).slice(-2);
  const DATE    = ( '0' + currentTime.getDate() ).slice(-2);
  const HOURS   = currentTime.getHours();
  const MINUTES = currentTime.getMinutes();

  return `${YEAR}${MONTH}${DATE}${HOURS}${MINUTES}`
}


const handleEntry = (pageCollections, device) => {
  if(!device) return 'handleEntry is fail';

  const entryCollections = {}

  pageCollections.forEach( uniquePage => {
    entryCollections[uniquePage] = [
      `./src/${device}/js/page/${uniquePage}/${uniquePage}.js` // 可以再往下加入css檔
    ]
  })

  return entryCollections
}

export { hashTime, handleEntry }