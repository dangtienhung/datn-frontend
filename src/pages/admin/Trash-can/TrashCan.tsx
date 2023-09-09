import { Tabs } from 'flowbite-react'
import { HiShoppingBag } from 'react-icons/hi'

const TrashCan = () => {
  return (
    <div className='p-2'>
      <Tabs.Group>
        <Tabs.Item title='Products' icon={HiShoppingBag}>
          Products
        </Tabs.Item>
        <Tabs.Item title='users' icon={HiShoppingBag}>
          Users
        </Tabs.Item>
      </Tabs.Group>
    </div>
  )
}

export default TrashCan
