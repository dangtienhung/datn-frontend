import { Breadcrumb, Button, Checkbox, Label, Modal, Table, TextInput } from 'flowbite-react';
import type { FC } from 'react';
import { useState } from 'react';
import { HiCog, HiDotsVertical, HiExclamationCircle, HiPlus, HiTrash } from 'react-icons/hi';

type Props = {};

const Topping: FC = (props: Props) => {
  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            {/* <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb> */}
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All toppings
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
              <AddToppingModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              {/* <AllUsersTable /> */}
              <ToppingTable />
            </div>
          </div>
        </div>
      </div>
      {/* <Pagination /> */}
    </>
  );
};

const ToppingTable = () => {
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        {/* <Table.HeadCell>Country</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell> */}
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((_, index: number) => (
          <Table.Row key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <Table.Cell className="w-4 p-4">
              <div className="flex items-center">
                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                <label htmlFor="checkbox-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              Ice
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
              5000
            </Table.Cell>

            <Table.Cell>
              <div className="flex items-center gap-x-3 whitespace-nowrap">
                <EditToppingModal />
                <Button color="failure">
                  <div className="flex items-center gap-x-2">
                    <HiTrash className="text-lg" />
                    Delete Topping
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

const AddToppingModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add Topping
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add new Topping</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">Name Topping</Label>
              <div className="mt-1">
                <TextInput id="firstName" name="firstName" placeholder="Bonnie" />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Price</Label>
              <div className="mt-1">
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Add Topping
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const EditToppingModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Edit Topping
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit Topping</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">Name Topping</Label>
              <div className="mt-1">
                <TextInput id="firstName" name="firstName" placeholder="Bonnie" />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Price</Label>
              <div className="mt-1">
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Edit Topping
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Topping;
