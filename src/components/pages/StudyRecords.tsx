import { memo, useEffect } from 'react'
import { TableComponent } from '../atom/TableComponent'
import { PrimaryButton } from '../atom/button/PrimaryButton'
import { Container, useDisclosure } from '@chakra-ui/react'
import { useAllStudyRecord } from '../../hooks/useAllStudyRecord'
import { CreateModal } from '../organisms/studyRecord/CreateModal'

export const StudyRecords = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { fetchRecords, loading, studyRecords } = useAllStudyRecord()

  useEffect(() => {
    // 学習記録一覧を取得
    fetchRecords()
  }, [])

  return (
    <>
      <Container m={0} minW="container.lg">
        {loading ? (
          <p>Loading.....</p>
        ) : (
          <TableComponent
            data={studyRecords}
            columns={[
              { header: '学習記録', accessor: 'title' },
              { header: '学習時間', accessor: 'time' },
            ]}
          />
        )}
      </Container>
      <Container m={4}>
        <PrimaryButton onClick={() => onOpen()}>新規作成</PrimaryButton>
      </Container>
      <CreateModal isOpen={isOpen} onClose={onClose} onCreated={fetchRecords} />
    </>
  )
})
