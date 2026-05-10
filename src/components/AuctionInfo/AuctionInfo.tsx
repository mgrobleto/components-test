import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Chip,
  Grid,
} from '@mui/material'
import {
  Inventory as ProductIcon,
  LocalShipping as LogisticsIcon,
  Tag as IdIcon,
  TrendingUp as TypeIcon,
} from '@mui/icons-material'
import type { AuctionInfoProps } from '../../types/auction.types'

const formatUSD = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)

interface InfoRowProps {
  label: string
  value: React.ReactNode
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <Box>
    <Typography variant="caption" color="text.secondary" fontWeight={500}>
      {label}
    </Typography>
    <Box mt={0.25}>
      {typeof value === 'string' ? (
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {value}
        </Typography>
      ) : (
        value
      )}
    </Box>
  </Box>
)

export const AuctionInfo = ({ auctionId, auctionType, product, logistics }: AuctionInfoProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Product Image */}
      {product.imageUrl ? (
        <CardMedia
          component="img"
          height="160"
          image={product.imageUrl}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 160,
            background: 'linear-gradient(135deg, #1a2744 0%, #2d4a8a 50%, #1a3a6b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProductIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.35)' }} />
        </Box>
      )}

      <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* ── Auction Information ── */}
        <Box>
          <Box display="flex" alignItems="center" gap={0.75} mb={1}>
            <ProductIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              Información de la Subasta
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight={800} color="text.primary" lineHeight={1.3} mb={1.5}>
            {product.name}
          </Typography>

          <Box display="flex" flexDirection="column" gap={1.2}>
            <InfoRow
              label="ID de Subasta"
              value={
                <Chip
                  icon={<IdIcon sx={{ fontSize: '12px !important' }} />}
                  label={auctionId}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(26,58,107,0.3)',
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    height: 22,
                    '& .MuiChip-icon': { color: 'primary.main' },
                  }}
                />
              }
            />

            <InfoRow
              label="Tipo de Subasta"
              value={
                <Chip
                  icon={<TypeIcon sx={{ fontSize: '12px !important' }} />}
                  label={auctionType}
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #1a3a6b 0%, #2d5ea8 100%)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.72rem',
                    height: 22,
                    '& .MuiChip-icon': { color: '#fff' },
                  }}
                />
              }
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InfoRow label="Precio Base" value={formatUSD(product.basePrice)} />
              </Grid>
              <Grid item xs={6}>
                <InfoRow label="Cantidad" value={`${product.quantity} ${product.unit}`} />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Divider />

        {/* ── Logistics Information ── */}
        <Box>
          <Box display="flex" alignItems="center" gap={0.75} mb={1.5}>
            <LogisticsIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              Información Logística
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InfoRow label="Ubicación de la Oferta" value={logistics.location} />
            </Grid>
            <Grid item xs={6}>
              <InfoRow label="Incoterm" value={logistics.incoterm} />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AuctionInfo
