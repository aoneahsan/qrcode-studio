import type { PluginListenerHandle } from '@capacitor/core';

/**
 * QRCode Studio Plugin Interface
 */
export interface QRCodeStudioPlugin {
  /**
   * Check if the device has camera permissions
   */
  checkPermissions(): Promise<PermissionStatus>;
  
  /**
   * Request camera permissions for scanning
   */
  requestPermissions(): Promise<PermissionStatus>;
  
  /**
   * Start QR code scanning
   */
  startScan(options?: ScanOptions): Promise<void>;
  
  /**
   * Stop QR code scanning
   */
  stopScan(): Promise<void>;
  
  /**
   * Generate a QR code
   */
  generate(options: GenerateOptions): Promise<QRCodeResult>;
  
  /**
   * Save QR code to device storage
   */
  saveQRCode(options: SaveOptions): Promise<SaveResult>;
  
  /**
   * Get QR code history
   */
  getHistory(options?: HistoryOptions): Promise<HistoryResult>;
  
  /**
   * Clear QR code history
   */
  clearHistory(): Promise<void>;
  
  /**
   * Get analytics for a QR code
   */
  getAnalytics(options: AnalyticsOptions): Promise<AnalyticsResult>;
  
  /**
   * Add a listener for scan results
   */
  addListener(
    eventName: 'scanResult',
    listenerFunc: (data: ScanResult) => void,
  ): Promise<PluginListenerHandle>;
  
  /**
   * Add a listener for scan errors
   */
  addListener(
    eventName: 'scanError',
    listenerFunc: (error: ScanError) => void,
  ): Promise<PluginListenerHandle>;
  
  /**
   * Remove all listeners
   */
  removeAllListeners(): Promise<void>;
}

/**
 * Permission status
 */
export interface PermissionStatus {
  camera: PermissionState;
}

export type PermissionState = 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied';

/**
 * Scan options
 */
export interface ScanOptions {
  /**
   * Show torch/flashlight button
   */
  showTorchButton?: boolean;
  
  /**
   * Show flip camera button
   */
  showFlipCameraButton?: boolean;
  
  /**
   * Scan delay in milliseconds
   */
  scanDelay?: number;
  
  /**
   * Camera to use ('front' or 'back')
   */
  camera?: 'front' | 'back';
  
  /**
   * Formats to scan (default: all)
   */
  formats?: BarcodeFormat[];
  
  /**
   * Video element styling options for web platform
   */
  videoStyle?: {
    position?: string;
    top?: string;
    left?: string;
    width?: string;
    height?: string;
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    zIndex?: string;
  };
  
  /**
   * Calculate scan region as QR-Scanner.ScanRegion based on video dimensions
   */
  calculateScanRegion?: (video: HTMLVideoElement) => { x: number; y: number; width: number; height: number };
  
  /**
   * Overlay element to display on top of video (web only)
   */
  overlay?: HTMLDivElement;
  
  /**
   * Highlight code outline on scan (web only)
   * @default true
   */
  highlightCodeOutline?: boolean;
  
  /**
   * Highlight scan region (web only)
   * @default true
   */
  highlightScanRegion?: boolean;
  
  /**
   * Max scans per second (web only)
   * @default 5
   */
  maxScansPerSecond?: number;
}

/**
 * Barcode formats
 */
export enum BarcodeFormat {
  QR_CODE = 'QR_CODE',
  DATA_MATRIX = 'DATA_MATRIX',
  AZTEC = 'AZTEC',
  PDF_417 = 'PDF_417',
  CODE_128 = 'CODE_128',
  CODE_39 = 'CODE_39',
  CODE_93 = 'CODE_93',
  CODABAR = 'CODABAR',
  EAN_13 = 'EAN_13',
  EAN_8 = 'EAN_8',
  ITF = 'ITF',
  UPC_A = 'UPC_A',
  UPC_E = 'UPC_E',
}

/**
 * Scan result
 */
export interface ScanResult {
  /**
   * The scanned content
   */
  content: string;
  
  /**
   * The format of the scanned code
   */
  format: BarcodeFormat;
  
  /**
   * The detected QR type
   */
  type?: QRType;
  
  /**
   * Parsed data based on type
   */
  parsedData?: QRData;
  
  /**
   * Timestamp of scan
   */
  timestamp: number;
}

/**
 * Scan error
 */
export interface ScanError {
  code: string;
  message: string;
}

/**
 * QR code types
 */
export enum QRType {
  WEBSITE = 'website',
  PDF = 'pdf',
  IMAGES = 'images',
  VIDEO = 'video',
  WIFI = 'wifi',
  MENU = 'menu',
  BUSINESS = 'business',
  VCARD = 'vcard',
  MP3 = 'mp3',
  APPS = 'apps',
  LINKS_LIST = 'links_list',
  COUPON = 'coupon',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  SOCIAL_MEDIA = 'social_media',
  WHATSAPP = 'whatsapp',
  TEXT = 'text',
  EMAIL = 'email',
  SMS = 'sms',
  PHONE = 'phone',
  LOCATION = 'location',
  EVENT = 'event',
}

/**
 * QR data based on type
 */
export type QRData =
  | WebsiteData
  | PDFData
  | ImagesData
  | VideoData
  | WiFiData
  | MenuData
  | BusinessData
  | VCardData
  | MP3Data
  | AppsData
  | LinksListData
  | CouponData
  | FacebookData
  | InstagramData
  | SocialMediaData
  | WhatsAppData
  | TextData
  | EmailData
  | SMSData
  | PhoneData
  | LocationData
  | EventData;

export interface WebsiteData {
  url: string;
  title?: string;
  description?: string;
}

export interface PDFData {
  url: string;
  title?: string;
  description?: string;
}

export interface ImagesData {
  images: Array<{
    url: string;
    caption?: string;
  }>;
  title?: string;
  description?: string;
}

export interface VideoData {
  url: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

export interface WiFiData {
  ssid: string;
  password?: string;
  security: 'WEP' | 'WPA' | 'WPA2' | 'WPA3' | 'nopass';
  hidden?: boolean;
}

export interface MenuData {
  restaurantName: string;
  categories: Array<{
    name: string;
    items: Array<{
      name: string;
      description?: string;
      price: string;
      image?: string;
    }>;
  }>;
  currency?: string;
}

export interface BusinessData {
  name: string;
  industry?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  description?: string;
  hours?: string;
  logo?: string;
}

export interface VCardData {
  firstName?: string;
  lastName?: string;
  organization?: string;
  title?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  website?: string;
  address?: string;
  note?: string;
}

export interface MP3Data {
  url: string;
  title?: string;
  artist?: string;
  album?: string;
  coverArt?: string;
}

export interface AppsData {
  appStoreUrl?: string;
  playStoreUrl?: string;
  windowsStoreUrl?: string;
  customUrl?: string;
  appName?: string;
  description?: string;
  icon?: string;
}

export interface LinksListData {
  title?: string;
  links: Array<{
    title: string;
    url: string;
    icon?: string;
  }>;
}

export interface CouponData {
  code: string;
  description?: string;
  discount?: string;
  validUntil?: string;
  terms?: string;
  logo?: string;
}

export interface FacebookData {
  pageUrl: string;
  pageName?: string;
}

export interface InstagramData {
  profileUrl: string;
  username?: string;
}

export interface SocialMediaData {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  pinterest?: string;
  snapchat?: string;
  reddit?: string;
  [key: string]: string | undefined;
}

export interface WhatsAppData {
  phoneNumber: string;
  message?: string;
}

export interface TextData {
  text: string;
}

export interface EmailData {
  to: string;
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
}

export interface SMSData {
  phoneNumber: string;
  message?: string;
}

export interface PhoneData {
  phoneNumber: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  name?: string;
}

export interface EventData {
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  url?: string;
}

/**
 * Generate options
 */
export interface GenerateOptions {
  /**
   * QR code type
   */
  type: QRType;
  
  /**
   * Data for the QR code
   */
  data: QRData;
  
  /**
   * Design options
   */
  design?: QRDesignOptions;
  
  /**
   * Size in pixels (default: 300)
   */
  size?: number;
  
  /**
   * Error correction level (L=7%, M=15%, Q=25%, H=30%)
   * @default 'M'
   */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  
  /**
   * Landing page options
   */
  landingPage?: LandingPageOptions;
  
  /**
   * QR Code version. If not specified the more suitable value will be calculated.
   * Valid values: 1-40
   */
  version?: number;
  
  /**
   * Mask pattern used to mask the symbol (0-7).
   * If not specified the more suitable value will be calculated.
   */
  maskPattern?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  
  /**
   * Define how much wide the quiet zone should be.
   * @default 4
   */
  margin?: number;
  
  /**
   * Scale factor. A value of 1 means 1px per modules (black dots).
   * @default 4
   */
  scale?: number;
  
  /**
   * Forces a specific width for the output image.
   * If width is too small to contain the qr symbol, this option will be ignored.
   * Takes precedence over `scale`.
   */
  width?: number;
  
  /**
   * Helper function used internally to convert a kanji to its Shift JIS value.
   * Provide this function if you need support for Kanji mode.
   */
  toSJISFunc?: (codePoint: string) => number;
}

/**
 * QR design options
 */
export interface QRDesignOptions {
  /**
   * Colors
   */
  colors?: {
    dark?: string;
    light?: string;
  };
  
  /**
   * Logo options
   */
  logo?: {
    src: string;
    size?: number;
    margin?: number;
    borderRadius?: number;
  };
  
  /**
   * Frame options
   */
  frame?: {
    style: FrameStyle;
    text?: string;
    color?: string;
    textColor?: string;
  };
  
  /**
   * Dots style
   */
  dotsStyle?: DotsStyle;
  
  /**
   * Corner square style
   */
  cornersSquareStyle?: CornerStyle;
  
  /**
   * Corner dots style
   */
  cornersDotStyle?: CornerStyle;
  
  /**
   * Background image
   */
  backgroundImage?: string;
  
  /**
   * Image size (0-1)
   */
  imageSize?: number;
  
  /**
   * Margin in modules
   */
  margin?: number;
}

export type FrameStyle = 
  | 'square'
  | 'rounded'
  | 'circle'
  | 'banner'
  | 'box'
  | 'bubble'
  | 'custom';

export type DotsStyle = 
  | 'square'
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded';

export type CornerStyle = 
  | 'square'
  | 'dot'
  | 'extra-rounded';

/**
 * Landing page options
 */
export interface LandingPageOptions {
  /**
   * Enable landing page
   */
  enabled: boolean;
  
  /**
   * Template to use
   */
  template?: string;
  
  /**
   * Customization options
   */
  customization?: {
    colors?: ColorScheme;
    fonts?: FontConfig;
    layout?: LayoutOptions;
  };
  
  /**
   * Page content
   */
  content?: PageContent;
  
  /**
   * Enable analytics
   */
  analytics?: boolean;
  
  /**
   * Custom domain
   */
  customDomain?: string;
}

export interface ColorScheme {
  primary?: string;
  secondary?: string;
  background?: string;
  text?: string;
}

export interface FontConfig {
  heading?: string;
  body?: string;
}

export interface LayoutOptions {
  style?: 'modern' | 'classic' | 'minimal' | 'bold';
  alignment?: 'left' | 'center' | 'right';
}

export interface PageContent {
  title?: string;
  description?: string;
  buttons?: Array<{
    text: string;
    url: string;
    style?: 'primary' | 'secondary' | 'outline';
  }>;
  sections?: Array<{
    type: 'text' | 'image' | 'video' | 'map' | 'contact';
    content: any;
  }>;
}

/**
 * QR code result
 */
export interface QRCodeResult {
  /**
   * Base64 encoded image
   */
  base64?: string;
  
  /**
   * SVG string
   */
  svg?: string;
  
  /**
   * Data URL
   */
  dataUrl?: string;
  
  /**
   * QR code ID for tracking
   */
  id: string;
  
  /**
   * Landing page URL if enabled
   */
  landingPageUrl?: string;
  
  /**
   * Short URL
   */
  shortUrl?: string;
}

/**
 * Save options
 */
export interface SaveOptions {
  /**
   * QR code data to save
   */
  qrCode: QRCodeResult;
  
  /**
   * File name
   */
  fileName?: string;
  
  /**
   * Format to save
   */
  format?: ExportFormat;
  
  /**
   * Directory to save to
   */
  directory?: Directory;
}

/**
 * Export formats for QR codes
 * Note: PDF, GIF, EPS, and WMF formats require additional libraries and are not yet implemented
 */
export type ExportFormat = 
  | 'png'    // Supported on all platforms
  | 'jpg'    // Supported on all platforms
  | 'svg'    // Supported on all platforms
  | 'pdf'    // Not yet implemented - requires additional library
  | 'gif'    // Not yet implemented - requires additional library
  | 'json'   // Supported on all platforms
  | 'webp'   // Supported on modern browsers
  | 'eps'    // Not yet implemented - requires additional library
  | 'wmf';   // Not yet implemented - requires additional library

export enum Directory {
  Documents = 'DOCUMENTS',
  Downloads = 'DOWNLOADS',
  External = 'EXTERNAL',
  ExternalStorage = 'EXTERNAL_STORAGE',
}

/**
 * Save result
 */
export interface SaveResult {
  /**
   * Saved file URI
   */
  uri: string;
  
  /**
   * File path
   */
  path?: string;
}

/**
 * History options
 */
export interface HistoryOptions {
  /**
   * Type filter
   */
  type?: QRType;
  
  /**
   * Date range filter
   */
  dateRange?: {
    start: Date;
    end: Date;
  };
  
  /**
   * Limit results
   */
  limit?: number;
  
  /**
   * Offset for pagination
   */
  offset?: number;
}

/**
 * History result
 */
export interface HistoryResult {
  /**
   * History items
   */
  items: HistoryItem[];
  
  /**
   * Total count
   */
  total: number;
}

/**
 * History item
 */
export interface HistoryItem {
  /**
   * Item ID
   */
  id: string;
  
  /**
   * QR type
   */
  type: QRType;
  
  /**
   * QR data
   */
  data: QRData;
  
  /**
   * Created timestamp
   */
  createdAt: number;
  
  /**
   * QR code result
   */
  qrCode?: QRCodeResult;
  
  /**
   * Scan count
   */
  scanCount?: number;
  
  /**
   * Is favorite
   */
  isFavorite?: boolean;
}

/**
 * Analytics options
 */
export interface AnalyticsOptions {
  /**
   * QR code ID
   */
  qrCodeId: string;
  
  /**
   * Date range
   */
  dateRange?: {
    start: Date;
    end: Date;
  };
  
  /**
   * Metrics to include
   */
  metrics?: AnalyticsMetric[];
}

export type AnalyticsMetric = 
  | 'scans'
  | 'unique_scans'
  | 'locations'
  | 'devices'
  | 'time_distribution'
  | 'referrers';

/**
 * Analytics result
 */
export interface AnalyticsResult {
  /**
   * Total scans
   */
  totalScans: number;
  
  /**
   * Unique scans
   */
  uniqueScans: number;
  
  /**
   * Scan locations
   */
  locations?: Array<{
    country: string;
    region?: string;
    city?: string;
    count: number;
  }>;
  
  /**
   * Device types
   */
  devices?: Array<{
    type: string;
    os: string;
    count: number;
  }>;
  
  /**
   * Time distribution
   */
  timeDistribution?: Array<{
    date: string;
    count: number;
  }>;
  
  /**
   * Referrers
   */
  referrers?: Array<{
    source: string;
    count: number;
  }>;
}

/**
 * React component props
 */
export interface QRScannerProps {
  /**
   * Callback when QR code is scanned
   */
  onScan: (result: ScanResult) => void;
  
  /**
   * Callback on error
   */
  onError?: (error: ScanError) => void;
  
  /**
   * Scan options
   */
  options?: ScanOptions;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Custom styles
   */
  style?: React.CSSProperties;
  
  /**
   * Show scanning overlay
   */
  showOverlay?: boolean;
  
  /**
   * Custom overlay component
   */
  overlayComponent?: React.ReactNode;
}

export interface QRGeneratorProps {
  /**
   * QR type
   */
  type: QRType;
  
  /**
   * QR data
   */
  data: QRData;
  
  /**
   * Design options
   */
  design?: QRDesignOptions;
  
  /**
   * Size in pixels
   */
  size?: number;
  
  /**
   * Export format
   */
  format?: ExportFormat;
  
  /**
   * Callback when generated
   */
  onGenerate?: (result: QRCodeResult) => void;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Custom styles
   */
  style?: React.CSSProperties;
  
  /**
   * Show download button
   */
  showDownload?: boolean;
  
  /**
   * Show share button
   */
  showShare?: boolean;
  
  /**
   * Error correction level (L=7%, M=15%, Q=25%, H=30%)
   * @default 'M'
   */
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  
  /**
   * QR Code version (1-40)
   */
  version?: number;
  
  /**
   * Mask pattern (0-7)
   */
  maskPattern?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  
  /**
   * Quiet zone margin
   * @default 4
   */
  margin?: number;
  
  /**
   * Scale factor
   * @default 4
   */
  scale?: number;
  
  /**
   * Force specific width (overrides scale)
   */
  width?: number;
  
  /**
   * Kanji support function
   */
  toSJISFunc?: (codePoint: string) => number;
}

export interface QRStudioProps {
  /**
   * Configuration
   */
  config?: QRStudioConfig;
  
  /**
   * Theme
   */
  theme?: Theme;
  
  /**
   * Feature flags
   */
  features?: FeatureFlags;
  
  /**
   * Callback on save
   */
  onSave?: (result: QRCodeResult) => void;
  
  /**
   * Callback on scan
   */
  onScan?: (result: ScanResult) => void;
  
  /**
   * Analytics configuration
   */
  analytics?: AnalyticsConfig;
  
  /**
   * Custom class name
   */
  className?: string;
  
  /**
   * Custom styles
   */
  style?: React.CSSProperties;
}

export interface QRStudioConfig {
  /**
   * Allowed QR types
   */
  allowedTypes?: QRType[];
  
  /**
   * Default QR type
   */
  defaultType?: QRType;
  
  /**
   * Default design
   */
  defaultDesign?: QRDesignOptions;
  
  /**
   * Export formats
   */
  exportFormats?: ExportFormat[];
  
  /**
   * Landing page config
   */
  landingPageConfig?: LandingPageOptions;
}

export interface Theme {
  /**
   * Primary color
   */
  primary?: string;
  
  /**
   * Secondary color
   */
  secondary?: string;
  
  /**
   * Mode
   */
  mode?: 'light' | 'dark';
  
  /**
   * Custom CSS variables
   */
  variables?: Record<string, string>;
}

export interface FeatureFlags {
  scanner?: boolean;
  generator?: boolean;
  landingPages?: boolean;
  analytics?: boolean;
  export?: boolean;
  sharing?: boolean;
  history?: boolean;
  favorites?: boolean;
  templates?: boolean;
}

export interface AnalyticsConfig {
  enabled: boolean;
  trackScans?: boolean;
  trackDownloads?: boolean;
  trackShares?: boolean;
  customEvents?: boolean;
}