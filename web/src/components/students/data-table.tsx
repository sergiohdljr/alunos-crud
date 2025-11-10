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
import { EmptyStudentsState } from "@/components/ui/empty-state"

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

  return (
    <div className="w-full overflow-hidden rounded-md border p-2 sm:p-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <Input
            placeholder="Filtrar por nome..."
            value={inputFilters.name}
            onChange={(e) =>
              setInputFilters({
                  ...inputFilters,
                  name: e.target.value
              })
            }
            className="w-full sm:max-w-[200px]"
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
            className="w-full sm:max-w-[200px]"
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
            className="w-full sm:max-w-[180px]"
          />
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="default"
              onClick={applyFilters}
              className="flex-1 sm:flex-none px-3"
            >
              <Search className="w-4 mr-1" />
              <span className="hidden sm:inline">Buscar</span>
            </Button>
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex-1 sm:flex-none px-2 lg:px-3"
            >
              <X className="w-4 mr-1" />
              <span className="hidden sm:inline">Limpar</span>
            </Button>
          </div>
        </div>
        
        <div className="w-full lg:w-auto">
          <CreateStudentDialog />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="h-[60vh] border rounded-md overflow-hidden">
          <Table className="min-w-full h-full">
            <TableHeader className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="whitespace-nowrap">
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
            <TableBody className="overflow-y-auto">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="p-0">
                    <EmptyStudentsState onClearFilters={resetFilters} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <TablePagination table={table} />
    </div>
  )}