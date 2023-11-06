import { message } from 'antd'

export const sendMessage = async (inputMessage: string) => {
  try {
    const response = await fetch(`http://localhost:3333/ask?query=${inputMessage}`)
    const data = await response.json()
    return data
  } catch (error) {
    message.error('Có lỗi xảy ra')
  }
}
