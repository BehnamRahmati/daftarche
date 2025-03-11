'use client'
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TClipboard } from '@/libs/clipboard.helpers'
import { useParams } from 'next/navigation'
import React from 'react'
import { FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi'
import { KeyedMutator } from 'swr'
import { Button } from './button'
import { Input } from './input'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    mutate: KeyedMutator<TClipboard[]>
}

export default function DataTable<TData, TValue>({ columns, data, mutate }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const { locale } = useParams()
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className=''>
            <div className='flex gap-2 flex-col lg:flex-row lg:items-center justify-between pb-5'>
                <div className='flex items-center'>
                    <Input
                        placeholder= {locale === 'fa' ? 'جستجو بین کلیپ بورد ها' : 'search between clipboards'}
                        value={(table.getColumn('content')?.getFilterValue() as string) ?? ''}
                        onChange={event => table.getColumn('content')?.setFilterValue(event.target.value)}
                        className='lg:w-sm'
                    />
                </div>

                <div className='flex items-center gap-2 '>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={value => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type='button' variant={'outline'} size={'icon'} onClick={() => mutate()}>
                        <FiRefreshCw />
                        <span className='sr-only'>refresh clipboards</span>
                    </Button>
                </div>
            </div>
            <div className='border-accent rounded-xl border'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-end gap-2 py-4'>
                <div className=''>
                    {locale === 'fa' ? (
                        <p>
                            صفحه {table.getState().pagination.pageIndex + 1} از {table.getPageCount()}
                        </p>
                    ) : (
                        <p>
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </p>
                    )}
                </div>
                <Button variant='outline' size='sm' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                    {locale === 'fa' ? 'اولین' : 'First'}
                </Button>
                <Button variant='outline' size='icon' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    {locale === 'fa' ? <FiChevronRight /> : <FiChevronLeft />}
                </Button>

                <Button variant='outline' size='icon' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    {locale === 'fa' ? <FiChevronLeft /> : <FiChevronRight />}
                </Button>

                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {locale === 'fa' ? 'آخرین' : 'Last'}
                </Button>
            </div>
        </div>
    )
}
