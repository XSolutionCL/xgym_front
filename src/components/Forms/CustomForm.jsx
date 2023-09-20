import React from 'react';
import {
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
    TimePicker
} from 'antd';
import ChileanRutify from 'chilean-rutify';

const {RangePicker} = DatePicker;
const {TextArea} = Input;

const CustomForm = ({onFinish, form, fields}) => {

  const getInput = (field, props = {}) => {
    if (field.type === 'select') {
      return (
        <Select
          {...props}
          showSearch
          allowClear
          style={{ width: '100%' }}
          placeholder={'Seleccione'}
          optionFilterProp="children"
          filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {field.options?.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    } else {
      return getInputs(field.type, props);
    }
  };

  const handleRutChange = (e) => {
    form.setFieldValue(e.target.id, ChileanRutify.formatRut(e.target.value))
  }

  const validateRut = (value) => {
    if (! ChileanRutify.validRut(value) && value.length > 4) {
      return Promise.reject('Invalid Rut');
    } else {
      return Promise.resolve();
    }
  }
  
  
  const getInputs = (type, props = {}) => {
    const items = {
      text: <Input {...props}/>,
      email: <Input {...props}/>,
      password: <Input.Password visibilityToggle={false} {...props}/>,
      switch: <Switch {...props}/>,
      rut: <Input onChange={handleRutChange} maxLength={12} {...props}/>,
      date: <DatePicker format="DD-MM-YYYY" {...props} style={{ width: "100%" }}/>,
      time: <TimePicker format='HH:mm' {...props}/>,
      dateRange: <RangePicker format="DD-MM-YYYY" {...props}/>,
      number: <InputNumber {...props} style={{ width: "100%" }}/>,
      textarea: <TextArea rows={4} {...props}/>,
    };
    return items[type];
  };


return (
    <Form className="flex flex-col w-full h-full gap-2 mt-10"
    form={form}
    onFinish={onFinish}
    labelCol={{
      flex: '110px',
    }}
    labelAlign="left"
    labelWrap
    wrapperCol={{
      flex: 1,
    }}
    style={{
      maxWidth: 600,
    }}
    layout="horizontal">
        {fields.map((field, index) => {
        const {label, tooltip, name, required, type, ...props} = field;
        return (
          <Form.Item
            key={index}
            label={label}
            tooltip={tooltip || false}
            name={name}
            rules={[
              {
                required: required,
                type: type,
                // validator: (_, value) => type === "rut" ? validateRut(value) : {} ,
                ...(type === "rut" ? { validator: (_, value) => validateRut(value) } : {}),
                message: `El campo ${label} es requerido!`,
              },
            ]}
          >
            {getInput(field, props)}
          </Form.Item>
        )
      })}
    </Form>
);};export default CustomForm;
