import { Button, Label, TextInput, Tooltip } from 'flowbite-react'

import AddProductModal from '../../../components/CrudProduct/addProduct'
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb'
import { DrawerAddProduct } from '../../../components'
import { FaPlus } from 'react-icons/fa'
import ProductsTable from '../../../components/CrudProduct/listProduct'
import { useState } from 'react'

const ProductsList = () => {
  const [isOpenModalAdd, setOpenModalAdd] = useState(false)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)

  return (
    <>
      <div className='dark:border-gray-700 dark:bg-gray-800 sm:flex items-center justify-between block p-4 bg-white border-b border-gray-200'>
        <div className='w-full mb-1'>
          <div className='mb-4'>
            <BreadCrumb />
            <h1 className='dark:text-white sm:text-2xl text-xl font-semibold text-gray-900'>Danh sách sản phẩm</h1>
          </div>
          <div className='sm:flex items-center block'>
            <SearchForProducts />

            <div className='sm:justify-end flex items-center w-full'>
              <Tooltip content='Thêm sản phẩm'>
                <Button color='primary' onClick={() => setOpenModalAdd(!isOpenModalAdd)}>
                  <FaPlus className='mr-3 text-sm' />
                  Thêm sản phẩm
                </Button>
              </Tooltip>

              {/* <DrawerAddProduct setIsOpenDrawer={setIsOpenDrawer} isOpenDrawer={isOpenDrawer} /> */}
              {isOpenModalAdd ? <AddProductModal isOpen={isOpenModalAdd} setIsOpen={setOpenModalAdd} /> : ''}
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>
              <ProductsTable />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const SearchForProducts = function () {
  return (
    <form className='sm:mb-0 sm:pr-3 mb-4' action='#' method='GET'>
      <Label htmlFor='products-search' className='sr-only'>
        Search
      </Label>
      <div className='lg:w-64 xl:w-96 relative mt-1'>
        <TextInput id='products-search' name='products-search' placeholder='Search for products' />
      </div>
    </form>
  )
}

// const AddProductModal = ({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   console.log('Con');

//   const [getDataTopping, { data: DataToping, isSuccess: SuccesTopping }] =
//     ToppingAPI.endpoints.getAllTopping.useLazyQuery();
//   const [getDataSize, { data: DataSize, isSuccess: SuccessSize }] =
//     SizeApi.endpoints.getAllSizes.useLazyQuery();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<ProductForm>({
//     mode: 'onSubmit',
//     resolver: yupResolver(ProductSchema),
//   });

//   const [urls, setUrl] = useState<IImage[]>([]);
//   const theme = useTheme();
//   const [toppingState, setToppingState] = useState<string[]>([]);
//   const [sizeState, setSizeState] = useState<string[]>([]);

//   const handleChangeTopping = (event: SelectChangeEvent<typeof toppingState>) => {
//     setValue('toppings', event.target.value as any, { shouldValidate: true });
//     const {
//       target: { value },
//     } = event;
//     setToppingState(typeof value === 'string' ? value.split(',') : value);
//   };

//   const handleChangeSize = (event: SelectChangeEvent<typeof sizeState>) => {
//     setValue('sizes', event.target.value as any, { shouldValidate: true });
//     const {
//       target: { value },
//     } = event;
//     setSizeState(typeof value === 'string' ? value.split(',') : value);
//   };

//   const onAddProduct = handleSubmit(async (data: any) => {
//     console.log(data);

//     setIsOpen(false);
//   });

//   useEffect(() => {
//     getDataTopping();
//     getDataSize();
//     console.log(DataSize);
//     console.log(DataToping);
//   }, [DataToping, DataSize]);

//   return (
//     <>
//       <Modal className="lg:pt-[440px]" onClose={() => setIsOpen(false)} show={isOpen}>
//         <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
//           <strong>Add product</strong>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="lg:grid-cols-2 grid gap-6">
//               <div>
//                 <Label htmlFor="productName">Product name</Label>
//                 <input type="text" {...register('name')} name="name" id="" />
//                 {/* <TextInput
//                   id="productName"
//                   placeholder="Product..."
//                   className="mt-1"
//                   {...register('name')}
//                   name="name"
//                 /> */}
//                 <span className="block my-2 text-sm text-red-500">
//                   {errors.name && errors.name.message}
//                 </span>
//               </div>
//               <div>
//                 <Label htmlFor="category">Category</Label>
//                 <Select
//                   className="mt-1"
//                   {...register('category')}
//                   name="category"
//                   // onChange={(e) => console.log(e.target.value)}
//                 >
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                 </Select>
//               </div>
//               <div>
//                 <Label htmlFor="brand">Topping</Label>
//                 <SelectMui
//                   className="w-full mt-1"
//                   labelId="demo-multiple-chip-label"
//                   id="demo-multiple-chip"
//                   multiple
//                   value={toppingState}
//                   input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//                   renderValue={(selected) => (
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                       {selected.map((value) => (
//                         <Chip key={value} label={value} />
//                       ))}
//                     </Box>
//                   )}
//                   MenuProps={MenuProps}
//                   {...register('toppings')}
//                   name="toppings"
//                   onChange={handleChangeTopping}
//                 >
//                   {DataToping?.data.map((topping) => (
//                     <MenuItem
//                       key={topping._id}
//                       value={topping.name}
//                       style={getStyles(topping.name, toppingState, theme)}
//                     >
//                       {topping.name}
//                     </MenuItem>
//                   ))}
//                 </SelectMui>
//                 <span className="block my-2 text-sm text-red-500">
//                   {errors.toppings && errors.toppings.message}
//                 </span>
//               </div>
//               <div>
//                 <Label htmlFor="brand">Size</Label>
//                 <SelectMui
//                   className="w-full mt-1"
//                   labelId="demo-multiple-chip-label"
//                   id="demo-multiple-chip"
//                   multiple
//                   value={sizeState}
//                   input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//                   renderValue={(selected) => (
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                       {selected.map((value) => (
//                         <Chip key={value} label={value} />
//                       ))}
//                     </Box>
//                   )}
//                   MenuProps={MenuProps}
//                   {...register('sizes')}
//                   name="sizes"
//                   onChange={handleChangeSize}
//                 >
//                   {DataSize?.docs.map((size) => (
//                     <MenuItem
//                       key={size._id}
//                       value={size.name}
//                       style={getStyles(size.name, sizeState, theme)}
//                     >
//                       {size.name}
//                     </MenuItem>
//                   ))}
//                 </SelectMui>
//                 <span className="block my-2 text-sm text-red-500">
//                   {errors.sizes && errors.sizes.message}
//                 </span>
//               </div>
//               <div>
//                 <Label htmlFor="price">Price</Label>
//                 <TextInput
//                   id="price"
//                   type="number"
//                   placeholder="Price..."
//                   className="mt-1"
//                   {...register('price')}
//                   name="price"
//                 />
//                 <span className="block my-2 text-sm text-red-500">
//                   {errors.price && errors.price.message}
//                 </span>
//               </div>
//               <div>
//                 <Label htmlFor="price">Sale</Label>
//                 <TextInput
//                   id="price"
//                   type="number"
//                   placeholder="Sale..."
//                   className="mt-1"
//                   {...register('sale')}
//                   name="sale"
//                   defaultValue={0}
//                 />
//                 <span className="block my-2 text-sm text-red-500">
//                   {errors.sale && errors.sale.message}
//                 </span>
//               </div>
//               <div className="lg:col-span-2">
//                 <Label htmlFor="producTable.Celletails">Product details</Label>
//                 <Textarea
//                   id="producTable.Celletails"
//                   placeholder="Description..."
//                   rows={6}
//                   className="mt-1"
//                   {...register('description')}
//                   name="description"
//                 />
//                 <span className="block my-2 text-sm text-red-500">
//                   {errors.description && errors.description.message}
//                 </span>
//               </div>
//             </div>
//             <BoxUpload urls={urls} setUrl={setUrl} />
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button color="primary" onClick={onAddProduct}>
//             Add product
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// const EditProductModal: FC = function () {
//   const [isOpen, setOpen] = useState(false);

//   return (
//     <>
//       <Button color="primary" onClick={() => setOpen(!isOpen)}>
//         <HiPencilAlt className="mr-2 text-lg" />
//         Edit item
//       </Button>
//       <Modal onClose={() => setOpen(false)} show={isOpen}>
//         <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
//           <strong>Edit product</strong>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="lg:grid-cols-2 grid grid-cols-1 gap-6">
//               <div>
//                 <Label htmlFor="productName">Product name</Label>
//                 <TextInput
//                   id="productName"
//                   name="productName"
//                   placeholder='Apple iMac 27"'
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="category">Category</Label>
//                 <TextInput
//                   id="category"
//                   name="category"
//                   placeholder="Electronics"
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="brand">Brand</Label>
//                 <TextInput id="brand" name="brand" placeholder="Apple" className="mt-1" />
//               </div>
//               <div>
//                 <Label htmlFor="price">Price</Label>
//                 <TextInput
//                   id="price"
//                   name="price"
//                   type="number"
//                   placeholder="$2300"
//                   className="mt-1"
//                 />
//               </div>
//               {/* <div className="lg:col-span-2">
//                 <Label htmlFor="productDetails">Product details</Label>
//                 <Textarea
//                   id="productDetails"
//                   name="productDetails"
//                   placeholder="e.g. 3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz, Ram 16 GB DDR4 2300Mhz"
//                   rows={6}
//                   className="mt-1"
//                 />
//               </div> */}
//               <div className="flex space-x-5">
//                 <div>
//                   <img
//                     alt="Apple iMac 1"
//                     src="/images/products/apple-imac-1.png"
//                     className="h-24"
//                   />
//                   <a href="#" className="cursor-pointer">
//                     <span className="sr-only">Delete</span>
//                     <HiTrash className="-mt-5 text-2xl text-red-600" />
//                   </a>
//                 </div>
//                 <div>
//                   <img
//                     alt="Apple iMac 2"
//                     src="/images/products/apple-imac-2.png"
//                     className="h-24"
//                   />
//                   <a href="#" className="cursor-pointer">
//                     <span className="sr-only">Delete</span>
//                     <HiTrash className="-mt-5 text-2xl text-red-600" />
//                   </a>
//                 </div>
//                 <div>
//                   <img
//                     alt="Apple iMac 3"
//                     src="/images/products/apple-imac-3.png"
//                     className="h-24"
//                   />
//                   <a href="#" className="cursor-pointer">
//                     <span className="sr-only">Delete</span>
//                     <HiTrash className="-mt-5 text-2xl text-red-600" />
//                   </a>
//                 </div>
//               </div>
//               <div className="lg:col-span-2">
//                 <div className="flex items-center justify-center w-full">
//                   <label className="hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700 flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded cursor-pointer">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <HiUpload className="text-4xl text-gray-300" />
//                       <p className="dark:text-gray-500 py-1 text-sm text-gray-600">
//                         Upload a file or drag and drop
//                       </p>
//                       <p className="dark:text-gray-400 text-xs text-gray-500">
//                         PNG, JPG, GIF up to 10MB
//                       </p>
//                     </div>
//                     <input type="file" className="hidden" />
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button color="primary" onClick={() => setOpen(false)}>
//             Save all
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// const ProductsTable: FC = function () {
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     dispatch(getAllProducts());
//   }, [dispatch]);

//   return (
//     <Table className="dark:divide-gray-600 min-w-full divide-y divide-gray-200">
//       <Table.Head className="dark:bg-gray-700 bg-gray-100">
//         <Table.HeadCell>
//           <span className="sr-only">Toggle selected</span>
//           <Checkbox />
//         </Table.HeadCell>
//         <Table.HeadCell>ID</Table.HeadCell>
//         <Table.HeadCell>Product Name</Table.HeadCell>
//         <Table.HeadCell>Images</Table.HeadCell>
//         <Table.HeadCell>Technology</Table.HeadCell>
//         <Table.HeadCell>Price</Table.HeadCell>
//         <Table.HeadCell>Actions</Table.HeadCell>
//       </Table.Head>
//       <Table.Body className="dark:divide-gray-700 dark:bg-gray-800 bg-white divide-y divide-gray-200">
//         {[0, 1, 2, 4, 5, 6, 7, 8, 9, 10]?.map((_, index: number) => (
//           <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
//             <Table.Cell className="w-4 p-4">
//               <Checkbox />
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900">
//               #194556
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap dark:text-gray-400 p-4 text-sm font-normal text-gray-500">
//               <div className="dark:text-white text-base font-semibold text-gray-900">
//                 Education Dashboard
//               </div>
//               <div className="dark:text-gray-400 text-sm font-normal text-gray-500">
//                 Html templates
//               </div>
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900">
//               Images
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900">
//               Angular
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap dark:text-white p-4 text-base font-medium text-gray-900">
//               $149
//             </Table.Cell>
//             <Table.Cell className="whitespace-nowrap p-4 space-x-2">
//               <div className="gap-x-3 flex items-center">
//                 <EditProductModal />
//                 <Button color="failure">
//                   <HiTrash className="mr-2 text-lg" />
//                   Delete item
//                 </Button>
//               </div>
//             </Table.Cell>
//           </Table.Row>
//         ))}
//       </Table.Body>
//     </Table>
//   );
// };

export default ProductsList
