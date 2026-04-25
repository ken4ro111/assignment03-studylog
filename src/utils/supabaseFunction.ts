import { StudyRecord } from '../domain/studyRecord'
import { supabase } from './supabase'

export const getAllStudyRecords = async (): Promise<StudyRecord[]> => {
  const { data, error } = await supabase.from('study-record').select('*')

  if (error) throw new Error(error.message)

  const studyRecords = (data ?? []).map((record) => {
    return new StudyRecord(
      record.id,
      record.title,
      record.time,
      record.created_at
    )
  })

  return studyRecords
}
