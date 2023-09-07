/*
   This component requires an argument "columns" like this:

const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor('firstName', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.lastName, {
            id: 'lastName',
            // cell: info => <i>{info.getValue()}</i>,
            header: "LastName",
            // footer: info => info.column.id,
        }),
        columnHelper.accessor('age', {
            header: () => 'Age',
            cell: info => info.renderValue(),
            // footer: info => info.column.id,
        }),
        columnHelper.accessor('visits', {
            header: () => <span>Visits</span>,
            // footer: info => info.column.id,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            // footer: info => info.column.id,
        }),
        columnHelper.accessor('progress', {
            header: 'Profile Progress',
            // footer: info => info.column.id,
        }),
        columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
            id: "acciones",
            header: 'Acciones',
            cell:  info => <Button
                onClick={() => console.log("Nombre Completo", info.getValue())}
            >
                <AiFillEdit/>
            </Button>
            // footer: info => info.column.id,
        }),
    ]

*/

import {createElement, useMemo, useState} from "react";
import ReactDOMServer from 'react-dom/server';
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    useReactTable, getFilteredRowModel,
} from '@tanstack/react-table'
import * as XLSX from 'xlsx/xlsx.mjs'
import {RiFileExcel2Line} from "react-icons/ri";
// import {formatDate} from "../../utils/formats/dateFormat.js";
import {BiDownArrowAlt, BiUpArrowAlt} from "react-icons/bi";
import Filter from "./Filters.jsx";
import {CiFilter} from "react-icons/ci";
import { Button } from "antd";


// eslint-disable-next-line react/prop-types
const Table = ({data, columns, parentName, hiddenColumns = []}) => {

    const [menu, setMenu] = useState(null);
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState(() => {
        const colParse = {};
        hiddenColumns.forEach((column) => {
            colParse[column] = false;
        });
        return colParse;
    });
    const [filters, setFilters] = useState(false);

    // const columns = useMemo(() => COLUMNS, [])

    const table = useReactTable({
        data,
        columns: columns,
        state: {
            sorting,
            columnVisibility
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: false,
    })

    function exportToExcel() {
        const columnFieldMap = {};
        table.getHeaderGroups()[0].headers.forEach(column => {
            if (column.id) {
                columnFieldMap[column.id] = column.id;
            }
        });

        const filteredData = []

        data.map(dat => {
            const filDat = {}
            Object.keys(dat).map((key) => {
                if (Object.keys(columnFieldMap).includes(key)){
                    filDat[columnFieldMap[key]] = dat[key]
                }
            })
            Object.keys(filDat).length > 0 && filteredData.push(filDat)
        });

        const worksheet = XLSX.utils.json_to_sheet(filteredData);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, parentName? parentName: "Sheet1");
        XLSX.writeFile(workbook, `${parentName? `${parentName}_`: ""}${new Date()}.xlsx`);
    }
    const handleContextMenu = (event) => {
        event.preventDefault();

        if (menu) {
            menu.style.left = `${event.pageX}px`;
            menu.style.top = `${event.pageY}px`;
            return;
        }

        const newMenu = document.createElement('div');
        newMenu.style.position = 'absolute';
        newMenu.style.backgroundColor = 'white';
        newMenu.style.border = '1px solid black';
        newMenu.style.borderRadius = '1px';
        // newMenu.style.padding = '10px'
        newMenu.style.cursor = 'pointer';

        const toExcelOption = document.createElement('div');
        toExcelOption.style.display = 'flex';
        toExcelOption.style.alignItems = 'center';
        toExcelOption.style.padding = '5px';
        // toExcelOption.style.marginBottom = '5px';

        toExcelOption.innerHTML = ReactDOMServer.renderToString(
            createElement(RiFileExcel2Line, {size: 20, style: {marginRight: '5px'}})
        );

        const text = document.createElement('span');
        text.textContent = 'toExcel';
        toExcelOption.appendChild(text);
        toExcelOption.addEventListener('click', exportToExcel);
        newMenu.appendChild(toExcelOption);

        newMenu.style.left = `${event.pageX}px`;
        newMenu.style.top = `${event.pageY}px`;
        window.document.body.appendChild(newMenu);

        const closeMenu = () => {
            window.document.body.removeChild(newMenu);
            window.removeEventListener('click', closeMenu);
            setMenu(null);
        };
        window.addEventListener('click', closeMenu);

        setMenu(newMenu);
    }
    return (
        <div className="flex flex-col items-center justify-center p-2 overflow-x-auto rounded shadow-md">
            <div className="flex flex-col justify-center w-full">
                <div className="flex flex-row justify-end">
                    <Button
                        className="p-2 hover:bg-gray-50"
                        onClick={() => setFilters((e)=> !e)}
                    >
                        <CiFilter title="Filters"/>
                    </Button>
                    {/* eslint-disable-next-line react/prop-types */}
                    <label className="p-2 mr-2 text-sm">{parentName}: {data.length}</label>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-6 py-3 text-xs tracking-wider text-center text-gray-900 uppercase" scope="col">
                                    {header.isPlaceholder ? null : (
                                        <div className="flex flex-col items-center">
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none flex flex-row items-center' +
                                                        ' text-center justify-center'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: <BiDownArrowAlt size="1.5em"/>,
                                                    desc: <BiUpArrowAlt size="1.5em"/>,
                                                }[header.column.getIsSorted()] ?? null}
                                            </div>
                                            {filters &&
                                                <div className="mt-1">
                                                    <Filter column={header.column} table={table}/>
                                                </div>
                                            }
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200" onContextMenu={handleContextMenu}>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} scope="row" className="px-6 py-4 text-xs text-center whitespace-nowrap dark:text-black">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-start w-full"> 
                <nav aria-label="Tabla Pagination" className="ml-4 bg-white rounded md:py-8">
                    <ul className="flex flex-wrap items-center mb-4 text-xs text-gray-900 sm:mb-0 dark:text-gray-400">
                        <li className="mr-1 hover:underline">Página {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</li>
                        <li className='mr-1 hover:underline'>| Ir a:&nbsp; </li>
                        <li className='mr-1 hover:underline'>
                            <input
                                className="block w-full h-8 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                                type='number'
                                min={1}
                                max={table.getPageCount()}
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? e.target.value - 1 : 0
                                    table.setPageIndex(page)
                                }}
                                style={{width: '50px'}}
                            />
                        </li>
                        <li className="ml-2 mr-1 hover:underline">
                            <Button
                                className="inline-flex items-center px-3 py-2 text-xs leading-4 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<<'}
                            </Button>
                        </li>
                        <li className="mr-1 hover:underline">
                            <Button
                                className="inline-flex items-center px-3 py-2 text-xs leading-4 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                tabIndex={-1}
                            >
                                Anterior
                            </Button>
                        </li>
                        <li className="mr-1 hover:underline">
                            <Button
                                className="inline-flex items-center px-3 py-2 text-xs leading-4 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Siguiente
                            </Button>
                        </li>
                        <li className="mr-4 hover:underline md:mr-6">
                            <Button
                                className="inline-flex items-center px-3 py-2 text-xs leading-4 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>>'}
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}


export default Table;