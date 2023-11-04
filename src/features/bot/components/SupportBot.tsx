import { Dispatch, SetStateAction, useState } from 'react'
import { ChatHeader } from './chat-header'
import { Message } from '../types'
import { useGetMessages } from '../hooks'
import { ChatContent } from './chat-content'
import { ChatInputBox } from './chat-input'
import { Drawer } from 'antd'

interface SupportBotProps {
  open: boolean
  onClose: () => void
}

export const SupportBot = ({ open, onClose }: SupportBotProps) => {
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
    <Drawer title='Basic Drawer' width={500} placement='right' onClose={onClose} open={open}>
      <div className='rounded-3xl relative bottom-0 flex flex-col w-full bg-white'>
        <ChatHeader name={'tên khách hàng'} numberOfMessages={chatMessages.length} />
        <ChatContent messages={chatMessages} />
        <ChatInputBox sendANewMessage={sendANewMessage} />
      </div>
    </Drawer>
  )
}
