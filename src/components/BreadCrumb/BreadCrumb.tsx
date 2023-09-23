// import { useLocation } from 'react-router-dom'

import { Breadcrumb } from 'antd'

const BreadCrumb = () => {
  // const location = useLocation()
  // const breadCrumbItem = location.pathname.split('/').filter(Boolean)

  return (
    // <Breadcrumb className='mb-4'>
    //   <HiHome className='text-xl mr-[7px]' />
    //   {breadCrumbItem?.map((item, index) => (
    //     <Breadcrumb.Item key={index} className='capitalize  font-[600] da'>
    //       <Link to={`/${breadCrumbItem.slice(0, index + 1).join('/')}`}>{item}</Link>
    //     </Breadcrumb.Item>
    //   ))}
    // </Breadcrumb>
    <Breadcrumb
      items={[
        {
          title: 'Home'
        },
        {
          title: <a href=''>Application Center</a>
        },
        {
          title: <a href=''>Application List</a>
        },
        {
          title: 'An Application'
        }
      ]}
    />
  )
}

export default BreadCrumb
