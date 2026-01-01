# Sonata Music Frontend - Tài Liệu Chi Tiết

## Thông Tin Dự Án

**Tác giả:** Huỳnh Đăng Khoa  
**MSSV:** 22590669  
**Môn học:** SE122 Đồ án 2

## Giới Thiệu

Frontend của hệ thống Sonata Music được xây dựng bằng Next.js 15 với App Router, cung cấp giao diện người dùng hiện đại và tương tác cho việc khám phá và thưởng thức nhạc cổ điển. Ứng dụng hỗ trợ 3 loại người dùng: Listener (người nghe), Contributor (người đóng góp) và Admin (quản trị viên), mỗi loại có các tính năng và quyền truy cập khác nhau.

## Kiến Trúc và Công Nghệ

### Framework và Core Technologies

- **Next.js 15**: React framework với App Router, Server Components, và các tính năng tối ưu hiệu suất
- **React 19**: UI library với các hooks và features mới nhất
- **TypeScript**: Type-safe programming
- **Tailwind CSS 4**: Utility-first CSS framework cho styling
- **Turbopack**: Build tool nhanh của Next.js cho development

### UI Libraries và Components

- **Material-UI (MUI)**: Component library với Material Design
- **Emotion**: CSS-in-JS library cho styling
- **Framer Motion**: Animation library cho các hiệu ứng chuyển động
- **Headless UI**: Unstyled UI components
- **Heroicons & Lucide React**: Icon libraries
- **React Icons**: Icon pack đa dạng

### State Management

- **React Context API**: Quản lý state toàn cục
  - `AuthContext`: Quản lý authentication và user profile
  - `MusicPlayerContext`: Quản lý state của music player (current song, queue, playback state)

### Data Fetching và API

- **Axios**: HTTP client cho API calls
- **Custom Services**: Các service layer để tương tác với backend APIs

### Forms và Validation

- **React Hook Form**: Form management với validation
- **React Datepicker**: Date picker component

### Utilities

- **React Hot Toast**: Toast notifications
- **XLSX**: Xử lý Excel files (cho export/import)

## Cấu Trúc Dự Án

```
SE122-Sonata-Music-Frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   │
│   │   ├── user-*/            # Listener (User) pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── profile/
│   │   │   ├── albums/
│   │   │   ├── artists/
│   │   │   ├── categories/
│   │   │   ├── createplaylist/
│   │   │   ├── likedsongs/
│   │   │   ├── exchange-premium/
│   │   │   └── ...
│   │   │
│   │   ├── contributor-*/     # Contributor pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── add-song/
│   │   │   ├── view-all/
│   │   │   ├── artist-view/
│   │   │   ├── exchange-premium/
│   │   │   └── ...
│   │   │
│   │   ├── admin-*/           # Admin pages
│   │   │   ├── login/
│   │   │   ├── view-all/
│   │   │   ├── add-albums/
│   │   │   ├── add-song/
│   │   │   ├── approve-music/
│   │   │   ├── artists-management/
│   │   │   ├── categories-add/
│   │   │   ├── categories-all/
│   │   │   ├── contributor-management/
│   │   │   ├── quizzes-management/
│   │   │   └── ...
│   │   │
│   │   ├── album/[id]/        # Dynamic routes
│   │   ├── artist/[id]/
│   │   ├── music/[id]/
│   │   ├── category/[id]/
│   │   ├── period/[id]/
│   │   │
│   │   ├── my-favorites/      # Favorites management
│   │   ├── recommended-songs/ # Recommendations
│   │   ├── timeless-pieces/   # Timeless pieces
│   │   ├── eras/              # Musical eras
│   │   └── instruments/       # Instruments
│   │
│   ├── components/            # Reusable components
│   │   ├── layout.tsx         # Main layout wrapper
│   │   ├── navbar.tsx         # Sidebar navigation
│   │   ├── navmenu.tsx        # Top navigation menu
│   │   ├── AdminLayout.tsx    # Admin layout
│   │   ├── contributor-layout.tsx
│   │   ├── MusicPlayerBar.tsx # Music player bar
│   │   ├── FullScreenPlayer.tsx
│   │   ├── PersistentPlayerLayout.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SearchModal.tsx
│   │   ├── CustomImage.tsx
│   │   ├── DetailModal.tsx
│   │   ├── button.tsx
│   │   ├── ComboboxMultiSelect.tsx
│   │   ├── bottom_banner.tsx
│   │   └── ...
│   │
│   ├── context/               # React Context providers
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── MusicPlayerContext.tsx # Music player state
│   │
│   ├── services/              # API service layer
│   │   ├── authService.ts
│   │   ├── contributorAuthServices.ts
│   │   ├── albumService.ts
│   │   ├── artistService.ts
│   │   ├── musicService.ts
│   │   ├── categoryService.ts
│   │   ├── genreService.ts
│   │   ├── instrumentService.ts
│   │   ├── orchestraService.ts
│   │   ├── periodService.ts
│   │   ├── eraService.ts
│   │   ├── favoriteService.ts
│   │   ├── quizService.ts
│   │   ├── recommendService.ts
│   │   ├── timelessService.ts
│   │   └── userService.ts
│   │
│   ├── types/                 # TypeScript type definitions
│   │   ├── song.ts
│   │   ├── search-music-type.ts
│   │   └── Types.ts
│   │
│   ├── utils/                 # Utility functions
│   │   ├── artistClassification.ts
│   │   └── textUtils.ts
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useArtists.ts
│   │
│   ├── interfaces/            # TypeScript interfaces
│   │   └── category.ts
│   │
│   └── constant/              # Constants
│       ├── adminToken.ts
│       ├── contributorToken.ts
│       └── listenerToken.ts
│
├── public/                    # Static assets
│   ├── layout_imgs/          # Layout images và icons
│   ├── music-background-*.jpg # Background images
│   ├── sonata-logo.png
│   └── ...
│
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.mjs        # PostCSS configuration
├── eslint.config.mjs         # ESLint configuration
├── Dockerfile                # Docker configuration
├── vercel.json               # Vercel deployment config
└── package.json              # Dependencies
```

## Các Tính Năng Chính

### 1. Trang Chủ (Home Page)

- **Hero Section**: Rotating featured artists với background images
- **Recommended Songs**: Bài hát được đề xuất cho người dùng
- **Popular Albums**: Album phổ biến
- **Timeless Pieces**: Tác phẩm bất hủ
- **Top Artists**: Nghệ sĩ hàng đầu
- **Instrument Spotlight**: Nhạc cụ nổi bật
- **Eras & Styles**: Các giai đoạn và phong cách âm nhạc
- Quick actions: Play collection, follow artist, like album

### 2. Tính Năng Cho Listener (Người Nghe)

#### Authentication
- Đăng ký tài khoản mới
- Đăng nhập/Đăng xuất
- Xác thực email với OTP
- Quên mật khẩu

#### Quản Lý Hồ Sơ
- Xem và chỉnh sửa profile
- Đổi mật khẩu
- Premium exchange (đổi điểm lấy premium)

#### Khám Phá Nhạc
- Browse albums, artists, categories
- Tìm kiếm nhạc, album, nghệ sĩ
- Xem chi tiết bài hát, album, nghệ sĩ
- Xem theo giai đoạn âm nhạc (period)
- Xem theo nhạc cụ (instruments)

#### Phát Nhạc
- Music player với đầy đủ controls (play, pause, next, previous, seek)
- Queue management (hàng đợi phát)
- Full-screen player
- Repeat và shuffle modes
- Volume control

#### Tương Tác
- Like/Unlike songs
- Follow/Unfollow artists
- Like/Unlike albums
- Tạo danh sách yêu thích (favorite lists)
- Tạo playlist
- Thêm vào queue

#### Yêu Thích (Favorites)
- Xem danh sách bài hát yêu thích
- Xem danh sách nghệ sĩ đang follow
- Xem danh sách album đã like

#### Đề Xuất và Khám Phá
- Recommended songs dựa trên sở thích
- Timeless pieces (tác phẩm bất hủ)
- Musical eras exploration

#### Quiz
- Làm quiz về nhạc cổ điển
- Xem kết quả và điểm số

### 3. Tính Năng Cho Contributor (Người Đóng Góp)

#### Authentication
- Đăng ký tài khoản contributor
- Đăng nhập

#### Quản Lý Nội Dung
- Thêm bài hát mới với upload file audio
- Xem danh sách bài hát đã đóng góp
- Chỉnh sửa bài hát (pending approval)
- Xem danh sách album
- Thêm album mới
- Xem và quản lý nghệ sĩ

#### Trạng Thái Nội Dung
- Xem trạng thái phê duyệt (pending, approved, rejected)
- Chờ admin phê duyệt

#### Premium Exchange
- Đổi điểm lấy premium membership

### 4. Tính Năng Cho Admin (Quản Trị Viên)

#### Authentication
- Đăng nhập admin

#### Quản Lý Nội Dung
- Xem tất cả bài hát, album
- Thêm bài hát, album mới
- Chỉnh sửa bài hát, album
- Xóa nội dung
- Phê duyệt/từ chối bài hát từ contributors

#### Quản Lý Nghệ Sĩ
- Xem tất cả nghệ sĩ
- Thêm nghệ sĩ mới
- Chỉnh sửa thông tin nghệ sĩ
- Xóa nghệ sĩ
- Phân loại nghệ sĩ (composer, performer, conductor, student)

#### Quản Lý Categories
- Xem tất cả categories
- Thêm category mới
- Chỉnh sửa category

#### Quản Lý Contributors
- Xem danh sách contributors
- Quản lý thông tin contributors

#### Quản Lý Quiz
- Tạo quiz mới
- Xem danh sách quiz
- Chỉnh sửa quiz

## Music Player System

Hệ thống music player được xây dựng với các tính năng:

### Components

1. **MusicPlayerBar**: Player bar ở bottom của màn hình
   - Hiển thị thông tin bài hát hiện tại
   - Play/Pause button
   - Next/Previous buttons
   - Progress bar với seek functionality
   - Favorite button
   - Expand button để mở full-screen player

2. **FullScreenPlayer**: Full-screen player modal
   - Large album art
   - Detailed song information
   - Full controls
   - Queue display
   - Lyrics display (nếu có)

3. **PersistentPlayerLayout**: Wrapper để player luôn hiển thị

### State Management

Sử dụng `MusicPlayerContext` để quản lý:
- Current song đang phát
- Playback state (playing, paused, loading)
- Current time và duration
- Queue (danh sách bài hát)
- Repeat và shuffle modes
- Volume
- Favorite status

### Features

- Play single song
- Play collection (album, playlist, search results)
- Queue management
- Automatic next song
- Shuffle và repeat modes
- Seek to position
- Favorite/Unfavorite integration
- Persistent state (player continues khi navigate)

## API Services Layer

Các service layer tương tác với backend APIs:

### Authentication Services
- `authService.ts`: Listener authentication (login, register, logout, profile)
- `contributorAuthServices.ts`: Contributor authentication

### Content Services
- `albumService.ts`: CRUD operations cho albums
- `artistService.ts`: CRUD operations cho artists
- `musicService.ts`: CRUD operations cho music
- `categoryService.ts`: Categories management
- `genreService.ts`: Genres management
- `instrumentService.ts`: Instruments management
- `orchestraService.ts`: Orchestras management
- `periodService.ts`: Periods management
- `eraService.ts`: Eras và styles

### User Services
- `userService.ts`: User profile management
- `favoriteService.ts`: Favorites, follows, likes management

### Special Services
- `quizService.ts`: Quiz operations
- `recommendService.ts`: Music recommendations
- `timelessService.ts`: Timeless pieces

Tất cả services sử dụng Axios với:
- Base URL configuration
- Authentication headers (JWT tokens)
- Error handling
- TypeScript types cho requests/responses

## Context API - State Management

### AuthContext

Quản lý authentication state:
- `isLoggedIn`: Trạng thái đăng nhập
- `userId`: ID của user hiện tại
- `userProfile`: Thông tin profile của user
- `logout()`: Đăng xuất
- `setLoggedIn()`: Set trạng thái đăng nhập
- `refreshUserProfile()`: Refresh user profile từ API

### MusicPlayerContext

Quản lý music player state:
- `currentMusic`: Bài hát đang phát
- `isPlaying`: Trạng thái play/pause
- `currentTime`: Thời gian hiện tại
- `duration`: Tổng thời gian
- `queue`: Danh sách bài hát trong queue
- `togglePlayPause()`: Play/Pause
- `playNext()`: Bài tiếp theo
- `playPrevious()`: Bài trước
- `seek()`: Nhảy đến vị trí
- `addToQueue()`: Thêm vào queue
- `playCollection()`: Phát collection
- `toggleFavorite()`: Like/Unlike

## Styling và Design

### Design System

- **Color Palette**: Màu sắc cổ điển, elegant
  - Primary: `#C8A97E`, `#A67C52` (gold/brown tones)
  - Background: `#F8F0E3` (cream/parchment)
  - Text: `#3A2A24`, `#2D1B14` (dark brown)
  - Accent: `#5D4037`, `#6D4C41`

- **Typography**: 
  - Primary font: `Playfair Display` (serif, elegant)
  - Geist Sans và Geist Mono cho UI elements

- **Layout**:
  - Sidebar navigation bên trái
  - Main content area ở giữa
  - Music player bar ở bottom
  - Responsive design

### Tailwind CSS

Sử dụng Tailwind CSS với:
- Utility-first approach
- Custom color palette
- Responsive breakpoints
- Dark mode support (có thể mở rộng)

### Component Styling

- Mix của Tailwind utilities và custom CSS
- Emotion cho dynamic styling (nếu cần)
- Material-UI components cho form elements

## Routing

Sử dụng Next.js App Router với file-based routing:

### Public Routes
- `/` - Home page
- `/user-login` - Login
- `/user-register` - Register
- `/album/[id]` - Album detail
- `/artist/[id]` - Artist detail
- `/music/[id]` - Music detail
- `/category/[id]` - Category detail
- `/period/[id]` - Period detail

### Protected Routes (Listener)
- `/user-profile` - Profile
- `/my-favorites/*` - Favorites
- `/user-albums` - Albums browse
- `/user-artists` - Artists browse
- `/user-categories` - Categories browse
- `/user-createplaylist` - Create playlist
- `/user-likedsongs` - Liked songs
- `/recommended-songs` - Recommendations
- `/timeless-pieces` - Timeless pieces

### Contributor Routes
- `/contributor/login` - Contributor login
- `/contributor/register` - Contributor register
- `/contributor-add-song` - Add song
- `/contributor-view-all` - View all content
- `/contributor-artist-view` - View artists

### Admin Routes
- `/admin/login` - Admin login
- `/admin-view-all` - View all content
- `/admin-add-song` - Add song
- `/admin-add-albums` - Add albums
- `/admin-approve-music` - Approve music
- `/admin-artists-management` - Manage artists
- `/admin-categories-*` - Manage categories
- `/admin-contributor-management` - Manage contributors
- `/admin-quizzes-management` - Manage quizzes

## Authentication Flow

1. User đăng nhập/đăng ký
2. Backend trả về JWT token
3. Token được lưu trong localStorage
4. Token được thêm vào headers của mọi API requests
5. AuthContext quản lý authentication state
6. Protected routes check authentication
7. Logout clears token và state

## Setup và Chạy

### Prerequisites

- Node.js (v20+)
- npm hoặc yarn hoặc pnpm

### Installation

1. **Clone repository và vào thư mục:**

```bash
cd SE122-Sonata-Music-Frontend
```

2. **Cài đặt dependencies:**

```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

3. **Cấu hình môi trường:**

Tạo file `.env.local` (nếu cần):
```
NEXT_PUBLIC_API_URL=https://api.sonata.io.vn/api/v1
```

4. **Chạy development server:**

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Scripts

- `npm run dev` - Chạy development server với Turbopack
- `npm run build` - Build production
- `npm run start` - Chạy production server
- `npm run lint` - Kiểm tra linting errors

## Build và Deploy

### Build Production

```bash
npm run build
```

Build output sẽ ở thư mục `.next/`

### Docker

Có sẵn `Dockerfile` để build Docker image:

```bash
docker build -t sonata-music-frontend .
docker run -p 3000:3000 sonata-music-frontend
```

### Vercel Deployment

Có sẵn `vercel.json` cho deployment lên Vercel:

1. Connect repository với Vercel
2. Vercel sẽ tự động detect Next.js
3. Deploy tự động khi push code

## Performance Optimization

- **Next.js Image Optimization**: Sử dụng `next/image` cho images
- **Code Splitting**: Automatic với Next.js
- **Lazy Loading**: Components được load khi cần
- **Server Components**: Sử dụng Server Components khi có thể
- **Caching**: API responses được cache khi phù hợp

## Best Practices

### Code Organization
- Components trong `components/`
- Pages trong `app/` theo App Router
- Services trong `services/`
- Types trong `types/`
- Utils trong `utils/`

### TypeScript
- Sử dụng TypeScript cho type safety
- Define interfaces cho API responses
- Type all function parameters và return values

### Component Design
- Reusable components
- Props interface định nghĩa rõ ràng
- Single responsibility principle

### State Management
- Context API cho global state
- Local state với useState cho component-specific state
- Custom hooks cho reusable logic

## Testing

Hiện tại chưa có test suite. Có thể thêm:
- Jest và React Testing Library cho unit tests
- Playwright hoặc Cypress cho E2E tests

## Tài Liệu Bổ Sung

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Kết Luận

Frontend của Sonata Music được xây dựng với Next.js 15 hiện đại, TypeScript cho type safety, và Tailwind CSS cho styling. Hệ thống music player được tích hợp sâu, cung cấp trải nghiệm nghe nhạc mượt mà. Code được tổ chức rõ ràng, dễ bảo trì và mở rộng. Ứng dụng hỗ trợ đầy đủ 3 loại người dùng với các tính năng phù hợp cho từng role.
