import { Skeleton, Modal } from 'antd'
import { useGetAllVouchersQuery } from '../../api/voucher'
import { IVoucher } from '../../interfaces/voucher.type'
import style from './Voucher.module.scss'
import { BiDetail } from 'react-icons/bi'
import { useState } from 'react'
const MyVoucher = () => {
  const { data: vouchers, isLoading } = useGetAllVouchersQuery(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentDate = new Date()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <div>
      <h1 className='dark:text-white sm:text-2xl text-xl my-[10px] font-semibold text-gray-900'>Kho Mã Giảm Giá</h1>
      {isLoading ? (
        // <Loading />
        <Skeleton />
      ) : (
        <div className={`${style.allVoucher} grid grid-cols-2 gap-3`}>
          {vouchers &&
            vouchers?.data?.docs?.map((voucher: IVoucher) => {
              if (voucher.isActive) {
                const endDate = voucher?.endDate ? new Date(voucher?.endDate) : null
                const formattedEndDate = `${endDate?.getDate()}/${
                  endDate && endDate?.getMonth() + 1
                }/${endDate?.getFullYear()}`
                // const currentEndDate = new Date(voucher?.endDate)
                console.log('currentDate', currentDate, '/endDate', endDate)

                // console.log('Vhoucher',voucher.endDate, '  end Date/', endDate, '  new Date/', currentDate)
                // console.log('Vhoucher',voucher.endDate, '  formattedEndDate/', formattedEndDate, '  new Date/', currentDate)

                if (endDate > currentDate) {
                  return (
                    <div key={voucher._id} className='grid grid-cols-[1fr,2fr]'>
                      <div className={`${style.voucherItem}`}>
                        <img className='w-full max-w-[50px] mt-4' src='/logo_icon.png' alt='' />
                        <p className='text-[13px] mt-[-20px]'>TS Connect</p>
                      </div>
                      <div className='bg-[#87ACD9] rounded-[10px]'>
                        <div className='grid grid-cols-[3fr,1fr]'>
                          <div className='p-3 text-white'>
                            <h2>Giảm {voucher?.sale / 1000}K</h2>
                            <p>Cho đơn hàng từ 2 tỷ</p>
                          </div>
                          <div className='p-3 text-[#fff] text-right'>
                            <button onClick={showModal}>
                              <BiDetail />
                            </button>
                          </div>
                        </div>
                        <p className='px-4 pt-5 text-[13px] text-gray-600'>HSD: {formattedEndDate}</p>
                      </div>
                    </div>
                  )
                }
                return null
              }
            })}
        </div>
      )}
      <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  )
}

export default MyVoucher
