import React, { useEffect } from 'react';
import { Table, Typography } from 'antd';
import useTableFilters from '../../common/store/tableFiltersStore';


const makeColumns = (columns) => {
    const modifiedColumns = columns.map((col, i) => ({
        ...col,
        responsive: ['xs', 'md'],
        key: i,
        align: 'center',
        ellipsis: true,
        sorter: col.dataIndex ? true : false,
        sortDirections: ['ascend', 'descend']
    }));
    
    return modifiedColumns;
}

const { Title } = Typography;


const AntTable = (
    {
        columns=[],
        data=[], 
        setRowSelection=false, 
        expandable=false, 
        expandedRowRender=<></>, 
        loading=false
    }) => {

    const {tableFilters, setTableFilters} = useTableFilters()

    const handleTableChange = (pagination, filters, sorter) => {
        setTableFilters({
          pagination,
          filters,
          sorter: Object.keys(sorter).length > 0 ? sorter : tableFilters.sorter,
        });
      };

      useEffect(() => {

      }, [tableFilters])
      

    return (
        <> 
            <Table
                className='flex w-full h-full'
                columns={makeColumns(columns, tableFilters)}
                rowKey={(record) => record[Object.keys(record)[0]]}
                rowSelection={
                    setRowSelection &&
                    {
                    onChange: (_, selectedRows) => {
                        setRowSelection(selectedRows);
                    },
                }}
                rowClassName="text-xs"
                expandable={ expandable ? {
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0']
                    }: false
                }
                dataSource={data}
                pagination={tableFilters.pagination}
                size="small"
                loading={loading}
                bordered
                onChange={handleTableChange}
                footer={() => 
                    <div className='flex justify-end w-full p-0 -mb-2'>
                        <Title level={5}>Total: {tableFilters.pagination?.total}</Title>
                    </div>
                }
                // sticky
                /* scroll={{
                    y: 'max-content',
                    x: 'max-content'
                  }} */
            />
        </>
    )
}

export default AntTable;