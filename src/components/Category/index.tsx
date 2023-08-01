import { FaBars } from 'react-icons/fa';
import { ICategory } from '../../interfaces/category.type';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';

interface SidebarCateProps {
  categories: ICategory[];
  onClick: (id: string) => void;
}

const SidebarCate = ({ categories, onClick }: SidebarCateProps) => {
  console.log(categories);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="sidebar shrink-0 w-[300px] bg-[#fff] text-[14px] rounded-sm mx-[16px] pb-[12px] h-fit hidden lg:block">
        <div className="border border-transparent border-b-[#f1f1f1] uppercase px-4 py-2">
          Danh mục
        </div>
        <div className="px-[16px]">
          {categories &&
            categories?.length > 0 &&
            categories?.map((category: ICategory) => (
              <div
                onClick={() => onClick(category._id)}
                key={category._id}
                className="cursor-pointer hover: flex justify-between border border-transparent border-b-[#f1f1f1] py-[8px] last:border-none"
              >
                <div className="cat-name capitalize">{category.name}</div>
                <div className="cat-amount text-[#8a733f]">{category.products.length}</div>
              </div>
            ))}
        </div>
      </div>
      <div
        className="btn-menu cursor-pointer fixed bottom-[100px] left-[16px] bg-[#ee4d2d] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center z-[3] lg:hidden"
        onClick={handleClick}
      >
        <FaBars />
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Paper elevation={3} sx={{ width: '25rem' }}>
          <Fragment>
            <Typography component={'h1'} color="text.primary" fontWeight={500} padding={1}>
              Danh mục
            </Typography>
          </Fragment>
          <Divider />
          <List
            disablePadding
            sx={{
              width: '100%',
              maxHeight: 200,
              overflow: 'auto',
            }}
          >
            {categories &&
              categories?.length > 0 &&
              categories?.map((category: ICategory) => (
                <Stack key={category._id} onClick={handleClose}>
                  <ListItem>
                    <ListItemText
                      className="cursor-pointer"
                      secondary={
                        <Fragment>
                          <Typography
                            component={'span'}
                            className="flex justify-between w-full"
                            color="text.primary"
                            fontSize={13}
                          >
                            {category.name}
                            <span>10</span>
                          </Typography>
                        </Fragment>
                      }
                      onClick={() => onClick(category._id)}
                    />
                  </ListItem>
                  <Divider sx={{ marginLeft: '16px' }} />
                </Stack>
              ))}
          </List>
        </Paper>
      </Popover>
    </>
  );
};

export default SidebarCate;
