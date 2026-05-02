import {
  Button,
  HStack,
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
  onClickUpdate?: (id: T['id']) => void
  onClickDelete?: (id: T['id']) => void
  updateLoading?: boolean
  deleteLoading?: boolean
}

export const TableComponent = <T extends { id: string | number }>(
  props: Props<T>
) => {
  const {
    data,
    columns,
    onClickUpdate,
    onClickDelete,
    updateLoading = false,
    deleteLoading = false,
  } = props

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
            {(onClickUpdate || onClickDelete) && <Th />}
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
              {(onClickUpdate || onClickDelete) && (
                <Td>
                  <HStack justify="flex-end">
                    {onClickUpdate && (
                      <Button
                        size="sm"
                        colorScheme="teal"
                        variant="outline"
                        isLoading={updateLoading}
                        onClick={() => onClickUpdate(row.id)}
                      >
                        更新
                      </Button>
                    )}
                    {onClickDelete && (
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        isLoading={deleteLoading}
                        onClick={() => onClickDelete(row.id)}
                      >
                        削除
                      </Button>
                    )}
                  </HStack>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
