import { ChakraProvider } from '@chakra-ui/react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { StudyRecord } from '../src/domain/studyRecord'
import { UpdateModal } from '../src/components/organisms/studyRecord/UpdateModal'
import { useUpdateStudyRecord } from '../src/hooks/useUpdateStudyRecord'

vi.mock('../src/hooks/useUpdateStudyRecord', () => ({
  useUpdateStudyRecord: vi.fn(),
}))

const mockOnClickUpdate = vi.fn()
const mockOnUpdated = vi.fn()
const mockOnClose = vi.fn()

const record = new StudyRecord(1, 'React', 60, '2026-04-26T00:00:00Z')

const renderUpdateModal = () => {
  render(
    <ChakraProvider>
      <UpdateModal
        isOpen
        onClose={mockOnClose}
        onUpdated={mockOnUpdated}
        record={record}
      />
    </ChakraProvider>
  )
}

describe('UpdateModal', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    mockOnClickUpdate.mockResolvedValue(true)
    mockOnUpdated.mockResolvedValue(undefined)

    vi.mocked(useUpdateStudyRecord).mockReturnValue({
      onClickUpdate: mockOnClickUpdate,
      loading: false,
    })
  })

  it('更新対象レコードのtitleとtimeを初期値として表示する', () => {
    renderUpdateModal()

    expect(screen.getByDisplayValue('React')).toBeInTheDocument()
    expect(screen.getByDisplayValue('60')).toBeInTheDocument()
  })

  it('更新できること', async () => {
    renderUpdateModal()

    fireEvent.change(screen.getByLabelText('学習記録'), {
      target: { value: 'React Hooks' },
    })
    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '90' },
    })
    fireEvent.click(screen.getByRole('button', { name: '更新' }))

    await waitFor(() => {
      expect(mockOnClickUpdate).toHaveBeenCalledWith({
        id: 1,
        data: {
          title: 'React Hooks',
          time: 90,
        },
      })
    })
    expect(mockOnUpdated).toHaveBeenCalledTimes(1)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('学習内容がないときに更新するとエラーが出る', async () => {
    renderUpdateModal()

    fireEvent.change(screen.getByLabelText('学習記録'), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByRole('button', { name: '更新' }))

    expect(
      await screen.findByText('学習記録の入力は必須です')
    ).toBeInTheDocument()
    expect(mockOnClickUpdate).not.toHaveBeenCalled()
  })

  it('学習時間がないときに更新するとエラーが出る', async () => {
    renderUpdateModal()

    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '' },
    })
    fireEvent.click(screen.getByRole('button', { name: '更新' }))

    expect(
      await screen.findByText('学習時間の入力は必須です')
    ).toBeInTheDocument()
    expect(mockOnClickUpdate).not.toHaveBeenCalled()
  })

  it('0以上でない学習時間を入力するとエラーが出る', async () => {
    renderUpdateModal()

    fireEvent.change(screen.getByLabelText('学習時間'), {
      target: { value: '-1' },
    })
    fireEvent.click(screen.getByRole('button', { name: '更新' }))

    expect(await screen.findByText('0以上を入力してください')).toBeInTheDocument()
    expect(mockOnClickUpdate).not.toHaveBeenCalled()
  })
})
