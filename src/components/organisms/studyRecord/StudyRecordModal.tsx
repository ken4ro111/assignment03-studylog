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
import { PrimaryButton } from '../../atom/button/PrimaryButton'

export type StudyRecordFormValues = {
  title: string
  time: number | undefined
}

export type StudyRecordSubmitData = {
  title: string
  time: number
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: StudyRecordSubmitData) => Promise<boolean>
  onCompleted?: () => Promise<void> | void
  modalTitle: string
  submitLabel: string
  loading?: boolean
  defaultValues?: StudyRecordFormValues
}

const emptyValues: StudyRecordFormValues = {
  title: '',
  time: undefined,
}

export const StudyRecordModal = (props: Props) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    onCompleted,
    modalTitle,
    submitLabel,
    loading = false,
    defaultValues,
  } = props

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<StudyRecordFormValues>({
    defaultValues: emptyValues,
  })

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues ?? emptyValues)
      return
    }

    reset(emptyValues)
  }, [defaultValues, isOpen, reset])

  const handleSave = async (data: StudyRecordFormValues) => {
    if (data.time === undefined) {
      return
    }

    const isCompleted = await onSubmit({
      title: data.title,
      time: data.time,
    })
    if (!isCompleted) {
      return
    }

    await onCompleted?.()
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
        <ModalHeader>{modalTitle}</ModalHeader>
        <form onSubmit={handleSubmit(handleSave)}>
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
              {submitLabel}
            </PrimaryButton>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
