import { useMemo } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  Avatar,
  Chip,
} from '@mui/material'
import {
  History as HistoryIcon,
  EmojiEvents as TrophyIcon,
  Gavel as GavelIcon,
} from '@mui/icons-material'
import type { BidHistoryProps } from '../../types/auction.types'

const formatUSD = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)

const timeAgo = (date: Date): string => {
  const diffSecs = Math.floor((Date.now() - date.getTime()) / 1000)
  if (diffSecs < 60) return `hace ${diffSecs} seg`
  const diffMins = Math.floor(diffSecs / 60)
  if (diffMins < 60) return `hace ${diffMins} min`
  return `hace ${Math.floor(diffMins / 60)} h`
}

export const BidHistory = ({ bids, currentUserId }: BidHistoryProps) => {
  const sortedBids = useMemo(() => [...bids].sort((a, b) => b.amount - a.amount), [bids])

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1} mb={1.5}>
          <HistoryIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Historial de Pujas
          </Typography>
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        <List disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {sortedBids.map((bid, index) => {
            const isHighest = index === 0
            const isMe = bid.userId === currentUserId

            return (
              <ListItem
                key={bid.id}
                disablePadding
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  backgroundColor: isHighest ? 'rgba(26,58,107,0.04)' : '#fafbff',
                  borderRadius: 2,
                  px: 1.5,
                  py: 1,
                  border: '1px solid',
                  borderColor: isHighest ? 'rgba(26,58,107,0.12)' : 'rgba(0,0,0,0.06)',
                }}
              >
                {/* Avatar */}
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: isHighest
                      ? 'linear-gradient(135deg, #1a3a6b 0%, #2d5ea8 100%)'
                      : 'linear-gradient(135deg, #3b7dd8 0%, #6fa3e8 100%)',
                    flexShrink: 0,
                  }}
                >
                  {isHighest
                    ? <TrophyIcon sx={{ fontSize: 16 }} />
                    : <GavelIcon sx={{ fontSize: 16 }} />
                  }
                </Avatar>

                {/* User + time */}
                <Box flex={1} minWidth={0}>
                  <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap">
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      noWrap
                      color={isHighest ? 'primary.main' : 'text.primary'}
                    >
                      {bid.userId}
                    </Typography>
                    {isHighest && (
                      <Chip
                        label="Líder"
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          background: 'linear-gradient(135deg, #1a3a6b 0%, #2d5ea8 100%)',
                          color: '#fff',
                        }}
                      />
                    )}
                    {isMe && !isHighest && (
                      <Chip
                        label="Yo"
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(59,125,216,0.15)',
                          color: '#2d5ea8',
                        }}
                      />
                    )}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {timeAgo(bid.timestamp)}
                  </Typography>
                </Box>

                {/* Amount */}
                <Typography
                  variant="subtitle1"
                  fontWeight={800}
                  color={isHighest ? 'primary.main' : 'text.primary'}
                  flexShrink={0}
                >
                  {formatUSD(bid.amount)}
                </Typography>
              </ListItem>
            )
          })}

          {sortedBids.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body2" color="text.secondary">
                Aún no hay pujas registradas.
              </Typography>
            </Box>
          )}
        </List>
      </CardContent>
    </Card>
  )
}

export default BidHistory
