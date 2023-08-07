import { Breadcrumb, Button, Checkbox, Label, Select, Table, TextInput } from 'flowbite-react';
import React from 'react';
import { AiFillMail } from 'react-icons/ai';
import {
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiPhone,
  HiPlus,
  HiTrash,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

type Props = {};

const OrderDetail = (props: Props) => {
  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Order Detail
            </h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 hidden items-center dark:divide-gray-700 sm:mb-0 sm:flex sm:divide-x sm:divide-gray-100">
              <form className="lg:pr-3">
                <Label htmlFor="users-search" className="sr-only">
                  Search
                </Label>
                <div className="relative mt-1 lg:w-64 xl:w-96">
                  <TextInput id="users-search" name="users-search" placeholder="Search for users" />
                </div>
              </form>
              <div className="mt-3 flex space-x-1 pl-0 sm:mt-0 sm:pl-2">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Configure</span>
                  <HiCog className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Delete</span>
                  <HiTrash className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Purge</span>
                  <HiExclamationCircle className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Settings</span>
                  <HiDotsVertical className="text-2xl" />
                </a>
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              {/* <AddUserModal /> */}
              {/* <Button color="primary">
            <div className="flex items-center gap-x-3">
              <HiPlus className="text-xl" />
              Add user
            </div>
          </Button> */}
              <Button color="gray">
                <div className="flex items-center gap-x-3">
                  <HiDocumentDownload className="text-xl" />
                  <span>Export</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <OrderDetailTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OrderDetailTable = () => {
  return (
    <>
      <div className="bg-gray-300 dark:bg-gray-800 w-full  flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
        <div className="flex justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 ">
          <div className="flex flex-col justify-start items-start flex-shrink-0 flex-1">
            <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
              <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
              <div className="flex justify-start items-start flex-col space-y-2">
                <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                  David Kent
                </p>
              </div>
            </div>
            <div className="flex justify-center  text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
              <div className="flex items-center gap-x-3">
                <AiFillMail />
                <p className="cursor-pointer text-sm leading-5 ">david89@gmail.com</p>
              </div>
              <div className="flex items-center gap-x-3">
                <HiPhone />
                <p className="cursor-pointer text-sm leading-5 ">099999999</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0 flex-1">
            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
              <div className="flex justify-center gap-x-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                  Address
                </p>
                <p className="lg:w-full dark:text-gray-300  text-center md:text-left text-sm leading-5 text-gray-600">
                  180 North King Street, Northhampton MA 1060 Lorem ipsum, dolor sit amet
                  consectetur adipisicing elit. Placeat dolore, dolor velit alias tempora iste ullam
                  fuga vel, atque esse nulla quis. Fugiat nesciunt ducimus ipsum temporibus quas
                  nulla atque.
                </p>
              </div>
              <div className="flex justify-center gap-x-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                  Payment
                </p>
                <p className="lg:w-full dark:text-gray-300  text-center md:text-left text-sm leading-5 text-gray-600">
                  Cash
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0 flex-1">
            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
              <div className="flex justify-center gap-x-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                  Note
                </p>
                <p className="lg:w-full dark:text-gray-300  text-center md:text-left text-sm leading-5 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat cupiditate
                  laboriosam commodi officiis minima quod, ex beatae architecto ipsam blanditiis
                  eius officia enim sequi cum earum! Eligendi odit magnam iste!
                </p>
              </div>
              <div className="flex justify-center gap-x-4">
                <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                  Status
                </p>
                <Select>
                  <option value="">Pending</option>
                  <option value="">Confirmed</option>
                  <option value="">Canceled</option>
                  <option value="">Done</option>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Table className="min-w-full min-h-[100vh] divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>
            <Label htmlFor="select-all" className="sr-only">
              Select all
            </Label>
            <Checkbox id="select-all" name="select-all" />
          </Table.HeadCell>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Size</Table.HeadCell>
          {/* <Table.HeadCell>Status</Table.HeadCell> */}
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {[0, 1, 2, 3].map((_, index) => (
            <Table.Row key={index} className={`  hover:bg-gray-100 dark:hover:bg-gray-700 `}>
              <Table.Cell className="w-4 p-4">
                <div className="flex items-center">
                  <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                  <label htmlFor="checkbox-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </Table.Cell>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                <img src="https://ui-avatars.com/api/?name=datnguyen" alt="" />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                2
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                x 1
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-white dark:text-white capitalize ">
                XL, X, M
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="flex justify-center  md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-300  dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            <div className="flex justify-between w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$56.00</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Discount</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">-$28.00 (50%)</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$8.00</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
              $36.00
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
