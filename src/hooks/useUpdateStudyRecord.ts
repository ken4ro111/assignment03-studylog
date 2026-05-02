import { useState } from 'react'
import { useMessage } from './useMessage'
import { updateStudyRecord } from '../utils/supabaseFunction'

type Data = {
  title: string
  time: number
}

type Props = {
  id: number
  data: Data
}

export const useUpdateStudyRecord = () => {
  const [loading, setLoading] = useState(false)
  const { showMessage } = useMessage()

  const onClickUpdate = async (props: Props) => {
    const { id, data } = props

    setLoading(true)

    try {
      await updateStudyRecord(id, data)

      // 成功メッセージを表示
      showMessage({ title: '更新に成功しました', status: 'success' })

      return true
    } catch (e) {

      // 失敗メッセージを表示
      showMessage({ title: '更新に失敗しました', status: 'error' })
      console.log(e)

      return false
    } finally {
      setLoading(false)
    }
  }

  return { onClickUpdate, loading }
}
