import { ChakraProvider } from '@chakra-ui/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { StudyRecordModal } from '../src/components/organisms/studyRecord/StudyRecordModal'

const mockOnSubmit = vi.fn()
const mockOnCompleted = vi.fn()
const mockOnClose = vi.fn()

const renderStudyRecordModal = (props?: {
  modalTitle?: string
  submitLabel?: string
  defaultValues?: { title: string; time: number | undefined }
}) => {
  render(
    <ChakraProvider>
      <StudyRecordModal
        isOpen
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        onCompleted={mockOnCompleted}
        modalTitle={props?.modalTitle ?? '新規登録'}
        submitLabel={props?.submitLabel ?? '登録'}
        defaultValues={props?.defaultValues}
      />
    </ChakraProvider>
  )
}

describe('StudyRecordModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockOnSubmit.mockResolvedValue(true)
    mockOnCompleted.mockResolvedValue(undefined)
  })

  it('新規登録モードでは空の入力欄を表示する', () => {
    renderStudyRecordModal()

    expect(screen.getByRole('button', { name: '登録' })).toBeInTheDocument()
    expect(screen.getByLabelText('学習記録')).toHaveValue('')
    expect(screen.getByLabelText('学習時間')).toHaveValue(null)
  })

  it('更新モードでは渡された値を初期表示する', () => {
    renderStudyRecordModal({
      modalTitle: '更新',
      submitLabel: '更新',
      defaultValues: {
        title: 'React',
        time: 60,
      },
    })

    expect(screen.getByRole('button', { name: '更新' })).toBeInTheDocument()
    expect(screen.getByDisplayValue('React')).toBeInTheDocument()
    expect(screen.getByDisplayValue('60')).toBeInTheDocument()
  })

  it('送信できること', async () => {
    renderStudyRecordModal()

    fireEvent.change(screen.getByLabelText('学習記録'), {
      target: { value: 'React Hooks' },
    })
    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '60' },
    })
    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'React Hooks',
        time: 60,
      })
    })
    expect(mockOnCompleted).toHaveBeenCalledTimes(1)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('学習内容がないときに送信するとエラーが出る', async () => {
    renderStudyRecordModal()

    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '60' },
    })
    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    expect(
      await screen.findByText('学習記録の入力は必須です')
    ).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('学習時間がないときに送信するとエラーが出る', async () => {
    renderStudyRecordModal()

    fireEvent.change(screen.getByLabelText('学習記録'), {
      target: { value: 'React Hooks' },
    })
    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    expect(
      await screen.findByText('学習時間の入力は必須です')
    ).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('0以上でない学習時間を入力するとエラーが出る', async () => {
    renderStudyRecordModal()

    fireEvent.change(screen.getByLabelText('学習記録'), {
      target: { value: 'React Hooks' },
    })
    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '-1' },
    })
    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    expect(await screen.findByText('0以上を入力してください')).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
