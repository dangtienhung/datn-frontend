import { ChatContent } from './chat-content'
import { ChatHeader } from './chat-header'
import { ChatInputBox } from './chat-input'
import { Message } from '../types'
import { useGetMessages } from '../hooks'
import { useState } from 'react'

export const SupportBot = () => {
  const [textMessage, setTextMessage] = useState<string>('')
  /* fake data nha */
  const {
    messages: { data }
  } = useGetMessages()
  const [chatMessages, setChatMessages] = useState<Message[]>(data)

  const sendANewMessage = (message: Message) => {
    setChatMessages((prevMessages) => [...prevMessages, message])
  }

  const resetChat = () => {
    setChatMessages(data)
  }
  return (
    <div className='rounded-xl fixed bottom-[30px] right-24 w-full max-w-lg h-full max-h-[80vh] flex flex-col bg-white'>
      {/* <ChatHeader name={'tên khách hàng'} numberOfMessages={chatMessages.length} /> */}
      <ChatContent messages={chatMessages} />
      <ChatInputBox sendANewMessage={sendANewMessage} />
    </div>
  )
}
