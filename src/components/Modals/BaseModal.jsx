import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';

const BaseModal = ({ 
  title, 
  text, 
  component = <></>,
  onOk = () => {} , 
  onCancel = () => {}, 
  isModalOpen, 
  setIsModalOpen, 
  extraButtons=<></>,
  filters=<></>,
  ...props
}) => {

  useEffect(() => {
    
  }, [isModalOpen])
  

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  return (
    <>
      <div className='flex flex-row justify-between w-full gap-1'>
        <div className='flex flex-row items-center justify-start gap-1'>
          <Button type="primary" className="text-black" onClick={showModal}>
            {text}
          </Button>
          {extraButtons}
        </div>
        {filters}
      </div>
      <Modal
        {...props}
        title={title}
        okText="Aceptar"
        destroyOnClose
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
