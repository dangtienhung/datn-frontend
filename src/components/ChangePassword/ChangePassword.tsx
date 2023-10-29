import { Button, Form, Input } from 'antd'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  account?: string
  password?: string
  confirmPass?: string
}

const ChangePassword = () => {
  return (
    <div className='flex-1'>
      <div className='items-center justify-between border-b border-gray-200 pb-4'>
        <h2 className='text-[#333] text-lg font-medium'>Thay đổi mật khẩu</h2>
      </div>
      <div className='select-none mt-[20px]'>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Mật khẩu cũ'
            name='account'
            rules={[{ required: true, message: 'Please input your account!' }]}
          >
            <Input className='border-gray-300 h-[35px] rounded-[5px]' />
          </Form.Item>

          <Form.Item<FieldType>
            label='Mật khẩu mới'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label='Xác nhận mật khẩu mới'
            name='confirmPass'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit' className='bg-primary-500'>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ChangePassword
