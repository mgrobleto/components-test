import { useState, useCallback } from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  IconButton,
  Fade,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material'
import {
  ArrowBack as BackIcon,
  Gavel as AuctionIcon,
} from '@mui/icons-material'
import { BiddingPanel } from '../components/BiddingPanel'
import { CountdownTimer } from '../components/CountdownTimer'
import { BidHistory } from '../components/BidHistory'
import { AuctionInfo } from '../components/AuctionInfo'
import { AuctionSchedule } from '../components/AuctionSchedule'
import type { AuctionData } from '../types/auction.types'

// ─── Demo seed data ───────────────────────────────────────────────────────────

const now = new Date()

const MOCK_ACTIVE: AuctionData = {
  id: 'V-SB-IC-FR-119',
  auctionType: 'Incremental',
  status: 'active',
  currentUserId: 'C-26-DM',
  myCurrentBid: 3500,
  endsAt: new Date(now.getTime() + 2 * 60 * 60 * 1000 + 40 * 60 * 1000 + 59 * 1000),
  startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0, 0),
  product: {
    id: 'FRIJOL-ROJO-001',
    name: 'Oferta de Frijol Rojo Seda Premium',
    basePrice: 2500,
    quantity: 50,
    unit: 'kg',
  },
  logistics: {
    location: 'Nicaragua',
    incoterm: 'Exworks',
  },
  lastBid: {
    id: 'bid-1',
    userId: 'C-25-KM',
    amount: 4001,
    timestamp: new Date(now.getTime() - 2 * 60 * 1000),
  },
  bids: [
    { id: 'bid-1', userId: 'C-25-KM', amount: 4001, timestamp: new Date(now.getTime() - 2 * 60 * 1000) },
    { id: 'bid-2', userId: 'C-26-DM', amount: 3045, timestamp: new Date(now.getTime() - 2 * 60 * 1000) },
    { id: 'bid-3', userId: 'V-25-BM', amount: 3042, timestamp: new Date(now.getTime() - 2 * 60 * 1000) },
    { id: 'bid-4', userId: 'C-25-MS', amount: 3040, timestamp: new Date(now.getTime() - 2 * 60 * 1000) },
  ],
}

const MOCK_FINISHED: AuctionData = {
  ...MOCK_ACTIVE,
  status: 'finished',
  winnerId: 'C-25-MS',
  endsAt: new Date(now.getTime() - 1000), // already expired
  lastBid: {
    id: 'bid-f1',
    userId: 'C-25-MS',
    amount: 2500,
    timestamp: new Date(now.getTime() - 5 * 60 * 1000),
  },
  bids: [
    { id: 'bid-f1', userId: 'C-25-MS', amount: 2100, timestamp: new Date(now.getTime() - 2 * 60 * 1000) },
    { id: 'bid-f2', userId: 'V-25-BM', amount: 2000, timestamp: new Date(now.getTime() - 3 * 60 * 1000) },
    { id: 'bid-f3', userId: 'C-26-DM', amount: 1900, timestamp: new Date(now.getTime() - 4 * 60 * 1000) },
    { id: 'bid-f4', userId: 'C-25-KM', amount: 1500, timestamp: new Date(now.getTime() - 5 * 60 * 1000) },
  ],
}

// ─── Page component ───────────────────────────────────────────────────────────

export const AuctionPage = () => {
  const [simulateFinished, setSimulateFinished] = useState(false)
  const auction = simulateFinished ? MOCK_FINISHED : MOCK_ACTIVE

  const handlePlaceBid = useCallback((amount: number) => {
    console.log('Bid placed:', amount)
    // In a real app: call API / emit websocket event
  }, [])

  const handleResetBid = useCallback(() => {
    console.log('Bid reset')
  }, [])

  const handleViewRequest = useCallback(() => {
    console.log('Navigating to request registry...')
  }, [])

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#eef1f7' }}>
      {/* ── Top Nav Bar ── */}
      <Box
        sx={{
          backgroundColor: '#1a2744',
          px: { xs: 2, md: 4 },
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <AuctionIcon sx={{ fontSize: 22, color: '#fff' }} />
          <Typography
            variant="h6"
            fontWeight={800}
            color="#fff"
            letterSpacing={2}
            sx={{ textTransform: 'uppercase', fontSize: '1rem' }}
          >
            Bagsa Trade
          </Typography>
        </Box>

        {/* Dev toggle */}
        <Tooltip title="Toggle winner state (dev only)" placement="bottom">
          <FormControlLabel
            control={
              <Switch
                checked={simulateFinished}
                onChange={(e) => setSimulateFinished(e.target.checked)}
                size="small"
              />
            }
            label={
              <Typography variant="caption" color="rgba(255,255,255,0.7)" fontWeight={600}>
                {simulateFinished ? 'Finalizada' : 'En Curso'}
              </Typography>
            }
            sx={{ m: 0 }}
          />
        </Tooltip>
      </Box>

      {/* ── Main Content ── */}
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 }, px: { xs: 2, md: 3 } }}>
        {/* Page header */}
        <Box display="flex" alignItems="center" gap={1.5} mb={3}>
          <Breadcrumbs
            separator="/"
            sx={{ '& .MuiBreadcrumbs-separator': { color: 'text.secondary' } }}
          >
            <Link
              underline="hover"
              color="text.secondary"
              href="#"
              variant="body2"
              fontWeight={500}
            >
              Subasta
            </Link>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Pantalla de Subasta Activa
            </Typography>
          </Breadcrumbs>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <IconButton
            size="small"
            sx={{
              backgroundColor: '#fff',
              border: '1px solid rgba(26,58,107,0.12)',
              '&:hover': { backgroundColor: '#f0f5ff' },
            }}
          >
            <BackIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          </IconButton>
          <Typography variant="h5" fontWeight={800} color="primary.main">
            {auction.status === 'active' ? 'Subasta en Curso' : 'Subasta Finalizada'}
          </Typography>
        </Box>

        {/* ── 3-column layout ── */}
        <Grid container spacing={2.5} alignItems="stretch">
          {/* Column 1: Bidding Panel + (finished: Schedule) */}
          <Grid item xs={12} md={4} lg={4}>
            <Box display="flex" flexDirection="column" gap={2.5} height="100%">
              <Fade in key={auction.status} timeout={400}>
                <Box sx={{ flex: auction.status === 'finished' ? 'none' : 1 }}>
                  <BiddingPanel
                    lastBid={auction.lastBid}
                    myCurrentBid={auction.myCurrentBid}
                    basePrice={auction.product.basePrice}
                    status={auction.status}
                    currentUserId={auction.currentUserId}
                    winnerId={auction.winnerId}
                    onPlaceBid={handlePlaceBid}
                    onResetBid={handleResetBid}
                    onViewRequest={handleViewRequest}
                  />
                </Box>
              </Fade>

              {auction.status === 'finished' && (
                <Fade in timeout={500}>
                  <Box>
                    <AuctionSchedule
                      startTime={auction.startTime}
                      endTime={auction.endsAt}
                    />
                  </Box>
                </Fade>
              )}
            </Box>
          </Grid>

          {/* Column 2: Timer + Bid History */}
          <Grid item xs={12} md={4} lg={4}>
            <Box display="flex" flexDirection="column" gap={2.5}>
              <CountdownTimer endsAt={auction.endsAt} />
              <BidHistory bids={auction.bids} currentUserId={auction.currentUserId} />
            </Box>
          </Grid>

          {/* Column 3: Auction Info */}
          <Grid item xs={12} md={4} lg={4}>
            <AuctionInfo
              auctionId={auction.id}
              auctionType={auction.auctionType}
              product={auction.product}
              logistics={auction.logistics}
            />
          </Grid>
        </Grid>

        {/* Footer */}
        <Box textAlign="center" mt={4} pb={2}>
          <Typography variant="caption" color="text.secondary">
            © 2026 BAGSA. Todos los derechos Reservados. &nbsp;·&nbsp; Powered by Sistemática
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default AuctionPage
