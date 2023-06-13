'use client'

import { useState } from 'react'

import { ArrowPathIcon } from '@heroicons/react/24/solid'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  VisibilityState,
  PaginationState,
  OnChangeFn,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/utils'

import { Input } from './input'

type PaginationProps =
  | {
      count?: never
      pagination?: never
      onPaginationChange?: never
    }
  | {
      count: number
      pagination: PaginationState
      onPaginationChange: OnChangeFn<PaginationState>
    }

type DataTableProps<T, V> = {
  columns: ColumnDef<T, V>[]
  data: T[]
  loading?: boolean
  hideColumns?: boolean
  onSearchChange?: React.ChangeEventHandler<HTMLInputElement>
} & PaginationProps

const pageSizeOptions = [5, 10, 20, 50, 100, 200]

export function DataTable<T, V>({
  columns,
  data,
  count,
  pagination,
  onPaginationChange,
  hideColumns,
  onSearchChange,
  loading,
}: DataTableProps<T, V>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !count ? getPaginationRowModel() : undefined,
    manualPagination: !!count,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: onPaginationChange,
    pageCount: count ? Math.ceil(count / pagination.pageSize) : undefined,
    state: { sorting, columnVisibility, pagination, rowSelection },
  })

  return (
    <div className="p-3">
      <div className="flex items-center justify-end gap-2 py-4">
        {onSearchChange ? (
          <div className="mr-auto">
            <Input type="text" placeholder="Buscar" onChange={onSearchChange} />
          </div>
        ) : null}
        {pagination ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Mostrar {pagination.pageSize}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {pageSizeOptions.map((p) => (
                <DropdownMenuCheckboxItem
                  key={p}
                  className="capitalize"
                  checked={pagination.pageSize === p}
                  onCheckedChange={() => onPaginationChange({ pageIndex: 0, pageSize: p })}
                >
                  {p}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

        {hideColumns ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columnas</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      onSelect={(e) => e.preventDefault()}
                    >
                      {(column.columnDef.header as string) ?? column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
      <div className="relative rounded-md border">
        <div
          className={cn('inset-0 h-full w-full bg-white/75', {
            absolute: loading,
            hidden: !loading,
          })}
        >
          <div className="flex h-full w-full items-center justify-center">
            <ArrowPathIcon className="h-4 w-4 animate-spin text-blue" />
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length}{' '}
          fila(s) seleccionadas.
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
