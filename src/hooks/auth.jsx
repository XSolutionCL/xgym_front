import { useMutation, useQueryClient } from 'react-query';
import { axiosPost } from '../apis/calls';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../common/store/authStore';

const key = 'auth';

export const useLoginMutate = () => {
  const queryClient = useQueryClient();
  const {setProfile, setToken, logout} = useAuthStore()
  const navigate = useNavigate();
  return useMutation((cuerpo) => axiosPost(`${key}/login`, cuerpo), {
    onSuccess: (response) => {
      console.log(response);
      queryClient.setQueryData([key], response);
      const { token, ...userInfo } = response;
      setProfile(userInfo)
      setToken(response.token);
      toast.success(`Bienvenido ${response.user_info.desc_usuario || ''}`);
      navigate('/home');
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.log(error);
      logout()
    },
  });
};
