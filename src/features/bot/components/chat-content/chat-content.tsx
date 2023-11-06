import { Message } from '../../types'

interface ChatContentProps {
  messages: Message[]
}

export const ChatContent = ({ messages }: ChatContentProps) => {
  return (
    <div className='flex-1 h-full py-1 overflow-auto px-5'>
      {messages.map((message: Message, index: number) => (
        <div
          key={index}
          className={`py-2 flex flex-row w-full ${message.isChatOwner ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`${message.isChatOwner ? 'order-2' : 'order-1'}`}>
            {/* avata */}
            <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full'>
              <svg
                className='-left-1 absolute w-12 h-12 text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </div>
          </div>
          <div
            className={`px-2 w-fit py-3 flex flex-col bg-[#D3B673] items-start rounded-lg text-white ${
              message.isChatOwner ? 'order-1 mr-2' : 'order-2 ml-2'
            }`}
          >
            <span className='text-xs text-gray-200'>
              {message.sentBy}&nbsp;-&nbsp;
              {new Date(message.sentAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            <span className='text-md'>{message.text}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
