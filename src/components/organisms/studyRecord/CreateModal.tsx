import { useCreateStudyRecord } from '../../../hooks/useCreateStudyRecord'
import { StudyRecordModal } from './StudyRecordModal'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreated: () => Promise<void>
}

export const CreateModal = (props: Props) => {
  const { isOpen, onClose, onCreated } = props
  const { onClickAdd, loading } = useCreateStudyRecord()

  return (
    <StudyRecordModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onClickAdd}
      onCompleted={onCreated}
      modalTitle="新規登録"
      submitLabel="登録"
      loading={loading}
    />
  )
}
