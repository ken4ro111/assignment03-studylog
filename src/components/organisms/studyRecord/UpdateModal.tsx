import { StudyRecord } from '../../../domain/studyRecord'
import { useUpdateStudyRecord } from '../../../hooks/useUpdateStudyRecord'
import {
  StudyRecordModal,
  type StudyRecordSubmitData,
} from './StudyRecordModal'

type Props = {
  isOpen: boolean
  onClose: () => void
  onUpdated: () => Promise<void>
  record: StudyRecord | null
}

export const UpdateModal = (props: Props) => {
  const { isOpen, onClose, onUpdated, record } = props
  const { onClickUpdate, loading } = useUpdateStudyRecord()

  const handleUpdate = async (data: StudyRecordSubmitData) => {
    if (!record) {
      return false
    }

    const isUpdated = await onClickUpdate({
      id: record.id,
      data,
    })

    return isUpdated
  }

  return (
    <StudyRecordModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleUpdate}
      onCompleted={onUpdated}
      modalTitle="更新"
      submitLabel="更新"
      loading={loading}
      defaultValues={
        record
          ? {
              title: record.title,
              time: record.time,
            }
          : undefined
      }
    />
  )
}
