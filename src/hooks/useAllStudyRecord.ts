import { useCallback, useState } from 'react'
import type { StudyRecord } from '../domain/studyRecord'
import { getAllStudyRecords } from '../utils/supabaseFunction'

export const useAllStudyRecord = () => {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRecords = useCallback(async () => {
    setLoading(true)

    try {
      const data = await getAllStudyRecords()

      setStudyRecords(data ?? [])
    } catch (e) {
      alert('学習一覧が取得できません')
      console.log(e)

      setStudyRecords([])
    } finally {
      setLoading(false)
    }
  }, [])

  return { fetchRecords, loading, studyRecords }
}
