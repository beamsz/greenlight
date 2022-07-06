import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import axios from '../../../helpers/Axios';

export default function useDeleteAccessCode(friendlyId) {
  const queryClient = useQueryClient();

  const deleteAccessCode = (data) => axios.patch(`/rooms/${friendlyId}/remove_access_code.json`, { bbb_role: data });

  const mutation = useMutation(deleteAccessCode, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAccessCodes');
      toast.success('Removed access code');
    },
    onError: () => {
      toast.error('There was a problem completing that action. \n Please try again.');
    },
  });

  const handleDeleteAccessCode = (data) => mutation.mutateAsync(data).catch(/* Prevents the promise exception from bubbling */() => {});

  return { handleDeleteAccessCode, ...mutation };
}
