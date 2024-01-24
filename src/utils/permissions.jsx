import { useAuthStore } from "../common/store/authStore";

export const useHasPermission = () => {
  const { permisos, user_info } = useAuthStore((state) => state.profile);
  const { cod_cargo } = user_info;
  const hasPermission = (codPerm) => {
    if (cod_cargo === 1){
        return true;
    };
    return permisos.map((p) => p.cod_permiso).includes(codPerm);
  };
  return {
    hasPermission,
  };
};
