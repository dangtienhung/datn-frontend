import { Button, Table } from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useGetAllOrderCancelQuery } from '../../../store/slices/order';
import { LuClipboardEdit } from 'react-icons/lu';
import { v4 as uuid } from 'uuid';
import formatDate from '../../../utils/formatDate';

const AllOrdersCanceled = () => {
  const { data } = useGetAllOrderCancelQuery();
  return (
    <Table hoverable className="w-full h-full">
      <Table.Head>
        <Table.HeadCell>Stt</Table.HeadCell>
        <Table.HeadCell>Username</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Time Order</Table.HeadCell>
        <Table.HeadCell>Action</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data &&
          data.docs.length > 0 &&
          data.docs.map((item, index) => (
            <Table.Row
              className="dark:border-gray-700 dark:bg-gray-800 w-full bg-white"
              key={uuid()}
            >
              <Table.Cell className="whitespace-nowrap dark:text-white font-medium text-gray-900">
                {index + 1}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-4">
                  <img
                    className="h-14 w-14 object-cover rounded-full"
                    src={item.user && item.user.avatar}

                  />
                  <div className="">
                    <p className="dark:text-white text-base font-semibold text-gray-900">
                  {item.user && item.user.username}

                    </p>
                    <p className="dark:text-gray-400 text-sm font-normal text-gray-500">
                      {item.inforOrderShipping.phone}
                    </p>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>{item.inforOrderShipping.address}</Table.Cell>
              <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
              <Table.Cell>
                <Button color="primary">
                  <Link to={`/admin/orders/${item._id}`} className="gap-x-3 flex items-center">
                    <LuClipboardEdit className="text-xl" />
                    Detail
                  </Link>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
};

export default AllOrdersCanceled;
