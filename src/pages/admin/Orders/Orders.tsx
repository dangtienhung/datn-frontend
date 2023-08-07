import { Tabs } from 'flowbite-react';
import { HiClipboardList, HiClipboard, HiCheckCircle, HiClipboardCheck } from 'react-icons/hi';
import { MdLocalShipping } from 'react-icons/md';
import AllOrdersTable from './AllOrdersTable';
import AllOrdersPending from './AllOrdersPending';
import AllOrdersConfirmed from './AllOrdersConfirmed';
import AllOrderDelivered from './AllOrderDelivered';
import AllOrdersDone from './AllOrdersDone';
import AllOrdersCanceled from './AllOrdersCanceled';
import { FaTimesCircle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const FakeOrder: IOrderDocs = {
  docs: [
    {
      user: uuidv4(),
      items: [
        {
          product: uuidv4(),
          quantity: 10,
          price: 100,
        },
      ],
      status: 'pending',
      total: 1000,
      priceShipping: 0,
      address: 'HN',
      is_active: true,
    },
    {
      user: uuidv4(),
      items: [
        {
          product: uuidv4(),
          quantity: 10,
          price: 100,
        },
      ],
      status: 'pending',
      total: 1000,
      priceShipping: 0,
      address: 'HN',
      is_active: true,
    },
    {
      user: uuidv4(),
      items: [
        {
          product: uuidv4(),
          quantity: 10,
          price: 100,
        },
      ],
      status: 'pending',
      total: 1000,
      priceShipping: 0,
      address: 'HN',
      is_active: true,
    },
    {
      user: uuidv4(),
      items: [
        {
          product: uuidv4(),
          quantity: 10,
          price: 100,
        },
      ],
      status: 'confirmed',
      total: 1000,
      priceShipping: 0,
      address: 'HN',
      is_active: true,
    },
    {
      user: uuidv4(),
      items: [
        {
          product: uuidv4(),
          quantity: 10,
          price: 100,
        },
      ],
      status: 'delivered',
      total: 1000,
      priceShipping: 0,
      address: 'HN',
      is_active: true,
    },
    {
      user: uuidv4(),
      items: [
        {
          product: uuidv4(),
          quantity: 10,
          price: 100,
        },
      ],
      status: 'done',
      total: 1000,
      priceShipping: 0,
      address: 'HN',
      is_active: true,
    },
    {
      user: uuidv4(),
      items: [
        {
          product: uuidv4(),
          quantity: 10,
          price: 100,
        },
      ],
      status: 'pending',
      total: 1000,
      priceShipping: 0,
      address: 'HN',
      is_active: true,
    },
  ],
  totalDocs: 0,
  limit: 0,
  totalPages: 0,
  page: 0,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null,
};

const Orders = () => {
  return (
    <div className="p-2">
      <Tabs.Group aria-label="Default tabs" style="default">
        <Tabs.Item active icon={HiClipboardList} title="All Orders">
          <AllOrdersTable />
        </Tabs.Item>
        <Tabs.Item icon={HiClipboard} title="Order pending">
          <AllOrdersPending data={FakeOrder} />
        </Tabs.Item>
        <Tabs.Item icon={HiClipboardCheck} title="Order comfirmed">
          <AllOrdersConfirmed />
        </Tabs.Item>
        <Tabs.Item icon={MdLocalShipping} title="Order delivered">
          <AllOrderDelivered />
        </Tabs.Item>
        <Tabs.Item icon={HiCheckCircle} title="Order done">
          <AllOrdersDone />
        </Tabs.Item>
        <Tabs.Item icon={FaTimesCircle} title="Order canceled">
          <AllOrdersCanceled />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default Orders;
