import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { PrimaryButton } from '../../atom/button/PrimaryButton'
import { useCreateStudyRecord } from '../../../hooks/useCreateStudyRecord'
import { useForm } from 'react-hook-form'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreated: () => Promise<void>
}

type StudyFormData = {
  title: string
  time: number
}

export const CreateModal = (props: Props) => {
  const { isOpen, onClose, onCreated } = props
  const { onClickAdd, loading } = useCreateStudyRecord()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<StudyFormData>({
    defaultValues: {
      title: '',
      time: undefined,
    },
  })

  const handleCreate = async (data: StudyFormData) => {
    const isCreated = await onClickAdd(data)
    if (!isCreated) {
      return
    }

    // fetchRecordsを呼ぶ
    await onCreated()
    // モーダルを閉じる
    onClose()
    // フォームの初期化
    reset()
  }

  const onCancel = () => {
    onClose()
    reset()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>登録画面</ModalHeader>
        <form onSubmit={handleSubmit(handleCreate)}>
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl isInvalid={isSubmitted && !!errors.title}>
                <FormLabel>学習記録</FormLabel>
                <Input
                  {...register('title', {
                    required: '学習記録の入力は必須です',
                  })}
                />
                <FormErrorMessage>
                  {isSubmitted && errors.title?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.time}>
                <FormLabel>学習時間</FormLabel>
                <Input
                  {...register('time', {
                    required: '学習時間の入力は必須です',
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: '1以上を入力してください',
                    },
                  })}
                />
                <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mx={2} onClick={onCancel}>
              キャンセル
            </Button>
            <PrimaryButton type="submit" loading={loading}>
              登録
            </PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
