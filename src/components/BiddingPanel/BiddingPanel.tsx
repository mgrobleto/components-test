import { useState, useCallback } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Alert,
  InputAdornment,
  IconButton,
  Tooltip,
  Divider,
  Stack,
} from '@mui/material'
import {
  Gavel as GavelIcon,
  Refresh as RefreshIcon,
  EmojiEvents as TrophyIcon,
  Info as InfoIcon,
  WarningAmber as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material'
import type { BiddingPanelProps } from '../../types/auction.types'

const QUICK_AMOUNTS = [100, 500, 1000]

const formatUSD = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)

export const BiddingPanel = ({
  lastBid,
  myCurrentBid,
  basePrice,
  status,
  currentUserId,
  winnerId,
  onPlaceBid,
  onResetBid,
  onViewRequest,
  minBid,
}: BiddingPanelProps) => {
  const [bidAmount, setBidAmount] = useState<number>(myCurrentBid)
  const [error, setError] = useState<string | null>(null)

  const isFinished = status === 'finished'
  const iWon = isFinished && winnerId === currentUserId
  const minimumRequired = minBid ?? lastBid.amount + 1

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, '')
      const parsed = parseFloat(raw)
      if (!isNaN(parsed)) {
        setBidAmount(parsed)
        setError(
          parsed <= lastBid.amount
            ? `Su oferta debe ser mayor a la Última Oferta (${formatUSD(lastBid.amount)})`
            : null,
        )
      }
    },
    [lastBid.amount],
  )

  const handleQuickAdd = useCallback(
    (delta: number) => {
      setBidAmount((prev) => {
        const next = prev + delta
        if (next > lastBid.amount) setError(null)
        return next
      })
    },
    [lastBid.amount],
  )

  const handlePlaceBid = useCallback(() => {
    if (bidAmount <= lastBid.amount) {
      setError(`Su oferta debe ser mayor a la Última Oferta (${formatUSD(lastBid.amount)})`)
      return
    }
    setError(null)
    onPlaceBid(bidAmount)
  }, [bidAmount, lastBid.amount, onPlaceBid])

  const handleReset = useCallback(() => {
    setBidAmount(myCurrentBid)
    setError(null)
    onResetBid()
  }, [myCurrentBid, onResetBid])

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* ── Header ── */}
        <Box display="flex" alignItems="center" gap={1}>
          <GavelIcon sx={{ fontSize: 20, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={700} color="primary.main">
            {isFinished ? 'Ofertar' : 'Ofertar'}
          </Typography>
        </Box>

        <Divider />

        {/* ── Last / Winning Bid ── */}
        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            {isFinished ? 'Última Oferta' : 'Última Oferta'}
          </Typography>

          <Chip
            icon={<TrophyIcon sx={{ fontSize: '14px !important' }} />}
            label={isFinished ? (winnerId ?? lastBid.userId) : lastBid.userId}
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #1a3a6b 0%, #2d5ea8 100%)',
              color: '#fff',
              fontWeight: 600,
              mb: 0.75,
              '& .MuiChip-icon': { color: '#fff' },
            }}
          />

          <Typography
            variant="h4"
            fontWeight={800}
            color="primary.main"
            sx={{ letterSpacing: '-0.02em' }}
          >
            {formatUSD(lastBid.amount)}
          </Typography>
        </Box>

        {/* ── Secondary info row ── */}
        <Box>
          <Typography variant="body2" color="text.secondary" mb={0.25}>
            {isFinished ? 'Precio Base' : 'Mi Oferta Actual'}
          </Typography>
          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
            {formatUSD(isFinished ? basePrice : myCurrentBid)}
          </Typography>
        </Box>

        {/* ── ACTIVE STATE ── */}
        {!isFinished && (
          <>
            <Box>
              <Typography variant="body2" color="text.secondary" mb={0.5}>
                Mi Oferta
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={`USD ${bidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                onChange={handleAmountChange}
                error={!!error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title={`Oferta mínima: ${formatUSD(minimumRequired)}`}>
                        <IconButton size="small" edge="end">
                          <InfoIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography variant="caption" color={error ? 'error' : 'text.secondary'} mt={0.5} display="block">
                {error ?? 'Su oferta debe ser mayor a la Última Oferta'}
              </Typography>
            </Box>

            {/* Quick-add buttons */}
            <Stack direction="row" spacing={1}>
              {QUICK_AMOUNTS.map((amt) => (
                <Button
                  key={amt}
                  variant="outlined"
                  size="small"
                  onClick={() => handleQuickAdd(amt)}
                  sx={{ flex: 1, fontSize: '0.78rem' }}
                >
                  + USD {amt.toLocaleString()}
                </Button>
              ))}
            </Stack>

            {/* Action buttons */}
            <Stack direction="row" spacing={1.5} mt="auto">
              <Button
                variant="contained"
                color="primary"
                startIcon={<GavelIcon />}
                onClick={handlePlaceBid}
                disabled={!!error || bidAmount <= lastBid.amount}
                sx={{ flex: 1, py: 1.1 }}
              >
                Pujar
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={handleReset}
                sx={{ flex: 1, py: 1.1 }}
              >
                Reestablecer Oferta
              </Button>
            </Stack>

            {/* Warning notice */}
            <Alert
              severity="warning"
              icon={<WarningIcon fontSize="inherit" />}
              sx={{ borderRadius: 2, fontSize: '0.75rem' }}
            >
              <Typography variant="caption" lineHeight={1.5}>
                Aviso. La rapidez de las pujas está sujeta a su conexión a internet. La plataforma
                no se hace responsable por problemas de red.
              </Typography>
            </Alert>
          </>
        )}

        {/* ── FINISHED STATE ── */}
        {isFinished && (
          <>
            <Alert
              severity="success"
              icon={<CheckCircleIcon fontSize="inherit" />}
              sx={{ borderRadius: 2 }}
            >
              <Typography variant="caption" lineHeight={1.6}>
                La subasta ha concluido con éxito. El usuario{' '}
                <strong>{winnerId ?? lastBid.userId}</strong> resultó ganador y se iniciará el
                proceso de formalización y seguimiento.
                {iWon && (
                  <Box component="span" display="block" mt={0.5} fontWeight={700}>
                    🎉 ¡Felicidades, usted ganó esta subasta!
                  </Box>
                )}
              </Typography>
            </Alert>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<AssignmentIcon />}
              onClick={onViewRequest}
              sx={{ mt: 'auto', py: 1.3 }}
            >
              Ver Registro de Solicitud
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default BiddingPanel
