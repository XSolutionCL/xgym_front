import { Upload, Modal, Button } from "antd";
import { useState } from "react";
import { LiaCloudUploadAltSolid } from "react-icons/lia";

const { Dragger } = Upload;

const ClienteImagenModal = ({
  uploadModalIsOpen,
  setUploadModalIsOpen,
  uploadImage,
  isUploading,
}) => {
  const [files, setFiles] = useState([]);

  const handleUploadFile = () => {
    const formData = new FormData();

    if (files.length === 1) {
      formData.append("cod_cliente", uploadModalIsOpen);
      formData.append("file", files[0].originFileObj);
      uploadImage(formData, {
        onSuccess: () => {
            setFiles([]);
            setUploadModalIsOpen(false);
        }
      });
    }
  };

  const handleImagen = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
      setFiles(info.fileList);
    }
  };

  return (
    <Modal
      open={uploadModalIsOpen}
      onCancel={() => setUploadModalIsOpen(false)}
      title="Subir Imagen de Cliente"
      destroyOnClose
      footer={
        <>
          <Button
            onClick={() => {
              setUploadModalIsOpen(false);
            }}
          >
            Cancelar
          </Button>

          <Button loading={isUploading} onClick={() => handleUploadFile()}>
            Subir Imagen
          </Button>
        </>
      }
    >
      <Dragger
        beforeUpload={() => false}
        fileList={files}
        multiple={false}
        onChange={handleImagen}
      >
        <p className="flex justify-center ant-upload-drag-icon">
          <LiaCloudUploadAltSolid size="4em" className="animate-bounce" />
        </p>
        <p className="ant-upload-text">
          Haz click o arrastra los archivos a esta área para subirlos
        </p>
        <p className="ant-upload-hint">
          Por favor subir únicamente archivos dicom.
        </p>
      </Dragger>
    </Modal>
  );
};

export default ClienteImagenModal;
