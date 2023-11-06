import { useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaBell } from 'react-icons/fa'
import { Tooltip, Popover } from 'antd'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store/hooks'
import useQueryConfig from '../../hook/useQueryConfig'
import { getAllProducts } from '../../store/services/product.service'
import { useForm } from 'react-hook-form'
import { RoleSchema } from '../../validate/Form'
import { yupResolver } from '@hookform/resolvers/yup'
import './Header.scss'

const Header = () => {
  const dispatch = useAppDispatch()
  const queryConfig = useQueryConfig()

  const { user } = useSelector((state: RootState) => state.persistedReducer.auth)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(RoleSchema)
  })

  const navigate = useNavigate()

  const onSubmitSearch = handleSubmit((data: { name: string }) => {
    navigate({
      pathname: '/products',
      search: createSearchParams({
        ...queryConfig,
        searchName: data.name
      }).toString()
    })
  })
  useEffect(() => {
    dispatch(
      getAllProducts({
        page: queryConfig._page,
        limit: queryConfig.limit,
        query: queryConfig.searchName,
        category: queryConfig.c == 'all' ? '' : queryConfig.c
      })
    )
  }, [dispatch, queryConfig._page, queryConfig.c, queryConfig.limit, queryConfig.searchName])

  return (
    <div className='header flex items-center justify-between gap-2 px-4 py-2 select-none sticky top-0 w-full bg-white z-10'>
      <div className='logo lg:block hidden'>
        <Link to={'/'}>
          <img src='/logo_removebg.png' alt='' className='object-cover w-10 h-10' />
        </Link>
      </div>
      <form onSubmit={onSubmitSearch} className='search lg:flex items-center justify-center w-full'>
        <div>
          <input
            className=' p-0 outline-none px-2 block focus:bg-gray-50 w-full bg-[#fbfbfb] h-[32px] text-[14px] rounded-2xl focus:outline-none border-none placeholder: pl-9 lg:mx-auto lg:w-[35rem] border focus:ring-0'
            placeholder='Tìm kiếm sản phẩm...'
            {...register('name')}
            autoFocus={true}
            autoComplete='off'
          />

          <AiOutlineSearch className='text-xl ml-2 text-[#bebec2] absolute top-[18px] z-40' />
        </div>
      </form>
      {user?.avatar ? (
        <div className='flex items-center gap-x-5'>
          <Tooltip title='Thông báo' arrow={false} zIndex={11}>
            <Popover
              className='cursor-pointer'
              title='Thông báo'
              placement='bottomRight'
              trigger='click'
              content={
                <>
                  {[1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15].map((_, index) => (
                    <div key={index} className='py-2 px-2 group hover:bg-[#d3b673] rounded'>
                      <a
                        className='group-hover:!text-white'
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://www.aliyun.com'
                      >
                        Đơn hàng "ABCXYZ" của bạn đã được xác nhận
                      </a>
                    </div>
                  ))}
                </>
              }
            >
              <div className='relative'>
                <span className='absolute left-2 -top-[6px] bg-red-600 text-white text-xs rounded-full w-max h-[15px] px-1 flex items-center justify-center'>
                  <span>99+</span>
                </span>
                <FaBell className='text-xl' />
              </div>
            </Popover>
          </Tooltip>
          <Tooltip title='Tài khoản' arrow={false}>
            <Link to='/account-layout'>
              <img className='w-9 h-9 rounded-full mr-[8px] object-cover ' src={user?.avatar} alt='' />
            </Link>
          </Tooltip>
        </div>
      ) : (
        <div className='text-sm px-[15px] py-[6px] bg-[#d8b979] text-white text-center rounded-3xl'>
          <Link to='/signin' className='w-max block'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
