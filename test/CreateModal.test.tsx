import { ChakraProvider } from '@chakra-ui/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CreateModal } from '../src/components/organisms/studyRecord/CreateModal'
import { useCreateStudyRecord } from '../src/hooks/useCreateStudyRecord'
import { useMessage } from '../src/hooks/useMessage'

vi.mock('../src/hooks/useCreateStudyRecord', () => ({
  useCreateStudyRecord: vi.fn(),
}))

vi.mock('../src/hooks/useMessage', () => ({
  useMessage: vi.fn(),
}))

const mockOnClickAdd = vi.fn()
const mockOnCreated = vi.fn()
const mockOnClose = vi.fn()
const mockShowMessage = vi.fn()

const renderCreateModal = () => {
  render(
    <ChakraProvider>
      <CreateModal
        isOpen
        onClose={mockOnClose}
        onCreated={mockOnCreated}
      />
    </ChakraProvider>
  )
}

describe('CreateModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockOnClickAdd.mockResolvedValue(true)
    mockOnCreated.mockResolvedValue(undefined)

    vi.mocked(useCreateStudyRecord).mockReturnValue({
      onClickAdd: mockOnClickAdd,
      loading: false,
    })
    vi.mocked(useMessage).mockReturnValue({
      showMessage: mockShowMessage,
    })
  })

  it('登録できること', async () => {
    renderCreateModal()

    fireEvent.change(screen.getByLabelText('学習記録'), {
      target: { value: 'React Hooks' },
    })
    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '60' },
    })
    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    await waitFor(() => {
      expect(mockOnClickAdd).toHaveBeenCalledWith({
        title: 'React Hooks',
        time: 60,
      })
    })
    expect(mockOnCreated).toHaveBeenCalledTimes(1)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('学習内容がないときに登録するとエラーが出る', async () => {
    renderCreateModal()

    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '60' },
    })
    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    expect(
      await screen.findByText('学習記録の入力は必須です')
    ).toBeInTheDocument()
    expect(mockOnClickAdd).not.toHaveBeenCalled()
  })

  it('学習時間がないときに登録するとエラーが出る', async () => {
    renderCreateModal()

    fireEvent.change(screen.getByLabelText('学習記録'), {
      target: { value: 'React Hooks' },
    })
    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    expect(
      await screen.findByText('学習時間の入力は必須です')
    ).toBeInTheDocument()
    expect(mockOnClickAdd).not.toHaveBeenCalled()
  })

  it('未入力のときに必須エラーを表示する', async () => {
    renderCreateModal()

    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    expect(
      await screen.findByText('学習記録の入力は必須です')
    ).toBeInTheDocument()
    expect(screen.getByText('学習時間の入力は必須です')).toBeInTheDocument()
    expect(mockOnClickAdd).not.toHaveBeenCalled()
  })

  it('0以上でない学習時間を入力するとエラーが出る', async () => {
    renderCreateModal()

    fireEvent.change(screen.getByLabelText('学習記録'), {
      target: { value: 'React Hooks' },
    })
    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '-1' },
    })
    fireEvent.click(screen.getByRole('button', { name: '登録' }))

    expect(await screen.findByText('0以上を入力してください')).toBeInTheDocument()
    expect(mockOnClickAdd).not.toHaveBeenCalled()
  })
})
