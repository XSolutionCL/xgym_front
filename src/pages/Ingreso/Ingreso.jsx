import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { SmileOutlined } from '@ant-design/icons';


const Ingreso = () => {
  
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Result
        status="info"
        icon={<SmileOutlined />}
        title="En Desarrollo"
        subTitle="Pronto estará disponible este módulo."
        extra={<Button  onClick={() => navigate(-1)}>Back Home</Button>}
      />
    </div>
  )
}

export default Ingreso;