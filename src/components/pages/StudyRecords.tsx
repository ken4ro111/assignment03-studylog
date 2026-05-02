import { memo, useEffect, useState } from 'react'
import { TableComponent } from '../atom/TableComponent'
import { PrimaryButton } from '../atom/button/PrimaryButton'
import { Container, useDisclosure } from '@chakra-ui/react'
import { useAllStudyRecord } from '../../hooks/useAllStudyRecord'
import { useDeleteStudyRecord } from '../../hooks/useDeleteStudyRecord'
import { useMessage } from '../../hooks/useMessage'
import { StudyRecord } from '../../domain/studyRecord'
import { useCreateStudyRecord } from '../../hooks/useCreateStudyRecord'
import { useUpdateStudyRecord } from '../../hooks/useUpdateStudyRecord'
import { StudyRecordModal } from '../organisms/studyRecord/StudyRecordModal'

export const StudyRecords = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { fetchRecords, loading, studyRecords } = useAllStudyRecord()
  const { onClickAdd, loading: createLoading } = useCreateStudyRecord()
  const { onClickUpdate, loading: updateLoading } = useUpdateStudyRecord()
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
    onOpen()
  }

  const handleOpenCreate = () => {
    setSelectedRecord(null)
    onOpen()
  }

  const handleCloseModal = () => {
    onClose()
    setSelectedRecord(null)
  }

  const handleSubmitRecord = async (data: { title: string; time: number }) => {
    if (selectedRecord) {
      return onClickUpdate({
        id: selectedRecord.id,
        data,
      })
    }

    return onClickAdd(data)
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
        <PrimaryButton onClick={handleOpenCreate}>新規登録</PrimaryButton>
      </Container>
      <StudyRecordModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRecord}
        onCompleted={fetchRecords}
        modalTitle={selectedRecord ? '更新' : '新規登録'}
        submitLabel={selectedRecord ? '更新' : '登録'}
        loading={selectedRecord ? updateLoading : createLoading}
        defaultValues={
          selectedRecord
            ? {
                title: selectedRecord.title,
                time: selectedRecord.time,
              }
            : undefined
        }
      />
    </>
  )
})
