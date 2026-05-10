import { useState, useEffect, useCallback } from 'react'
import { Box, Card, CardContent, Typography, Divider } from '@mui/material'
import { History as HistoryIcon } from '@mui/icons-material'
import type { CountdownTimerProps } from '../../types/auction.types'

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

const computeTimeLeft = (endsAt: Date): TimeLeft => {
  const diff = endsAt.getTime() - Date.now()
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true }
  const totalSecs = Math.floor(diff / 1000)
  return {
    hours: Math.floor(totalSecs / 3600),
    minutes: Math.floor((totalSecs % 3600) / 60),
    seconds: totalSecs % 60,
    expired: false,
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export const CountdownTimer = ({ endsAt, onExpired }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(endsAt))

  useEffect(() => {
    setTimeLeft(computeTimeLeft(endsAt))
    const interval = setInterval(() => {
      const next = computeTimeLeft(endsAt)
      setTimeLeft(next)
      if (next.expired) {
        clearInterval(interval)
        onExpired?.()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [endsAt, onExpired])

  const isUrgent = !timeLeft.expired && timeLeft.hours === 0 && timeLeft.minutes < 5
  const digitColor = timeLeft.expired ? 'error.main' : isUrgent ? 'warning.main' : 'text.primary'

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1} mb={1.5}>
          <HistoryIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Tiempo Restante
          </Typography>
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        {/* Clock Display */}
        <Box display="flex" alignItems="flex-start" justifyContent="center" gap={0.5}>
          {[
            { value: timeLeft.hours, label: 'Horas' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Seg' },
          ].map((segment, idx) => (
            <Box key={segment.label} display="flex" alignItems="flex-start" gap={0.5}>
              <Box textAlign="center">
                <Typography
                  component="span"
                  color={digitColor}
                  sx={{
                    fontSize: { xs: '3rem', sm: '3.8rem' },
                    fontWeight: 800,
                    lineHeight: 1,
                    display: 'block',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.02em',
                    animation:
                      isUrgent && timeLeft.seconds % 2 === 0
                        ? 'blink 1s ease-in-out'
                        : 'none',
                    '@keyframes blink': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}
                >
                  {pad(segment.value)}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  {segment.label}
                </Typography>
              </Box>

              {idx < 2 && (
                <Typography
                  color={digitColor}
                  sx={{
                    fontSize: '3.2rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    px: 0.25,
                    opacity: timeLeft.seconds % 2 === 0 ? 1 : 0.25,
                    transition: 'opacity 0.4s ease',
                  }}
                >
                  :
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        {timeLeft.expired && (
          <Typography
            variant="body2"
            color="error"
            fontWeight={600}
            textAlign="center"
            mt={1.5}
          >
            ¡La subasta ha finalizado!
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default CountdownTimer
