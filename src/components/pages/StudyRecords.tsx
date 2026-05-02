import { memo, useEffect, useState } from 'react'
import { TableComponent } from '../atom/TableComponent'
import { PrimaryButton } from '../atom/button/PrimaryButton'
import { Container, useDisclosure } from '@chakra-ui/react'
import { useAllStudyRecord } from '../../hooks/useAllStudyRecord'
import { CreateModal } from '../organisms/studyRecord/CreateModal'
import { useDeleteStudyRecord } from '../../hooks/useDeleteStudyRecord'
import { useMessage } from '../../hooks/useMessage'
import { UpdateModal } from '../organisms/studyRecord/UpdateModal'
import { StudyRecord } from '../../domain/studyRecord'

export const StudyRecords = memo(() => {
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure()
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure()
  const { fetchRecords, loading, studyRecords } = useAllStudyRecord()
  const { onClickDelete, deleteLoading } = useDeleteStudyRecord()
  const { showMessage } = useMessage()
  const [selectedRecord, setSelectedRecord] = useState<StudyRecord | null>(null)

  useEffect(() => {
    // 学習記録一覧を取得
    fetchRecords()
  }, [fetchRecords])

  const handleOpenUpdate = (id: number) => {
    const targetRecord = studyRecords.find((record) => record.id === id)

    if (!targetRecord) {
      return
    }

    setSelectedRecord(targetRecord)
    onUpdateOpen()
  }

  const handleCloseUpdate = () => {
    onUpdateClose()
    setSelectedRecord(null)
  }

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
            onClickUpdate={handleOpenUpdate}
            updateLoading={false}
            onClickDelete={handleDelete}
            deleteLoading={deleteLoading}
          />
        )}
      </Container>
      <Container m={4}>
        <PrimaryButton onClick={() => onCreateOpen()}>新規登録</PrimaryButton>
      </Container>
      <CreateModal
        isOpen={isCreateOpen}
        onClose={onCreateClose}
        onCreated={fetchRecords}
      />
      <UpdateModal
        isOpen={isUpdateOpen}
        onClose={handleCloseUpdate}
        onUpdated={fetchRecords}
        record={selectedRecord}
      />
    </>
  )
})
