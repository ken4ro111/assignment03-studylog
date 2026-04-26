import { memo, useEffect, useState } from 'react'
import { TableComponent } from '../atom/TableComponent'
import type { StudyRecord } from '../../domain/studyRecord'
import { getAllStudyRecords } from '../../utils/supabaseFunction'
import { PrimaryButton } from '../atom/button/PrimaryButton'
import { Container } from '@chakra-ui/react'

export const StudyRecords = memo(() => {
  const [studyRecords, setStudyRecords] = useState<StudyRecord[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const fetchRecords = async () => {
      const records = await getAllStudyRecords()

      setStudyRecords(records)
    }

    fetchRecords()

    setLoading(false)
  }, [])

  return (
    <>
      <Container m={0} minW="container.lg">
        {loading ? (
          <p>Loading.....</p>
        ) : (
          <TableComponent
            data={studyRecords}
            columns={[
              { header: '学習記録', accessor: 'title' },
              { header: '学習時間', accessor: 'time' },
            ]}
          />
        )}
      </Container>
      <Container m={4}>
        <PrimaryButton onClick={() => alert()}>新規作成</PrimaryButton>
      </Container>
    </>
  )
})
