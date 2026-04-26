import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

type Column<T> = {
  header: string
  accessor: keyof T
  isNumeric?: boolean
}

type Props<T extends { id: string | number }> = {
  data: T[]
  columns: Column<T>[]
}

export const TableComponent = <T extends { id: string | number }>(
  props: Props<T>
) => {
  const { data, columns } = props

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={String(col.accessor)} isNumeric={col.isNumeric}>
                {col.header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              {columns.map((col) => (
                <Td key={String(col.accessor)} isNumeric={col.isNumeric}>
                  {String(row[col.accessor])}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
