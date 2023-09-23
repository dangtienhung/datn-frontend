import { Button, Col, Drawer, Row, Space } from 'antd'

interface DrawerAddProductProps {
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
  isOpenDrawer: boolean
}

export const DrawerAddProduct = ({ setIsOpenDrawer, isOpenDrawer }: DrawerAddProductProps) => {
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false)
  }

  return (
    <Drawer
      title='Thêm sản phẩm mới'
      width={820}
      onClose={() => setIsOpenDrawer(false)}
      open={isOpenDrawer}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={handleCloseDrawer}>Cancel</Button>
          <Button className='bg-blue-400' onClick={handleCloseDrawer} type='primary'>
            Submit
          </Button>
        </Space>
      }
    >
      <Row gutter={24}>
        <Col span={12}>ahihi</Col>
        <Col span={12}>ahihi</Col>
      </Row>
    </Drawer>
  )
}
