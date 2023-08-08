import { Button, Checkbox, Label, Table } from 'flowbite-react';
import { BiSolidDetail } from 'react-icons/bi';
import { GiConfirmed } from 'react-icons/gi';
import { FcCancel } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { IOrderDocs } from '../../../interfaces/order.type';

type Props = {
  data: IOrderDocs;
};

const AllOrdersPending = ({ data }: Props) => {
  const orderPending = data.docs.filter((item) => item.status === 'pending');

  return (
    <Table className="min-w-full min-h-[100vh] divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700 text-center">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>User Name</Table.HeadCell>
        <Table.HeadCell>Address</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {orderPending.map((item, index) => (
          <Table.Row
            key={index}
            className={` hover:bg-gray-100 dark:hover:bg-gray-700 text-center`}
          >
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                <label htmlFor="checkbox-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0 text-center">
              <img
                className="h-10 w-10 rounded-full"
                src={`https://api.multiavatar.com/datnguyen`}
                alt=""
              />
              <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {item.user.username}
                </div>
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">abc</div>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
              <div className="flex items-center justify-center capitalize">
                <div className={`mr-2 h-2.5 w-2.5 rounded-full `}></div>
                {item.inforOrderShipping.address}
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
              {item.status}
            </Table.Cell>
            <Table.Cell>
              <div className="flex items-center justify-center gap-x-3 whitespace-nowrap">
                <Button color="primary">
                  <Link to={`/admin/orders/abc`} className="flex items-center gap-x-3">
                    <BiSolidDetail className="text-xl" />
                  </Link>
                </Button>
                <Button className="bg-red-300">
                  <div className="flex items-center gap-x-2 text-xl text-red-200">
                    <FcCancel />
                  </div>
                </Button>
                <Button className="bg-orange-500">
                  <div className="flex items-center gap-x-2 text-xl">
                    <GiConfirmed />
                  </div>
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default AllOrdersPending;
