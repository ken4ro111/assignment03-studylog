import { useState } from 'react'
import { createStudyRecord } from '../utils/supabaseFunction'
import { useMessage } from './useMessage'

type Props = {
  title: string
  time: number
}

export const useCreateStudyRecord = () => {
  const [loading, setLoading] = useState(false)
  const { showMessage } = useMessage()

  const onClickAdd = async (props: Props) => {
    const { title, time } = props

    setLoading(true)

    try {
      await createStudyRecord({ title, time })

      return true
    } catch (e) {
      // 失敗メッセージを表示
      showMessage({ title: '登録に失敗しました', status: 'error' })
      console.log(e)

      return false
    } finally {
      setLoading(false)
    }
  }

  return { onClickAdd, loading }
}
