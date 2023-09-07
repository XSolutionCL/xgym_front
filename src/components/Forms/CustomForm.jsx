
import React from 'react';
import {DatePicker, Form, Input, InputNumber, Select, Switch, TimePicker } from 'antd';
import ChileanRutify from 'chilean-rutify';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CustomForm = ({ onFinish, form, fields }) => {

  const getInput = (field) => {
    if (field.type === 'select') {
      return (
        <Select
          showSearch
          allowClear
          style={{ width: '100%' }}
          placeholder={field.label}
          optionFilterProp="children"
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {field.options.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    } else {
      return inputs[field.type];
    }
  };

  const handleRutChange = (e) => {
    form.setFieldValue(e.target.id, ChileanRutify.formatRut(e.target.value))
}
  
  const inputs = {
    text: <Input/>,
    email: <Input/>,
    password: <Input.Password visibilityToggle={false}/>,
    switch: <Switch />,
    rut: <Input onChange={handleRutChange} maxLength={12}/>,
    date: <DatePicker />,
    time: <TimePicker format='HH:mm'/>,
    dateRange: <RangePicker />,
    number: <InputNumber />,
    textarea: <TextArea rows={4} />,
  };


  return (
    <Form
      className="flex flex-col w-full h-full gap-2 mt-10"
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
      layout="horizontal"
    >
      {fields.map((field, index) => (
        <Form.Item
          key={index}
          label={field.label}
          name={field.name}
          rules={[
            {
              required: field.required,
              type: field.type,
              message: `El campo ${field.label} es requerido!`,
            },
          ]}
        >
          {getInput(field)}
        </Form.Item>
      ))}
    </Form>
  );
};

export default CustomForm;
