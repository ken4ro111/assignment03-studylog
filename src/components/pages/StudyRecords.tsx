import { memo, useEffect } from 'react'
import { TableComponent } from '../atom/TableComponent'
import { PrimaryButton } from '../atom/button/PrimaryButton'
import { Container, useDisclosure } from '@chakra-ui/react'
import { useAllStudyRecord } from '../../hooks/useAllStudyRecord'
import { CreateModal } from '../organisms/studyRecord/CreateModal'
import { useDeleteStudyRecord } from '../../hooks/useDeleteStudyRecord'
import { useMessage } from '../../hooks/useMessage'

export const StudyRecords = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { fetchRecords, loading, studyRecords } = useAllStudyRecord()
  const { onClickDelete, deleteLoading } = useDeleteStudyRecord()
  const { showMessage } = useMessage()

  useEffect(() => {
    // 学習記録一覧を取得
    fetchRecords()
  }, [])

  const handleDelete = async (id: number) => {
    const isCreated = await onClickDelete(id)
    if (!isCreated) {
      return
    }

    await fetchRecords()

    // 成功メッセージを表示
    showMessage({ title: '削除に成功しました', status: 'success' })
  }

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
            onClickUpdate={() => {
              alert('更新')
            }}
            updateLoading={false}
            onClickDelete={handleDelete}
            deleteLoading={deleteLoading}
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
