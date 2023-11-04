interface ChatHeaderProps {
  name: string
  numberOfMessages: number
}

export const ChatHeader = ({ name, numberOfMessages = 0 }: ChatHeaderProps) => {
  return (
    <div className='border-b-gray-200 flex flex-row items-center justify-between py-3 border-b-2'>
      <div className='flex flex-row items-center space-x-1.5'>
        {/* avata */}
        <div className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full'>
          <svg
            className='-left-1 absolute w-12 h-12 text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd'></path>
          </svg>
        </div>
        <div className='flex flex-col'>
          <p className='text-xs text-gray-600'>{name}</p>
          <p className='text-xs text-gray-400'>{numberOfMessages} messages</p>
        </div>
      </div>
      {/* <div className='space-x-1'>
        <button
          type='button'
          className='hover:bg-gray-100 rounded-full font-medium text-sm p-1.5 text-center inline-flex items-center'
        >
          <PhoneIcon className='w-5 h-5 text-gray-600' />
        </button>
        <button
          type='button'
          className='hover:bg-gray-100 rounded-full font-medium text-sm p-1.5 text-center inline-flex items-center'
        >
          <CameraIcon className='w-5 h-5 text-gray-600' />
        </button>
      </div> */}
    </div>
  )
}
