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

type Data = {
  title: string
  time: number
}

export const createStudyRecord = async (data: Data) => {
  const { title, time } = data

  const { error } = await supabase.from('study-record').insert({ title, time })

  if (error) throw new Error(error.message)
}

export const updateStudyRecord = async (id: number, data: Data) => {
  const { title, time } = data

  const { error } = await supabase
    .from('study-record')
    .update({ title, time })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export const deleteStudyRecord = async (id: number) => {
  const { error } = await supabase.from('study-record').delete().eq('id', id)

  if (error) throw new Error(error.message)
}
