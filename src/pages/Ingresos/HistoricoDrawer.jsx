import { Drawer, List } from 'antd'


const HistoricoDrawer = ({open, setOpen, historico}) => {

  return (
    <Drawer
        title="Registro de Ingresos"
        width="auto"
        placement="right"
        // getContainer={false}
        open={open}
        onClose={() => setOpen(false)}
        closable={false}
    >
      <List
        size="small"
        style={{ width: '100%', height: '100%', overflowY: 'auto' }}
        bordered
        dataSource={historico || []}
        renderItem={(item) => 
          <List.Item className='flex flex-row items-center justify-center w-full gap-4'>
            <div>Dia: {item.dia}</div>
            <div>Hora: {item.hora}</div>
          </List.Item>
        }
      />
    </Drawer>
  )
}

export default HistoricoDrawer;
