import { Socket, io } from 'socket.io-client'
import { IOrderCheckout } from './store/slices/types/order.type'

const socket: Socket = io('ws://localhost:8000', {
  transports: ['websocket', 'pulling', 'flashsocket']
})

interface Options {
  room?: string
  status?: string
}

export const ClientSocket = {
  JoinRoom: (id: string) => {
    socket.connect()
    socket.emit('join', id)
  },
  Disconnect: () => {
    socket.disconnect()
  },
  createOrder: (data: IOrderCheckout) => {
    socket.emit('client:createOrder', data)
  },
  cancelOrder: (id: string) => {
    socket.emit('client:cancelOrder', id)
  },
  getOrderUser: (setOrderUser: React.Dispatch<any>, options: Options) => {
    socket.emit('client:requestOrderUser', options)
    socket.on('server:loadOrderUser', (data) => {
      if (options.status) {
        setOrderUser(data.docs.filter((item: any) => item.status === options.status))
      } else {
        setOrderUser(data.docs)
      }
    })
    return () => {
      socket.disconnect()
    }
  }
}
