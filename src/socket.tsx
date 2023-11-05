import { Socket, io } from 'socket.io-client'
import { IOrderCheckout } from './store/slices/types/order.type'

const socket: Socket = io('ws://localhost:8000', {
  transports: ['websocket', 'pulling', 'flashsocket']
})

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
  }
}
