import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';

const BaseModal = ({ title, text, component = <></>, onOk = () => {} , onCancel = () => {}, isModalOpen, setIsModalOpen}) => {

  useEffect(() => {
    
  }, [isModalOpen])
  

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  return (
    <>
      <Button type="primary" className="text-black" onClick={showModal}>
        {text}
      </Button>
      <Modal
        title={title}
        okText="Aceptar"
        okButtonProps={{
          className: 'text-black',
          type: 'default',
          htmlType: 'submit',
        }}
        cancelButtonProps={{danger: true, type: 'default'}}
        // cancelText={null}
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
      >
        {component}
      </Modal>
    </>
  );
};
export default BaseModal;
