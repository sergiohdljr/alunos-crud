import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TablePagination } from "./table-pagination"
import { Input } from "@/components/ui/input"
import { CreateStudentDialog } from "./create-student-dialog"
import type { StudentPayload } from "@/api/student-types"
import { Button } from "@/components/ui/button"
import { X, Search } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  inputFilters: StudentPayload
  setInputFilters: (filters: StudentPayload) => void
  applyFilters: () => void
  resetFilters: () => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  inputFilters,
  setInputFilters,
  applyFilters,
  resetFilters,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const hasInputFilters = inputFilters.name || inputFilters.email || inputFilters.cpf

  return (
    <div className="w-full overflow-hidden rounded-md border p-4">
     <div className="flex justify-between items-center py-4 gap-4">
        <div className="flex gap-2 flex-1">
          <Input
            placeholder="Filtrar por nome..."
            value={inputFilters.name}
            onChange={(e) =>
              setInputFilters({
                  ...inputFilters,
                  name: e.target.value
              })
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filtrar por email..."
            value={inputFilters.email}
            onChange={(e) =>
              setInputFilters({
                  ...inputFilters,
                  email: e.target.value
              })
            }
            className="max-w-sm"
          />
          <Input
            placeholder="Filtrar por CPF..."
            value={inputFilters.cpf}
            onChange={(e) =>
              setInputFilters({
                  ...inputFilters,
                  cpf: e.target.value
              })
            }
            className="max-w-sm"
          />
          <Button
            variant="default"
            onClick={applyFilters}
            className="px-3"
          >
            <Search className="w-4" />
            Buscar
          </Button>
            <Button
              variant="outline"
              onClick={resetFilters}
              className="px-2 lg:px-3"
            >
              <X className="w-4" />
              Limpar
            </Button>
        </div>
        <CreateStudentDialog />
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
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
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
                Nenhum aluno encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination table={table} />
    </div>
  )}