import { yupResolver } from '@hookform/resolvers/yup';
import SizeApi from '../../api/size';
import { ToppingAPI } from '../../api/topping';
import { ProductForm, ProductSchema } from '../../validate/Form';
import { useForm } from 'react-hook-form';
import { memo, useEffect, useMemo, useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { IImage } from '../../interfaces/image.type';
import SelectMui, { SelectChangeEvent } from '@mui/material/Select';
import {
  Box,
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import BoxUpload from '../Upload/index';
import Modal from '@mui/material/Modal';
import CategoryApi from '../../api/category';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../api/Product';
import { IProduct } from '../../interfaces/products.type';
import { BiEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const EditProductModal = ({ DataEdit }: { DataEdit: IProduct }) => {
  const methods = useForm<ProductForm>({
    mode: 'onChange',
    resolver: yupResolver(ProductSchema),
    defaultValues: {
      name: DataEdit.name,
      price: DataEdit.price,
      sale: DataEdit.sale,
      description: DataEdit.description,
      toppings: DataEdit.toppings.map((item) => item._id!),
      sizes: DataEdit.sizes.map((item) => item._id!),
    } as any,
  });

  // console.log(DataEdit.toppings.map((item) => item._id as any));

  const [isOpen, setIsOpen] = useState(false);

  const [getDataTopping, { data: DataToping }] = ToppingAPI.endpoints.getAllTopping.useLazyQuery();
  const [getDataSize, { data: DataSize }] = SizeApi.endpoints.getAllSizes.useLazyQuery();
  const [getCategory, { data: DataCategory }] = CategoryApi.endpoints.getAllCategory.useLazyQuery();

  const [updateProduct, { isSuccess }] = useUpdateProductMutation();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useMemo(() => methods, [methods]);

  const [urls, setUrl] = useState<IImage[]>([]);
  const theme = useTheme();
  const [toppingState, setToppingState] = useState<string[]>([]);
  const [sizeState, setSizeState] = useState<string[]>([]);

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleChangeTopping = (event: SelectChangeEvent<typeof toppingState>) => {
    setValue('toppings', event.target.value as any, { shouldValidate: true });
    const {
      target: { value },
    } = event;

    setToppingState(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeSize = (event: SelectChangeEvent<typeof sizeState>) => {
    setValue('sizes', event.target.value as any, { shouldValidate: true });
    const {
      target: { value },
    } = event;
    setSizeState(typeof value === 'string' ? value.split(',') : value);
  };

  const onAddProduct = handleSubmit((data: any) => {
    if (data) {
      const DataPost =
        urls.length > 0
          ? { _id: DataEdit._id, ...data, images: [...urls] }
          : { _id: DataEdit._id, ...data, images: [...DataEdit.images] };
      console.log(DataPost);

      updateProduct(DataPost).then((data: any) => {
        data.error ? toast.error(data.error.data.err[0]) : setIsOpen(false);
      });
    }
  });

  useEffect(() => {
    getDataTopping();
    getDataSize();
    getCategory();
    setToppingState(DataEdit.toppings.map((item) => item._id!));
    setSizeState(DataEdit.sizes.map((item) => item._id!));
  }, [DataCategory]);

  return (
    <div>
      <Button color="primary" onClick={() => setIsOpen(true)}>
        <BiEditAlt className="mr-3 text-sm" />
        Edit product
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="h-full overflow-y-auto no-scrollbar"
      >
        <Box
          sx={{
            width: '50rem',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <Typography className="p-6 bg-[#e2e8f0]" variant="h5" component="h3">
            Edit Product
          </Typography>
          <form autoComplete="off">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <Label htmlFor="productName">Product name</Label>
                <TextInput
                  id="productName"
                  placeholder="Product..."
                  className="mt-1"
                  {...register('name')}
                  name="name"
                />
                <span className="text-red-500 text-sm block my-2">
                  {errors.name && errors.name.message}
                </span>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  labelId="demo-simple-select-label"
                  defaultValue={DataEdit.category._id}
                  id="demo-simple-select"
                  label="Age"
                  className="w-full h-[42px] mt-1"
                  {...register('category')}
                  name="category"
                >
                  {DataCategory?.docs.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <span className="text-red-500 text-sm block my-2">
                  {errors.category && errors.category.message}
                </span>
              </div>
              <div>
                <Label htmlFor="brand">Topping</Label>
                <SelectMui
                  className="w-full mt-1"
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={toppingState}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={DataToping?.data.find((item) => item._id === value)?.name}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  {...register('toppings')}
                  name="toppings"
                  onChange={handleChangeTopping}
                >
                  {DataToping?.data.map((topping) => (
                    <MenuItem
                      key={topping._id}
                      value={topping._id}
                      style={getStyles(topping.name, toppingState, theme)}
                    >
                      {topping.name}
                    </MenuItem>
                  ))}
                </SelectMui>
                <span className="text-red-500 text-sm block my-2">
                  {errors.toppings && errors.toppings.message}
                </span>
              </div>
              <div>
                <Label htmlFor="brand">Size</Label>
                <SelectMui
                  className="w-full mt-1"
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={sizeState}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={DataSize?.docs.find((item) => item._id === value)?.name}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                  {...register('sizes')}
                  name="sizes"
                  onChange={handleChangeSize}
                >
                  {DataSize?.docs.map((size) => (
                    <MenuItem
                      key={size._id}
                      value={size._id}
                      style={getStyles(size.name, sizeState, theme)}
                    >
                      {size.name}
                    </MenuItem>
                  ))}
                </SelectMui>
                <span className="text-red-500 text-sm block my-2">
                  {errors.sizes && errors.sizes.message}
                </span>
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  type="number"
                  placeholder="Price..."
                  className="mt-1"
                  {...register('price')}
                  name="price"
                />
                <span className="text-red-500 text-sm block my-2">
                  {errors.price && errors.price.message}
                </span>
              </div>
              <div>
                <Label htmlFor="price">Sale</Label>
                <TextInput
                  id="price"
                  type="number"
                  placeholder="Sale..."
                  className="mt-1"
                  {...register('sale')}
                  name="sale"
                  defaultValue={0}
                />
                <span className="text-red-500 text-sm block my-2">
                  {errors.sale && errors.sale.message}
                </span>
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="producTable.Celletails">Product details</Label>
                <Textarea
                  id="producTable.Celletails"
                  placeholder="Description..."
                  rows={6}
                  className="mt-1"
                  {...register('description')}
                  name="description"
                />
                <span className="text-red-500 text-sm block my-2">
                  {errors.description && errors.description.message}
                </span>
              </div>
            </div>
            <BoxUpload
              urls={urls}
              setLoadingUpload={setLoadingUpload}
              setLoadingDelete={setLoadingDelete}
              setUrl={setUrl}
            />
          </form>
          {loadingUpload || loadingDelete ? (
            <Button color="primary" className="mt-[10px]" disabled>
              Edit product
            </Button>
          ) : (
            <Button color="primary" className="mt-[10px]" onClick={onAddProduct}>
              Edit product
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default memo(EditProductModal);
