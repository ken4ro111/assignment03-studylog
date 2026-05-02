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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { StudyRecord } from '../../../domain/studyRecord'
import { useUpdateStudyRecord } from '../../../hooks/useUpdateStudyRecord'
import { PrimaryButton } from '../../atom/button/PrimaryButton'

type Props = {
  isOpen: boolean
  onClose: () => void
  onUpdated: () => Promise<void>
  record: StudyRecord | null
}

type StudyFormData = {
  title: string
  time: number | undefined
}

const emptyValues: StudyFormData = {
  title: '',
  time: undefined,
}

export const UpdateModal = (props: Props) => {
  const { isOpen, onClose, onUpdated, record } = props
  const { onClickUpdate, loading } = useUpdateStudyRecord()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<StudyFormData>({
    defaultValues: emptyValues,
  })

  useEffect(() => {
    if (isOpen && record) {
      reset({
        title: record.title,
        time: record.time,
      })

      return
    }

    if (!isOpen) {
      reset(emptyValues)
    }
  }, [isOpen, record, reset])

  const handleUpdate = async (data: StudyFormData) => {
    if (!record || data.time === undefined) {
      return
    }

    const isUpdated = await onClickUpdate({
      id: record.id,
      data: {
        title: data.title,
        time: data.time,
      },
    })
    if (!isUpdated) {
      return
    }

    await onUpdated()
    onClose()
    reset(emptyValues)
  }

  const onCancel = () => {
    onClose()
    reset(emptyValues)
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
        <ModalHeader>更新</ModalHeader>
        <form onSubmit={handleSubmit(handleUpdate)}>
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
              <FormControl isInvalid={isSubmitted && !!errors.time}>
                <FormLabel>学習時間</FormLabel>
                <Input
                  type="number"
                  {...register('time', {
                    required: '学習時間の入力は必須です',
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: '0以上を入力してください',
                    },
                  })}
                />
                <FormErrorMessage>
                  {isSubmitted && errors.time?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mx={2} onClick={onCancel}>
              キャンセル
            </Button>
            <PrimaryButton type="submit" loading={loading}>
              更新
            </PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
