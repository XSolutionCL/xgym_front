import { Button, Form, Modal, Result, Spin } from "antd";
import { useEffect, useState } from "react";
import { IoFilterCircleOutline } from "react-icons/io5";
import { IoFilterCircle } from "react-icons/io5";
import CustomForm from "../Forms/CustomForm";
import dayjs from "dayjs";
import { SmileOutlined } from '@ant-design/icons';


const Filters = ({
    loading=false,
    isOpen=false,
    setIsOpen=()=>{},
    fields=[],
    tableFilters={},
    setTableFilters=()=>{}
}) => {

    useEffect(() => {
      if(preLoading && tableFilters.filters && Object.keys(tableFilters.filters).length > 0) {
        form.setFieldsValue(tableFilters.filters);
        setPreLoading(false);
      }
    }, [tableFilters.filters])

    const [preLoading, setPreLoading] = useState(true);
    
    const [form] = Form.useForm();

    const onFinish = (values) => {
      const cleanValues = {};
      Object.keys(values).map(key => {
        if (values[key]){
            // Formatear Fechas Dayjs
            if (values[key] instanceof dayjs) {
                cleanValues[key] = dayjs(values[key]).format("YYYY-MM-DD");
              } else {
                cleanValues[key] = values[key];
              }
        }
      })
      setTableFilters({
        ...tableFilters,
        filters: cleanValues
    });
      setIsOpen(false);
      setPreLoading(true);
    }

    const onLimpiar = () => {
        setTableFilters({
            ...tableFilters,
            filters: {}
        })
        form.resetFields();
        setIsOpen(false);
    }
    
    const [developing, setDeveloping] = useState(false);

  return (
    <>
        <Button
            type="ghost"
            icon={ isOpen ? <IoFilterCircle size="1.5em"/> : <IoFilterCircleOutline size="1.5em"/>}
            onClick={() => setIsOpen(true)}
        />
        <Modal
            title="Filtrado por"
            okText="Filtrar"
            cancelText="Limpiar"
            destroyOnClose
            okButtonProps={{
            className: 'text-black',
            type: 'default',
            htmlType: 'submit',
            }}
            cancelButtonProps={{danger: false, type: 'default'}}
            open={isOpen}
            onOk={form.submit}
            onCancel={() => onLimpiar()}
        >
            { loading ? 
                <Spin className="flex flex-row items-center justify-center w-full h-full" size="large" />
                :
                developing ? 
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <Result
                    status="info"
                    icon={<SmileOutlined />}
                    title="En Desarrollo"
                    subTitle="Pronto estará disponible esta opción."
                    extra={<Button  onClick={() => setIsOpen(false)}>Back Home</Button>}
                  />
                </div>
                :<CustomForm
                    onFinish={onFinish}
                    form={form}
                    fields={fields}
                />
            }
        </Modal>
    </>
  )
}

export default Filters;
