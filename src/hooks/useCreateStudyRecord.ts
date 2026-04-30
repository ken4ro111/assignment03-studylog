import { useState } from 'react'
import { createStudyRecord } from '../utils/supabaseFunction'

type Props = {
  title: string
  time: number
}

export const useCreateStudyRecord = () => {
  const [loading, setLoading] = useState(false)

  const onClickAdd = async (props: Props) => {
    const { title, time } = props

    setLoading(true)

    try {
      await createStudyRecord({ title, time })

      return true
    } catch (e) {
      alert('学習記録の登録が失敗しました')
      console.log(e)

      return false
    } finally {
      setLoading(false)
    }
  }

  return { onClickAdd, loading }
}
