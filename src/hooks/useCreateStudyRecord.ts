import { useState } from 'react'
import { createStudyRecord } from '../utils/supabaseFunction'

type Props = {
  title: string
  time: string
}

export const useCreateStudyRecord = (props: Props) => {
  const { title, time } = props
  const timeNumber = Number(time)
  const [loading, setLoading] = useState(false)

  const onClickAdd = async () => {
    if (title === '' || Number.isNaN(timeNumber) || timeNumber <= 0) {
      return false
    }

    setLoading(true)

    try {
      await createStudyRecord({ title, time: timeNumber })

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
