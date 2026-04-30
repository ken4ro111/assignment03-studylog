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

type CreateData = {
  title: string
  time: number
}

export const createStudyRecord = async (data: CreateData) => {
  const { title, time } = data

  const { error } = await supabase.from('study-record').insert({ title, time })

  if (error) throw new Error(error.message)
}
