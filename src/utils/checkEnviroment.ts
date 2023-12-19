const Enviroment = (path = ''): string => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Đây là môi trường phát triển')
    return `http://localhost:8000/${path}`
  } else if (process.env.NODE_ENV === 'production') {
    console.log('Đây là môi trường sản phẩm')
    return `https://duantotnghiep-gsy4.onrender.com/${path}`
  } else {
    return `https://duantotnghiep-gsy4.onrender.com/${path}`
  }
}

export default Enviroment
