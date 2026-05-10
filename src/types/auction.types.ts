// ─── Auction types ───────────────────────────────────────────────────────────

export interface BidEntry {
  id: string;
  userId: string;
  amount: number;
  timestamp: Date;
}

export interface AuctionProduct {
  id: string;
  name: string;
  basePrice: number;
  quantity: number;
  unit: string;
  imageUrl?: string;
}

export interface LogisticsInfo {
  location: string;
  incoterm: string;
}

export type AuctionType = 'Incremental' | 'Sellado' | 'Inversa';

export type AuctionStatus = 'active' | 'finished';

export interface AuctionData {
  id: string;
  auctionType: AuctionType;
  status: AuctionStatus;
  product: AuctionProduct;
  logistics: LogisticsInfo;
  lastBid: BidEntry;
  myCurrentBid: number;
  currentUserId: string;
  winnerId?: string;         // set when auction is finished
  startTime: Date;
  endsAt: Date;
  bids: BidEntry[];
}

// ─── Component prop types ─────────────────────────────────────────────────────

export interface BiddingPanelProps {
  lastBid: BidEntry;
  myCurrentBid: number;
  basePrice: number;
  status: AuctionStatus;
  currentUserId: string;
  winnerId?: string;
  onPlaceBid: (amount: number) => void;
  onResetBid: () => void;
  onViewRequest?: () => void;
  minBid?: number;
}

export interface CountdownTimerProps {
  endsAt: Date;
  onExpired?: () => void;
}

export interface BidHistoryProps {
  bids: BidEntry[];
  currentUserId?: string;
}

export interface AuctionInfoProps {
  auctionId: string;
  auctionType: AuctionType;
  product: AuctionProduct;
  logistics: LogisticsInfo;
}

export interface AuctionScheduleProps {
  startTime: Date;
  endTime: Date;
}
