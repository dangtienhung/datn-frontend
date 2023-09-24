import { Button, Tooltip } from 'flowbite-react'
import { IProduct } from '../../interfaces/products.type'
import { BiEditAlt } from 'react-icons/bi'
import { memo, useEffect, useState } from 'react'
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
import { useAddProductMutation, useUpdateProductMutation, useUploadImagesProductMutation } from '../../api/Product'
import { ToppingAPI } from '../../api/topping'
import CategoryApi from '../../api/category'
import { toast } from 'react-toastify'
import convertToBase64 from '../../utils/convertBase64'
import { formatNumberDigits } from '../../utils/formatCurrency'

interface ItemProps {
  label: string
  value: string
}

interface CustomUploadFile extends UploadFile {
  _id?: string
  publicId: string
}

const options: ItemProps[] = []

const EditProductModal = ({ DataEdit }: { DataEdit: IProduct }) => {
  const [getDataTopping] = ToppingAPI.endpoints.getAllTopping.useLazyQuery()
  const [getCategory, { data: DataCategory }] = CategoryApi.endpoints.getAllCategory.useLazyQuery()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<CustomUploadFile[]>(
    DataEdit.images.map((item) => {
      return {
        uid: `${item._id}`,
        percent: 50,
        name: `${item.filename}`,
        status: 'done',
        url: `${item.url}`,
        thumbUrl: `${item.url}`,
        publicId: item.publicId
      }
    })
  )
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [uploadImages] = useUploadImagesProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const [isPercent, setIsPercent] = useState(DataEdit.sale.isPercent)
  const [form] = Form.useForm()

  const fillForm = ({ DataEdit }: { DataEdit: IProduct }) => {
    const { name, category, description, toppings, sale, sizes } = DataEdit
    form.setFieldsValue({
      name: name,
      category: category._id,
      toppings: toppings.map((item) => item._id),
      sale: sale.value,
      description: description,
      sizes: sizes.map((item) => {
        return {
          name: item.name,
          price: item.price
        }
      })
    })
  }

  useEffect(() => {
    getDataTopping().then(({ data: { data } }: any) => {
      if (options.length == 0) {
        data.forEach((item: { name: string; _id: string }) => {
          options.push({
            label: `${item.name}`,
            value: `${item._id}`
          })
        })
      }
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
    setPreviewTitle(file.name || (file.url ?? '').substring((file.url ?? '').lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList([...newFileList] as CustomUploadFile[])

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

  const showModal = () => {
    fillForm({ DataEdit })
    setFileList(
      DataEdit.images.map((item) => {
        return {
          uid: `${item._id}`,
          percent: 50,
          name: `${item.filename}`,
          status: 'done',
          url: `${item.url}`,
          thumbUrl: `${item.url}`,
          publicId: item.publicId
        }
      })
    )
    setOpen(true)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleCancelImg = () => setPreviewOpen(false)

  const onResetSale = () => {
    form.setFieldsValue({
      sale: 0
    })
  }

  const getMin = (array: any) => {
    let min = Number(array[0].price)
    for (let i = 1; i < array.length; i++) {
      min = min < Number(array[i].price) ? min : Number(array[i].price)
    }
    return min
  }

  const onFinish = (values: any) => {
    setConfirmLoading(true)

    const formData = new FormData()
    const existImg = fileList
      .filter((item) => {
        return item.publicId ? item : ''
      })
      .map((item) => {
        if (item.publicId) {
          return {
            filename: item.name,
            publicId: item.publicId,
            url: item.url,
            _id: item.uid
          }
        }
      })

    let product = {
      _id: DataEdit._id,
      ...values,
      sale: {
        value: values.sale,
        isPercent: isPercent
      },
      images: [...existImg]
    }

    if (!values.images) {
      updateProduct(product).then((data: any) => {
        if (data.error) {
          setConfirmLoading(false)
          toast.error(data.error.data.err?.[0])
        } else {
          setOpen(false)
          setConfirmLoading(false)
          toast.success('Cập nhật sản phẩm thành công!')
        }
      })
    } else if (values.images.length > 0) {
      let check = false
      values?.images.forEach((file: any) => {
        if (file.originFileObj) {
          check = true
          formData.append('images', file.originFileObj)
        }
      })
      if (check) {
        uploadImages(formData).then(({ data }: any) => {
          product = {
            _id: DataEdit._id,
            ...values,
            images: [...existImg, ...data?.urls]
          }
          updateProduct(product).then((data: any) => {
            if (data.error) {
              toast.error(data.error.data.err?.[0])
            } else {
              setOpen(false)
              setConfirmLoading(false)
              toast.success('Cập nhật sản phẩm thành công!')
            }
          })
        })
      } else {
        updateProduct(product).then((data: any) => {
          if (data.error) {
            toast.error(data.error.data.err?.[0])
          } else {
            setOpen(false)
            setConfirmLoading(false)
            toast.success('Cập nhật sản phẩm thành công!')
          }
        })
      }
    }
  }

  return (
    <>
      <Tooltip content='Chỉnh sửa sản phẩm'>
        <Button color='primary' onClick={showModal}>
          <BiEditAlt className='text-sm' />
        </Button>
      </Tooltip>
      <Modal
        title='Edit Product'
        open={open}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        style={{ top: 20 }}
        width={900}
        footer={
          <Butt className='bg-blue-500 font-bold text-white' onClick={handleOk} loading={confirmLoading}>
            Submit
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
            >
              <Input className='rounded-[5px] h-[32.45px] border-[#d9d9d9]' placeholder='Name...' />
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
                      {fields.map(({ key, name, ...restField }) => {
                        return (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                            <Form.Item
                              {...restField}
                              name={[name, 'name']}
                              rules={[{ required: true, message: 'Hãy nhập tên size!' }]}
                            >
                              <Input
                                className='rounded-[5px] h-[32.45px] border-[#d9d9d9]'
                                placeholder='Size Name...'
                              />
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
                            >
                              <InputNumber
                                className='w-full'
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                parser={(value: any) => value!.replace(/ \s?|(\.*)/g, '')}
                                placeholder='Price Size...'
                              />
                            </Form.Item>
                            <div className='cursor-pointer'>
                              <BiMinus onClick={() => remove(name)} />
                            </div>
                          </Space>
                        )
                      })}
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
          >
            <TextArea rows={6} />
          </Form.Item>
        </Form>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label='Picture'
            name='images'
            valuePropName='files'
            getValueFromEvent={(event) => {
              return event?.fileList
            }}
            rules={[
              {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                validator() {
                  return new Promise((resolve, reject) => {
                    if (fileList.length <= 0) {
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
              defaultFileList={fileList}
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

export default memo(EditProductModal)
