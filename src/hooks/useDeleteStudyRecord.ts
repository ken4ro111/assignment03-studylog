import { useState } from 'react'
import { useMessage } from './useMessage'
import { deleteStudyRecord } from '../utils/supabaseFunction'

export const useDeleteStudyRecord = () => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { showMessage } = useMessage()

  const onClickDelete = async (id: number) => {
    setDeleteLoading(true)

    try {
      await deleteStudyRecord(id)

      return true
    } catch (e) {
      // 失敗メッセージを表示
      showMessage({ title: '削除に失敗しました', status: 'error' })
      console.log(e)

      return false
    } finally {
      setDeleteLoading(false)
    }
  }

  return { onClickDelete, deleteLoading }
}
