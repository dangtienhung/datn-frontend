import CategoryApi from '../../api/category'
import { ToppingAPI } from '../../api/topping'
import { useEffect, useRef, useState } from 'react'
import { BiMinus, BiPlusMedical } from 'react-icons/bi'
import {
  Form,
  Input,
  Modal,
  Select,
  Button as Butt,
  SelectProps,
  Space,
  UploadFile,
  message,
  InputNumber,
  Switch
} from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Upload, { UploadProps } from 'antd/es/upload'
import { useAddProductMutation, useUploadImagesProductMutation } from '../../api/Product'
import { toast } from 'react-toastify'
import convertToBase64 from '../../utils/convertBase64'
import { formatCurrency, formatNumberDigits } from '../../utils/formatCurrency'

interface ItemProps {
  label: string
  value: string
}

let options: ItemProps[] = []

const onChange = (value: number | string) => {
  console.log('changed', value)
}

const AddProductModal = ({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [getDataTopping] = ToppingAPI.endpoints.getAllTopping.useLazyQuery()
  const [getCategory, { data: DataCategory }] = CategoryApi.endpoints.getAllCategory.useLazyQuery()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [addProduct] = useAddProductMutation()
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [isPercent, setIsPercent] = useState(false)
  const [uploadImages] = useUploadImagesProductMutation()
  const selectOptions = useRef<ItemProps[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      sizes: [0].map(() => {
        return {
          name: '',
          price: ''
        }
      })
    })
    getDataTopping().then(({ data: { data } }: any) => {
      data.forEach((item: any) => {
        selectOptions.current.push({
          label: `${item.name}`,
          value: `${item._id}`
        })
        options = selectOptions.current
      })
    })
    getCategory()
    return () => {
      getCategory().unsubscribe()
      getDataTopping().unsubscribe()
    }
  }, [])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await convertToBase64(file.originFileObj!)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList)

  const uploadButton = (
    <div className='flex justify-center items-center flex-col'>
      <BiPlusMedical />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const selectProps: SelectProps = {
    mode: 'multiple',
    style: { width: '100%' },
    options,
    placeholder: 'Select Topping...',
    maxTagCount: 'responsive'
  }

  const handleOk = () => {
    form.submit()
  }

  const onResetSale = () => {
    form.setFieldsValue({
      sale: 0
    })
  }

  const getMin = (array: any) => {
    let min = formatNumberDigits(Number(array[0].price))
    for (let i = 1; i < array.length; i++) {
      min = min < formatNumberDigits(Number(array[0].price)) ? min : formatNumberDigits(Number(array[0].price))
    }
    return min
  }

  const handleCancel = () => {
    setIsOpen(false)
    form.resetFields()
    setFileList([])
  }

  const handleCancelImg = () => setPreviewOpen(false)

  const onFinish = (values: any) => {
    setConfirmLoading(true)
    const formData = new FormData()
    values?.images.forEach((file: any) => {
      formData.append('images', file.originFileObj)
    })
    uploadImages(formData).then(({ data }: any) => {
      const product = {
        ...values,
        sale: {
          value: values.sale,
          isPercent: isPercent
        },
        images: [...data.urls]
      }

      addProduct(product).then(() => {
        setConfirmLoading(false)
        setIsOpen(false)
        form.resetFields()
        toast.success('Thêm sản phẩm thành công!')
      })
    })
  }

  return (
    <>
      <Modal
        title='Add Product'
        open={isOpen}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        style={{ top: 20 }}
        width={900}
        footer={
          <Butt className='bg-blue-500 font-bold text-white' onClick={handleOk} loading={confirmLoading}>
            Sumit
          </Butt>
        }
      >
        <Form layout='vertical' form={form} onFinish={onFinish}>
          <div className='grid grid-cols-2 gap-3'>
            <Form.Item
              name='name'
              label='Product Name'
              rules={[
                {
                  required: true,
                  message: 'Tên sản phẩm không để trống!'
                },
                {
                  whitespace: true
                }
              ]}
              hasFeedback
            >
              <Input placeholder='Name...' />
            </Form.Item>
            <Form.Item
              name='category'
              label='Category'
              rules={[
                {
                  required: true,
                  message: 'Hãy chọn category'
                }
              ]}
              hasFeedback
            >
              <Select placeholder='Select category'>
                {DataCategory?.docs.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Size'>
              <Form.List
                name='sizes'
                rules={[
                  {
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject('Hãy nhập size!')
                      }
                      return Promise.resolve()
                    }
                  }
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    <div
                      id='scrollSize'
                      className='h-[200px] overflow-auto border-[1px] border-[#d9d9d9] rounded mb-1 p-2'
                    >
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', alignItems: 'center' }} align='center'>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Hãy nhập tên size!' }]}
                            hasFeedback
                          >
                            <Input placeholder='Size Name...' />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'price']}
                            rules={[
                              { required: true, message: 'Hãy nhập giá size!' },
                              {
                                validator(_, value) {
                                  if (value && value <= 0) {
                                    return Promise.reject('Giá size không hợp lệ!')
                                  }
                                  return Promise.resolve()
                                }
                              }
                            ]}
                            hasFeedback
                          >
                            <InputNumber
                              className='w-full'
                              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                              parser={(value: any) => value!.replace(/ \s?|(\.*)/g, '')}
                              placeholder='Price Size...'
                            />
                          </Form.Item>
                          <Form.Item className='cursor-pointer'>
                            <BiMinus onClick={() => remove(name)} />
                          </Form.Item>
                        </Space>
                      ))}
                    </div>
                    <Form.Item wrapperCol={{ span: 10 }}>
                      <Butt
                        type='dashed'
                        onClick={() => {
                          add()
                          const element = document.getElementById('scrollSize')!
                          element.scrollTop = element.scrollHeight
                        }}
                        block
                        icon={<BiPlusMedical />}
                      >
                        Add field
                      </Butt>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item>
              <Space.Compact
                block
                direction='horizontal'
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 5 }}
              >
                <Form.Item
                  name='sale'
                  label='Sale'
                  initialValue={0}
                  style={{ flex: 1 }}
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập giá sale!'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        console.log(formatNumberDigits(value))

                        if (!isPercent) {
                          if (value < 0) {
                            return Promise.reject('Giá sale không hợp lệ!')
                          } else if (value === 0) {
                            return Promise.resolve()
                          } else if (getFieldValue('sizes').length > 1) {
                            const min = formatNumberDigits(getMin(getFieldValue('sizes')))
                            return formatNumberDigits(value) > min * 0.7
                              ? Promise.reject('Sale không được lớn hơn 70% giá size nhỏ nhất')
                              : Promise.resolve()
                          } else if (
                            getFieldValue('sizes').length == 1 &&
                            formatNumberDigits(value) >
                              formatNumberDigits(Number(getFieldValue('sizes')[0]?.price)) * 0.7
                          ) {
                            return Promise.reject('Sale không được lớn hơn 70% giá size')
                          }
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                  // hasFeedback
                >
                  <InputNumber
                    addonAfter={isPercent ? '%' : 'VND'}
                    className='w-full'
                    placeholder='Sale...'
                    min={0}
                    max={isPercent ? 100 : ''}
                    formatter={(value) => (isPercent ? `${value}` : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.'))}
                    parser={(value: any) => (isPercent ? value!.replace('', '') : value!.replace(/ \s?|(\.*)/g, ''))}
                  />
                </Form.Item>
                <Switch
                  checked={isPercent}
                  checkedChildren='%'
                  unCheckedChildren='VND'
                  className='bg-red-500 font-bold'
                  onChange={() => {
                    onResetSale()
                    setIsPercent(!isPercent)
                  }}
                />
              </Space.Compact>
              <Form.Item
                name='toppings'
                label='Topping'
                rules={[
                  {
                    required: true,
                    message: 'Hãy chọn topping!'
                  }
                ]}
                hasFeedback
              >
                <Select {...selectProps} />
              </Form.Item>
            </Form.Item>
            {/* <Form.Item label='Size'>
              <Form.List
                name='sizes'
                rules={[
                  {
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject('Hãy nhập size!')
                      }
                      return Promise.resolve()
                    }
                  }
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    <div
                      id='scrollSize'
                      className='h-[200px] overflow-auto border-[1px] border-[#d9d9d9] rounded mb-1 p-2'
                    >
                      {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex' }} align='baseline'>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[{ required: true, message: 'Hãy nhập tên size!' }]}
                            hasFeedback
                          >
                            <Input placeholder='Size Name...' />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'price']}
                            rules={[
                              { required: true, message: 'Hãy nhập giá size!' },
                              {
                                validator(_, value) {
                                  if (value && value <= 0) {
                                    return Promise.reject('Giá size không hợp lệ!')
                                  }
                                  return Promise.resolve()
                                }
                              }
                            ]}
                            hasFeedback
                          >
                            <Input type='number' placeholder='Price Size...' />
                          </Form.Item>
                          <div className='cursor-pointer'>
                            <BiMinus onClick={() => remove(name)} />
                          </div>
                        </Space>
                      ))}
                    </div>
                    <Form.Item wrapperCol={{ span: 10 }}>
                      <Butt
                        type='dashed'
                        onClick={() => {
                          add()
                          const element = document.getElementById('scrollSize')!

                          element.scrollTo(0, element.scrollHeight)
                        }}
                        block
                        icon={<BiPlusMedical />}
                      >
                        Add field
                      </Butt>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item> */}
          </div>
          <Form.Item
            name='description'
            label='Product Detail'
            rules={[
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject('Hãy nhập Description!')
                  }
                  return Promise.resolve()
                }
              }
            ]}
            hasFeedback
          >
            <TextArea rows={6} />
          </Form.Item>
        </Form>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label='Profile Picture'
            name='images'
            valuePropName='fileList'
            getValueFromEvent={(event) => {
              return event?.fileList
            }}
            rules={[
              {
                validator(_, fileList) {
                  return new Promise((resolve, reject) => {
                    if (!fileList) {
                      reject('Hãy upload ảnh!')
                    } else {
                      resolve('')
                    }
                  })
                }
              }
            ]}
          >
            <Upload
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={(file) => {
                const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
                if (!isPNG) {
                  message.error(`${file.name} is not a png, jpg or jpeg file`)
                }
                return isPNG ? false : Upload.LIST_IGNORE
              }}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelImg}>
            <img
              alt='example'
              style={{
                width: '100%'
              }}
              src={previewImage}
            />
          </Modal>
        </Form>
      </Modal>
    </>
  )
}

export default AddProductModal
