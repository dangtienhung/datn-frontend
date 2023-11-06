import { Avatar, Button, Card } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useGetAllBlogsQuery } from '../../../api/NewBlogs'
import './New.module.scss'
import ReactHtmlParser from 'html-react-parser'
const { Meta } = Card

const News = () => {
  const navigate = useNavigate()
  const { data: dataBlog } = useGetAllBlogsQuery()

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[30px] my-[30px]'>
        {dataBlog?.docs?.map((item) => (
          <Card
            onClick={() => navigate(`/blogs/${item._id}`, { state: item })}
            key={item._id}
            hoverable
            className='w-[calc(50% - 8px)] bg-[#f5f5f5] hover:bg-[#fff]'
            cover={
              <img
                className='w-full max-h-[200px] object-cover'
                alt={item.images[0].filename}
                src={item.images[0].url}
              />
            }
            // actions={[
            //   <Link to={'#'} className='text-left ml-3'>
            //     <Button className=''>Xem thêm</Button>
            //   </Link>
            // ]}
          >
            <Meta
              className='custom-title  mb-5'
              avatar={<Avatar src='/logo_icon.png' />}
              title={item.name}
              description={ReactHtmlParser(
                item.description.length > 101 ? item.description.slice(0, 101) + '[...]' : item.description
              )}
            />
            <Link to={'#'} className='text-left '>
              <Button className='mt-[25px] hover:!text-[#d3b673] hover:bg-transparent hover:!border-[#d3b673]  text-[#fff] bg-[#d3b673]'>
                Xem thêm
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </>
  )
}

export default News
