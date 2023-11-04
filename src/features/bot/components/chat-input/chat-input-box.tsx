import { useState } from 'react'
import { Message } from '../../types'
import { DebouncedInput } from '../debounce-input'

interface ChatInputBoxProps {
  sendANewMessage: (message: Message) => void
}

export const ChatInputBox = ({ sendANewMessage }: ChatInputBoxProps) => {
  const [newMessage, setNewMessage] = useState<string>('')

  const doSendMessage = () => {
    if (newMessage && newMessage.length > 0) {
      const newMessagePayload: Message = {
        sentAt: new Date(),
        sentBy: 'devlazar',
        isChatOwner: true,
        text: newMessage
      }
      sendANewMessage(newMessagePayload)
      setNewMessage('')
    }
  }

  return (
    <div className='w-100 rounded-bl-xl rounded-br-xla absolute bottom-0 left-0 right-0 py-3 overflow-hidden bg-white'>
      <div className='flex flex-row items-center space-x-5'>
        <DebouncedInput value={newMessage ?? ''} debounce={100} onChange={(value) => setNewMessage(String(value))} />
        <button
          type='button'
          disabled={!newMessage || newMessage.length === 0}
          className='hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 disabled:opacity-50 px-3 py-2 text-xs font-medium text-center text-white bg-purple-500 rounded-lg'
          onClick={() => doSendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  )
}
