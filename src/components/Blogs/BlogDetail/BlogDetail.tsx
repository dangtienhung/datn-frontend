import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import formatDate from '../../../utils/formatDate'
import './BlogDetail.scss'
import Loader from '../../Loader'

const BlogDetail = () => {
  const { state: blog } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!blog) navigate('/blogs')
  }, [])
  return (
    <>
      <Loader />
      <div className='layout-container'>
        <div className='blog-thum mb-5'>
          <img className='w-full object-cover' src={blog?.images[0].url} alt='' />
        </div>
        <div className='blog-title'>
          <h2 className={`text-[#333333] mb-6 text-[28px] page_title`}>{blog?.name || 'Không có tiêu đề'}</h2>
        </div>
        <div className='blog-date mb-8'>
          <span className='text-base italic'>Ngày đăng: {formatDate(blog?.createdAt) || 'Không rõ ngày đăng'}</span>
        </div>
        <div
          className='blog-content'
          dangerouslySetInnerHTML={{ __html: blog?.description || <p>Không có nội dung</p> }}
        ></div>
      </div>
    </>
  )
}

export default BlogDetail
