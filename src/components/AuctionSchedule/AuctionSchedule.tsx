import { Box, Card, CardContent, Typography, Divider } from '@mui/material'
import { Schedule as ScheduleIcon } from '@mui/icons-material'
import type { AuctionScheduleProps } from '../../types/auction.types'

const formatTime = (date: Date): string =>
  date.toLocaleTimeString('es-NI', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  })

export const AuctionSchedule = ({ startTime, endTime }: AuctionScheduleProps) => {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1} mb={1.5}>
          <ScheduleIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Horario de Subasta
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box display="flex" flexDirection="column" gap={1.5}>
          {/* Start */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Hora de Inicio
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {formatTime(startTime)}
            </Typography>
          </Box>

          <Divider />

          {/* End */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Hora de Finalización
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {formatTime(endTime)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AuctionSchedule
