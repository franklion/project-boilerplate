
const state = {
  data: { name: 'frank' },
}

const init = () => {
  console.log('now data:', state.data)
}

const setState = (newData) => {
  const data = Object.assign(state.data, newData)
}

const getState = () => state.data


export default {
  init, setState, getState,
}
