import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { PrimaryButton } from '../../atom/button/PrimaryButton'
import { useCreateStudyRecord } from '../../../hooks/useCreateStudyRecord'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreated: () => Promise<void>
}

export const CreateModal = (props: Props) => {
  const { isOpen, onClose, onCreated } = props

  const [title, setTitle] = useState('')
  const [time, setTime] = useState('0')

  const { onClickAdd, loading } = useCreateStudyRecord({ title, time })

  const handleChange =
    (setFunc: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFunc(e.target.value)
    }

  const handleSubmit = async () => {
    const isCreated = await onClickAdd()
    if (!isCreated) {
      return
    }

    await onCreated()
    onClose()

    setTitle('')
    setTime('0')
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
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>学習記録</FormLabel>
              <Input value={title} onChange={handleChange(setTitle)} />
            </FormControl>
            <FormControl>
              <FormLabel>学習時間</FormLabel>
              <Input value={time} onChange={handleChange(setTime)} />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button mx={2} onClick={onClose}>
            キャンセル
          </Button>
          <PrimaryButton onClick={handleSubmit} loading={loading}>
            登録
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
