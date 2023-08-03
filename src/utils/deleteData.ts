import Swal from 'sweetalert2';
import { useAppDispatch } from '../store/hooks';

const deleteData = (func: (id: string) => any) => {
  const dispatch = useAppDispatch();

  Swal.fire({
    icon: 'info',
    title: 'Do you want to delete this item',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
      }).then(() => dispatch(func(id)));
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Everything is safe🤣',
      });
    }
  });
};

export default deleteData;
