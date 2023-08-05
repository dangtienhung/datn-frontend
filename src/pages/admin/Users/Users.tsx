import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
} from 'flowbite-react';
import type { FC } from 'react';
import { useState } from 'react';
import {
  HiChevronLeft,
  HiChevronRight,
  HiCog,
  HiDocumentDownload,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlinePencilAlt,
  HiPlus,
  HiTrash,
} from 'react-icons/hi';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../../api/User';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { IUserDocs } from '../../../interfaces/user.type';
import Pagination from '../../../components/admin/Pagination';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const UserList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: users, isLoading, isError } = useGetAllUsersQuery(currentPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/users/list">Users</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All users
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
              <AddUserModal />
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
              <AllUsersTable users={users!} isLoading={isLoading} isError={isError} />
            </div>
          </div>
        </div>
      </div>
      <Pagination
        nextPage={handleNextPage}
        prevPage={handlePrevPage}
        hasPrev={users?.hasPrevPage!}
        hasNext={users?.hasNextPage!}
      />
    </>
  );
};

type AllUsersTableProps = {
  users: IUserDocs;
  isLoading: boolean;
  isError: boolean;
};
const AllUsersTable = function ({ users, isLoading, isError }: AllUsersTableProps) {
  const [deleteUser, { isLoading: isDeleting, isError: isDeleteErr }] = useDeleteUserMutation();
  const handleDelete = (id: string) => {
    Swal.fire({
      icon: 'question',
      title: 'Do you want to delete this user?',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id).then(() => {
          if (!isDeleteErr) {
            toast.success('Deleted success');
          } else {
            toast.error('Delete failed');
          }
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Everything is safe',
        });
      }
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Loi roi</div>;
  return (
    <Table className="min-w-full min-h-[100vh] divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <Label htmlFor="select-all" className="sr-only">
            Select all
          </Label>
          <Checkbox id="select-all" name="select-all" />
        </Table.HeadCell>
        <Table.HeadCell>User Name</Table.HeadCell>
        <Table.HeadCell>Position</Table.HeadCell>
        <Table.HeadCell>Deleted</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {users?.docs &&
          users?.docs.map((user) => (
            <Table.Row key={user._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Table.Cell className="w-4 p-4">
                <div className="flex items-center">
                  <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
                  <label htmlFor="checkbox-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </Table.Cell>
              <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.avatar || `https://api.multiavatar.com/${user.username}.png`}
                  alt={user.username}
                />
                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  <div className="text-base font-semibold text-gray-900 dark:text-white">
                    {user.username}
                  </div>
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {user?.account || user?.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white capitalize">
                {user?.role?.name}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-white dark:text-white capitalize ">
                <span
                  className={`${
                    user?.deleted === true ? 'bg-red-400 ' : 'bg-green-400 '
                  } rounded inline-block px-2`}
                >
                  {user?.deleted === true ? 'true' : 'false'}
                </span>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                <div className="flex items-center  capitalize">
                  <div
                    className={`mr-2 h-2.5 w-2.5 rounded-full  ${
                      user?.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  ></div>
                  {user?.status || 'Not Active'}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <EditUserModal />
                  <Button color="failure" onClick={() => handleDelete(user._id!)}>
                    <div className="flex items-center gap-x-2">
                      {isDeleting ? (
                        <AiOutlineLoading3Quarters className="text-lg rotate" />
                      ) : (
                        <HiTrash className="text-lg" />
                      )}
                      Delete user
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

const AddUserModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-3">
          <HiPlus className="text-xl" />
          Add user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Add new user</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <div className="mt-1">
                <TextInput id="firstName" name="firstName" placeholder="Bonnie" />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <div className="mt-1">
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1">
                <TextInput id="email" name="email" placeholder="example@company.com" type="email" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <div className="mt-1">
                <TextInput id="phone" name="phone" placeholder="e.g., +(12)3456 789" type="tel" />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <div className="mt-1">
                <TextInput id="department" name="department" placeholder="Development" />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <div className="mt-1">
                <TextInput id="company" name="company" placeholder="Somewhere" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Add user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const EditUserModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <HiOutlinePencilAlt className="text-lg" />
          Edit user
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit user</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <div className="mt-1">
                <TextInput name="firstName" placeholder="Bonnie" />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <div className="mt-1">
                <TextInput name="lastName" placeholder="Green" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1">
                <TextInput name="email" placeholder="example@company.com" type="email" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <div className="mt-1">
                <TextInput name="phone" placeholder="e.g., +(12)3456 789" type="tel" />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <div className="mt-1">
                <TextInput name="department" placeholder="Development" />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Role</Label>
              <div className="mt-1">
                <Select>
                  <option value="">abc</option>
                  <option value="">xyz</option>
                  <option value="">111</option>
                </Select>
                {/* <TextInput name="company" placeholder="Somewhere" /> */}
              </div>
            </div>
            <div>
              <Label htmlFor="passwordCurrent">Current password</Label>
              <div className="mt-1">
                <TextInput name="passwordCurrent" placeholder="••••••••" type="password" />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">New password</Label>
              <div className="mt-1">
                <TextInput name="passwordNew" placeholder="••••••••" type="password" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserList;
