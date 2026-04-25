import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import type { StudyRecord } from './domain/studyRecord'
import { getAllStudyRecords } from './utils/supabaseFunction'

function App() {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([])

  useEffect(() => {
    const fetchRecords = async () => {
      const records = await getAllStudyRecords()

      setStudyRecords(records)
    }

    fetchRecords()
  }, [])
  return (
    <div>
      <h1>学習記録一覧</h1>
      <ul>
        {studyRecords.map((record) => (
          <li key={record.id}>
            {record.title} : {record.time}
          </li>
        ))}
      </ul>
      <Button colorScheme="teal">ボタン</Button>
    </div>
  )
}

export default App
