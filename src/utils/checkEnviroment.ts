const Enviroment = (path = ''): string => {
  if (process.env.NODE_ENV === 'development') {
    return `https://sub.milk-tea-connect.click/${path}`
  } else if (process.env.NODE_ENV === 'production') {
    return `https://sub.milk-tea-connect.click/${path}`
  } else {
    return `https://sub.milk-tea-connect.click/${path}`
  }
}

export default Enviroment
