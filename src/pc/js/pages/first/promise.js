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

const filterData = () => {
  /* env: node
  1 找出價格低於 1000 的最高單價商品名稱
  2 把商品名稱丟給伺服器驗証, 伺服器會回傳{"status":"ok"} (請用 setTimeout 模擬即可)
  3 接到 status ok, 離開執行序
  */
  const DATA = [
    { name: 'product0', price: 50 },
    { name: 'product1', price: 150 },
    { name: 'product2', price: 850 },
    { name: 'product3' },
    { name: 'product4', price: 1050 },
    { name: 'product5', price: 2550 },
    { name: 'product6' },
    { name: 'product7', price: 990 },
    { name: 'product8', price: 988 },
    { name: 'product9' },
  ]

  const filterPriceLess1000 = datas => datas.filter(item => item.price && item.price <= 1000)

  const sortProdcutByASC = datas => datas.sort((a, b) => a.price - b.price)

  const isValidProductName = productName => new Promise((resolve, reject) => setTimeout(() => resolve({ status: 'ok' }), 1000))


  Promise.resolve(DATA)
    .then(datas => filterPriceLess1000(datas))
    .then(datas => sortProdcutByASC(datas))
    .then(datas => datas[datas.length - 1].name)
    .then(productName => isValidProductName(productName))
    .then((result) => {
      if (result.status === 'ok') {
        return Promise.resolve('data is ok!')
      }
      return Promise.reject(result.status)
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export default {
  init, filterData,
}
