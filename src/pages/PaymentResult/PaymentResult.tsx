import { Button, Result } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import ConFetti from 'react-confetti'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getAllProducts } from '../../store/services/product.service'
import { RootState } from '../../store/store'
import NewProductItem from '../../components/New-ProductItem'
import { IProduct } from '../../interfaces/products.type'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { useBillingPaymentQuery } from '../../api/paymentstripe'
import { ClientSocket } from '../../socket'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../../store/slices/order'
import { resetAllCart } from '../../store/slices/cart.slice'
import { IOrderCheckout } from '../../store/slices/types/order.type'
import { arrTotal } from '../../store/slices/types/cart.type'

interface Payload extends JwtPayload {
  noteOrder?: string
  noteShipping?: string
}

const PaymentResult = () => {
  const [second, _] = useState<number>(5)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const dataCartCheckout = useAppSelector((state) => state.persistedReducer.cart)
  const navigate = useNavigate()
  // const { state } = useLocation()
  const dispatch = useAppDispatch()
  const { data } = useBillingPaymentQuery()
  const [orderAPIFn] = useCreateOrderMutation()
  const { auth, products } = useAppSelector((state: RootState) => {
    return state.persistedReducer
  })
  const [searchParams] = useSearchParams()

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth)
  }

  const getData = useCallback(
    (getData: string) => {
      const arrTotal: arrTotal[] = []
      const arrTotalNumbers: number[] = []
      dataCartCheckout.items.map((item) =>
        item.items.map((data) => {
          if (getData == 'list') {
            console.log(item)

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { total, _id, ...rest } = data
            arrTotal.push({ ...rest, name: item.name })
          } else {
            let value: number | undefined
            if (getData === 'quantity') {
              value = data.quantity
            } else if (getData === 'total') {
              value = data.total
            }

            if (value !== undefined) {
              arrTotalNumbers.push(value)
            }
          }
        })
      )
      return getData == 'list' ? arrTotal : arrTotalNumbers
    },
    [dataCartCheckout.items]
  )

  useEffect(() => {
    dispatch(getAllProducts({}))
  }, [dispatch])

  useEffect(() => {
    if (!searchParams.get('encode') && !searchParams.get('userId')) {
      navigate('/')
    }
    const date = new Date()
    if (searchParams.get('expire')) {
      if (Number(searchParams.get('expire')) < date.getTime() / 1000) {
        navigate(-1)
      } else {
        const orderVnpay: IOrderCheckout = {
          user:
            (searchParams.get('userId') as string) === 'undefined' ? undefined : (searchParams.get('userId') as string),
          items: getData('list'),
          payment_vnpay: searchParams.get('vnp_SecureHash') as string,
          total: Number(searchParams.get('total')),
          priceShipping: Number(searchParams.get('priceShipping')),
          noteOrder: searchParams.get('noteOrder') as string,
          paymentMethodId: 'vnpay',
          inforOrderShipping: {
            name: searchParams.get('name') as string,
            phone: searchParams.get('phone') as string,
            address: searchParams.get('address') as string,
            noteShipping: searchParams.get('noteShipping') as string
          }
        }

        orderAPIFn(orderVnpay)
          .unwrap()
          .then((res) => {
            console.log(res)
            if (res.error) {
              return toast.error('Xin lỗi đã có vấn đề về đặt hàng của bạn' + res.error.data.error)
            } else {
              dispatch(resetAllCart())
              ClientSocket.createOrder(res.order.orderNew.user)
            }
          })
      }
    }

    let decodedToken: Payload = {}

    if (searchParams.get('encode')) {
      decodedToken = jwtDecode(searchParams.get('encode')!)
      if (decodedToken.exp && decodedToken.exp < date.getTime() / 1000) {
        navigate('/')
      } else {
        if (data) {
          orderAPIFn(data.invoice)
            .unwrap()
            .then((res) => {
              console.log(res)
              if (res.error) {
                return toast.error('Xin lỗi đã có vấn đề về đặt hàng của bạn' + res.error.data.error)
              } else {
                dispatch(resetAllCart())
                ClientSocket.createOrder(res.order.orderNew.user)
              }
            })
        }
      }
    }

    window.onresize = () => handleWindowResize()
    // if (decodedToken.exp && decodedToken.exp < date.getTime() / 1000) {
    //   navigate('/')
    // }
    // if (!state || (decodedToken.exp && decodedToken.exp < date.getTime() / 1000)) {
    //   navigate(-1)
    // }
    // const intervalId = setInterval(() => {
    //   if (second === 0) return
    //   setSecond((prev) => prev - 1)
    // }, 1000)

    // return () => clearInterval(intervalId)
  }, [second, windowWidth, data])

  return (
    <>
      <div className='min-h-[100vh] overflow-hidden'>
        <ConFetti
          className={`transition-opacity duration-1000 pointer-events-none ${second <= 0 ? 'opacity-0 ' : ''}`}
          width={windowWidth}
          height={window.innerHeight}
        />
        <div className='mt-20'>
          <div className='my-0 mx-auto bg-white rounded-lg'>
            <div className='flex justify-center items-center'>
              <Result
                className='bg-white  shadow-lg rounded-xl w-[calc(100%-20px)] md:w-max'
                status='success'
                title='Chúc mừng bạn đã đặt hàng thành công 🎉'
                subTitle='Đơn hàng đang được xử lý.Quá trình này sẽ mất 1 chút thời gian,bạn vui lòng đợi nhé!'
                extra={[
                  auth && auth.user.accessToken && (
                    <Button
                      size='large'
                      className='bg-[#D8B979] hover:!bg-transparent hover:!text-[#D8B979] hover:border-[#D8B979]'
                      type='primary'
                      key='console'
                      onClick={() => navigate('/account-layout/my-order')}
                    >
                      Xem đơn hàng
                    </Button>
                  ),
                  <Button
                    size='large'
                    key='buy'
                    className='hover:!bg-transparent hover:!text-[#D8B979] hover:!border-[#D8B979]'
                    onClick={() => navigate('/products')}
                  >
                    Tiếp tục mua hàng
                  </Button>
                ]}
              />
            </div>

            <div className='suggest-products mt-20 max-w-[1140px] mx-auto'>
              <div className='title flex flex-col items-center'>
                <div className='sub-title'>
                  <h4 className='text-[#d3b673] text-[22px] mb-[5px] font-bold '>MilkTea Menu</h4>
                </div>
                <div className='main-title'>
                  <h2 className='text-3xl md:text-4xl text-center text-black px-[50px] uppercase font-bold mb-2'>
                    Có thể bạn sẽ thích
                  </h2>
                </div>
                <div className='bg_title'></div>
              </div>
              <div className='list mt-[50px] flex flex-wrap '>
                {products.products &&
                  products.products?.docs?.length > 0 &&
                  products.products?.docs
                    .slice(0, 4)
                    ?.map((product: IProduct) => <NewProductItem key={product._id} product={product} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentResult
