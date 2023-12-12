import { Modal, Form, Spin } from 'antd'
import CustomForm from '../../components/Forms/CustomForm';
import { useFormasPagoOps } from '../../hooks/formaspago';
import { makePagoDiarioFields } from './ingresos.base';


const IngresoDiarioModal = ({open, setOpen, pagar}) => {

    const [form] = Form.useForm();

    const { data: formasPago, isFetching } = useFormasPagoOps(open);

    const formaPagoSelected = Form.useWatch("cod_forma_pago", form);
    
    const onFinish = (values) => {
        pagar({ ...values });
        setOpen(false);
        form.resetFields();
    }

    const onCancel = () => {
      setOpen(false);
      form.resetFields();
    }
    

    return (
        <Modal
            title="Pago Diario"
            open={open}
            destroyOnClose
            onOk={() => form.submit()}
            onCancel={onCancel}
            okButtonProps={{ type: 'default'}}
            cancelButtonProps={{ type: 'default', danger: true }}
            okText="Pagar"
            cancelText="Cerrar"

        >
            {isFetching ? 
                <Spin/> : 
                <CustomForm
                    form={form}
                    onFinish={onFinish}
                    fields={makePagoDiarioFields({
                        formasPago: formasPago,
                        formaPagoSelected: formaPagoSelected
                    })}
                />
            }
        </Modal>
    )
}


export default IngresoDiarioModal;
