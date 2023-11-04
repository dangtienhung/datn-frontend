import React, { useState } from 'react'

const Bot = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [inputMessage, setInputMessage] = useState<string>('')

  const sendMessage = async () => {
    try {
      const response = await fetch(`http://localhost:3000/ask?query=${inputMessage}`)
      const data = await response.json()
      setMessages((prevMessages) => [...prevMessages, data.answer])
      setInputMessage('')
      console.log(data)
      console.log(messages)
    } catch (error) {
      console.error('Error fetching response:', error)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    sendMessage()
  }
  return (
    <div className='mt-10'>
      <ul className='text-red-500 font-bold'>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input id='message-input' value={inputMessage} onChange={handleInputChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Bot
