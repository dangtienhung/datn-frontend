import { Button, Col, Empty, Form, Input, Modal, Row, message } from 'antd'
import { useCreateAddressMutation, useGetAddressQuery } from '../../store/services/address.service'

import { IAddressCreate } from '../../interfaces'
import { Navigate } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../store/hooks'
import { useState } from 'react'

const MyAddress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createAddress] = useCreateAddressMutation()

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { user } = useAppSelector((state) => state.persistedReducer.auth)

  if (!user) {
    message.error('Bạn cần đăng nhập để thực hiện chức năng này')
    return <Navigate to='/login' replace={true} />
  }

  const { data: addressData } = useGetAddressQuery({ userId: user._id as string })

  const handleSubmitAddress = async (data: Pick<IAddressCreate, 'address' | 'name' | 'phone'>) => {
    try {
      const response = await createAddress({
        ...data,
        userId: user._id as string,
        default: false
      })
      if (response) {
        message.success('Thêm địa chỉ thành công')
        setIsModalOpen(false)
      }
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại sau!')
    }
  }

  return (
    <>
      <div className='flex-1'>
        <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
          <h2 className='text-[#333] text-lg font-medium'>Địa chỉ của tôi</h2>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            className='bg-[#D8B979]'
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            Thêm địa chỉ mới
          </Button>
        </div>
        {addressData?.docs?.length === 0 && (
          <div className='h-full w-full flex items-center justify-center'>
            <Empty description={'Bạn chưa có địa chỉ nào'}></Empty>
          </div>
        )}
        <div className='select-none'>
          {addressData?.docs?.map((address) => (
            <div className='py-6 not:last:border-b border-[#D8B979]' key={address._id}>
              <div className='flex items-center gap-4 mb-2'>
                <p className='border-r border-gray-300 pr-4'>{address.name}</p>
                <p className=''>{address.phone}</p>
              </div>
              <p className='text-xs text-gray-500 capitalize mb-1'>{address.address}</p>
              {address.default && (
                <div className='flex gap-x-3 items-center'>
                  <p className='text-xs border-[#D8B979] border w-fit px-2 py-[1px] rounded text-[#D8B979]'>Mặc định</p>
                  <p className='text-xs border-gray-300 border w-fit px-2 py-[1px] rounded text-gray-300'>
                    Địa chỉ giao hàng
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Modal title='Địa chỉ mới' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form layout='vertical' autoComplete='off' onFinish={handleSubmitAddress}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label='Họ và tên'
                name={'name'}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ và tên'
                  }
                ]}
              >
                <Input placeholder='Họ và tên' className='border rounded-md' />
              </Form.Item>
            </Col>
            <Col span={12} className=''>
              <Form.Item
                label='Số điện thoại'
                name={'phone'}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại'
                  }
                ]}
              >
                <Input placeholder='Số điện thoại' className='border rounded-md' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label='Địa chỉ'
                name={'address'}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ'
                  }
                ]}
              >
                <Input placeholder='Địa chỉ' className='border rounded-md' />
              </Form.Item>
            </Col>
          </Row>

          <Button
            type='primary'
            htmlType='submit'
            className='bg-yellow hover:!bg-yellow text-white w-full border rounded-md'
          >
            Thêm địa chỉ
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default MyAddress
