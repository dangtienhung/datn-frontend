import { IAddressCreate } from '../../../interfaces'
import { addressApi } from '../../../api/address.api'
import { message } from 'antd'
import { useAppSelector } from '../../../store/hooks'

export const handleCreateAddress = async (data: IAddressCreate) => {
  try {
    const response = await addressApi.create(data)
    console.log('🚀 ~ file: handle-create-address.ts:12 ~ handleCreateAddress ~ response:', response)
  } catch (error) {
    message.error('Có lỗi xảy ra, vui lòng thử lại sau!')
  }
}
