# Sonata Music Backend - Tài Liệu Chi Tiết

## Thông Tin Dự Án

**Tác giả:** Huỳnh Đăng Khoa  
**MSSV:** 22590669  
**Môn học:** SE122 Đồ án 2

## Giới Thiệu

Backend của hệ thống Sonata Music được xây dựng theo kiến trúc microservices, bao gồm nhiều service độc lập phục vụ các chức năng khác nhau. Mỗi service được thiết kế để xử lý một nhóm nghiệp vụ cụ thể, giúp hệ thống dễ dàng mở rộng và bảo trì.

## Kiến Trúc Microservices

Hệ thống backend bao gồm 5 service chính:

### 1. Main Service (`main.service/`)

Service chính quản lý toàn bộ nghiệp vụ core của hệ thống:

- **Quản lý người dùng**: Admin, Listener (người nghe), Contributor (người đóng góp)
- **Quản lý nội dung**: Artist (nghệ sĩ), Album, Music (bài hát), Genre (thể loại), Category (danh mục)
- **Quản lý metadata**: Instrument (nhạc cụ), Orchestra (dàn nhạc), Period (giai đoạn âm nhạc)
- **Tương tác người dùng**: Favorite List (danh sách yêu thích), Artist Follower (theo dõi nghệ sĩ), Album Like
- **Tính năng đặc biệt**: Quiz (câu đố), Stream Queue (hàng đợi phát), Recommender (đề xuất nhạc), Timeless Pieces (tác phẩm bất hủ)

**Công nghệ:**
- Node.js + Express.js
- TypeORM với PostgreSQL
- InversifyJS cho Dependency Injection
- Redis cho caching
- JWT cho authentication

**Cấu trúc code:**
```
main.service/
├── src/
│   ├── models/          # Database entities (25 models)
│   ├── repositories/    # Data access layer (42 repositories)
│   ├── services/        # Business logic (48 services)
│   ├── controllers/     # HTTP handlers (25 controllers)
│   ├── routes/          # API routes (24 routes)
│   ├── dto/             # Data Transfer Objects (60 DTOs)
│   ├── middleware/      # Express middleware (7 middlewares)
│   ├── exceptions/      # Custom exceptions (24 exceptions)
│   ├── enums/           # Enumerations (7 enums)
│   ├── utils/           # Utilities (19 utilities)
│   ├── types/           # TypeScript types (8 types)
│   ├── database/        # Database config và migrations (22 migrations)
│   ├── container/       # Dependency Injection containers (24 containers)
│   ├── consumers/       # Event consumers (2 consumers)
│   └── server.ts        # Entry point
├── config/              # Configuration files
├── tests/               # Test files
└── package.json
```

### 2. Media Service (`media.service/`)

Service quản lý và xử lý các file media (audio, image):

- Upload và lưu trữ file audio (nhạc)
- Upload và lưu trữ file image (hình ảnh)
- Xử lý file audio với FFmpeg
- Lưu trữ trên MinIO (object storage)
- Quản lý metadata của file

**Công nghệ:**
- Node.js + Express.js
- MinIO cho object storage
- Multer cho file upload
- FFmpeg cho xử lý audio
- InversifyJS cho Dependency Injection

**API Endpoints chính:**
- `/upload/audio` - Upload file audio
- `/upload/image` - Upload file image
- `/download/:id` - Tải file
- `/delete/:id` - Xóa file

### 3. Emotion Collector Service (`emotion-collector.service/`)

Service thu thập và phân tích cảm xúc từ nhạc:

- Thu thập dữ liệu cảm xúc từ người dùng
- Lưu trữ tương tác người dùng với nhạc
- Phân tích pattern cảm xúc
- Tích hợp với Redis để cache dữ liệu

**Công nghệ:**
- Node.js + Express.js
- TypeORM với PostgreSQL
- Redis cho caching
- InversifyJS cho Dependency Injection

### 4. Music Emotion Detector Service (`music-emotion-detector.service/`)

Service sử dụng Machine Learning để phát hiện cảm xúc từ file nhạc:

- Phân tích file audio để trích xuất features
- Sử dụng Random Forest Regressor model để dự đoán cảm xúc
- Model được train với dataset DEAM (Database of Emotional Annotated Music)
- Trả về các chỉ số cảm xúc: valence, arousal, dominance

**Công nghệ:**
- Python
- scikit-learn (Random Forest)
- librosa cho audio processing
- NumPy, Pandas

**Model:**
- Random Forest Regressor
- Input: Audio features (MFCC, chroma, tempo, etc.)
- Output: Emotion scores (valence, arousal, dominance)

### 5. Recommendation Service (`recommendation.service/`)

Service đề xuất nhạc dựa trên sở thích và hành vi người dùng:

- Content-based filtering sử dụng KNN
- Collaborative filtering sử dụng RBM (Restricted Boltzmann Machine)
- Hybrid algorithm kết hợp nhiều phương pháp
- Đánh giá hiệu suất với metrics (RMSE, MAE, etc.)

**Công nghệ:**
- Python
- Surprise library cho recommendation algorithms
- NumPy, Pandas
- scikit-learn

**Algorithms:**
- ContentKNN: Dựa trên đặc tính của bài hát
- RBM: Restricted Boltzmann Machine cho collaborative filtering
- Hybrid: Kết hợp content-based và collaborative filtering

## Kiến Trúc Code - Layered Architecture

Hệ thống backend được tổ chức theo mô hình **Layered Architecture** với 4 lớp chính:

### 1. Controller Layer
- Xử lý HTTP requests/responses
- Validate input data
- Gọi Service layer
- Xử lý authentication/authorization

**Ví dụ:** `ArtistController`, `MusicController`, `AlbumController`

### 2. Service Layer
- Chứa business logic
- Kết hợp dữ liệu từ nhiều repositories
- Xử lý transactions
- Gọi external services nếu cần

**Ví dụ:** `ArtistService`, `MusicService`, `AlbumService`

### 3. Repository Layer
- Truy cập database
- Thực hiện CRUD operations
- Query optimization
- Sử dụng TypeORM

**Ví dụ:** `ArtistRepository`, `MusicRepository`, `AlbumRepository`

### 4. Model Layer (Entity Layer)
- Định nghĩa database schema
- TypeORM entities
- Relationships giữa các entities
- Validation rules

**Ví dụ:** `Artist`, `Music`, `Album`, `Genre`, `Instrument`, etc.

### Dependency Injection

Hệ thống sử dụng **InversifyJS** cho Dependency Injection:
- Container định nghĩa bindings
- Loose coupling giữa các layers
- Dễ dàng test và mock dependencies

## Các Module Chính

### Module Quản Lý Người Dùng

1. **Admin**: Quản trị viên hệ thống
   - Quản lý toàn bộ nội dung
   - Phê duyệt đóng góp từ contributors
   - Quản lý người dùng

2. **Listener**: Người nghe nhạc
   - Đăng ký/đăng nhập
   - Nghe nhạc
   - Tạo danh sách yêu thích
   - Theo dõi nghệ sĩ
   - Làm quiz

3. **Contributor**: Người đóng góp nội dung
   - Đăng ký/đăng nhập
   - Thêm nghệ sĩ, album, nhạc
   - Chờ admin phê duyệt

### Module Quản Lý Nội Dung

1. **Artist (Nghệ Sĩ)**
   - Thông tin nghệ sĩ
   - Liên kết với albums, musics
   - Phân loại: composer, performer, conductor
   - Followers system

2. **Album**
   - Thông tin album
   - Liên kết với musics, genres
   - Like system
   - Release date, cover image

3. **Music (Bài Hát)**
   - Thông tin bài hát
   - File audio
   - Liên kết với artists, albums, genres, instruments, periods, categories
   - Emotion scores
   - Play count, favorite count

4. **Genre (Thể Loại)**
   - Phân loại nhạc cổ điển
   - Symphony, Concerto, Sonata, etc.

5. **Category (Danh Mục)**
   - Phân loại bài hát
   - Classical, Romantic, Baroque, etc.

### Module Metadata

1. **Instrument (Nhạc Cụ)**
   - Piano, Violin, Cello, etc.
   - Liên kết với artists và musics

2. **Orchestra (Dàn Nhạc)**
   - Thông tin dàn nhạc
   - Liên kết với artists

3. **Period (Giai Đoạn Âm Nhạc)**
   - Baroque, Classical, Romantic, Modern
   - Liên kết với musics và artists

### Module Tương Tác

1. **Favorite List**
   - Danh sách yêu thích của listener
   - CRUD operations

2. **Artist Follower**
   - Theo dõi nghệ sĩ
   - Notification system

3. **Listener Album Like**
   - Like/Unlike album
   - Statistics

4. **Stream Queue**
   - Hàng đợi phát nhạc
   - Playlist management

### Module Đặc Biệt

1. **Quiz**
   - Câu đố về nhạc cổ điển
   - Liên kết với bài hát
   - Scoring system

2. **Quiz Feedback**
   - Phản hồi từ người dùng
   - Rating, comments

3. **Recommender**
   - Đề xuất nhạc cho listener
   - Dựa trên lịch sử nghe và sở thích

4. **Timeless Pieces**
   - Tác phẩm bất hủ
   - Curated content

## Database Schema

Hệ thống sử dụng **PostgreSQL** làm database chính. Có 22 migrations đã được tạo để quản lý schema:

- Các bảng chính: Admin, Listener, Contributor, Artist, Album, Music, Genre, Category, Instrument, Orchestra, Period
- Các bảng quan hệ: Artist_Follower, Listener_Album_Like, Listener_Answer_Quiz, etc.
- Indexes để tối ưu performance
- Foreign keys để đảm bảo data integrity

## API Endpoints

Main Service cung cấp các API endpoints sau (prefix: `/api/v1/`):

### Authentication & Users
- `POST /admin/login` - Đăng nhập admin
- `POST /listener/register` - Đăng ký listener
- `POST /listener/login` - Đăng nhập listener
- `POST /contributor/register` - Đăng ký contributor
- `POST /contributor/login` - Đăng nhập contributor

### Artists
- `GET /artist` - Lấy danh sách nghệ sĩ
- `GET /artist/:id` - Lấy thông tin nghệ sĩ
- `POST /artist` - Tạo nghệ sĩ (contributor/admin)
- `PUT /artist/:id` - Cập nhật nghệ sĩ
- `DELETE /artist/:id` - Xóa nghệ sĩ

### Albums
- `GET /album` - Lấy danh sách album
- `GET /album/:id` - Lấy thông tin album
- `POST /album` - Tạo album
- `PUT /album/:id` - Cập nhật album
- `DELETE /album/:id` - Xóa album

### Music
- `GET /music` - Lấy danh sách bài hát
- `GET /music/:id` - Lấy thông tin bài hát
- `POST /music` - Tạo bài hát
- `PUT /music/:id` - Cập nhật bài hát
- `DELETE /music/:id` - Xóa bài hát

### Genres, Instruments, Orchestras, Periods
- CRUD operations tương tự như trên

### Interactions
- `POST /favorite-list` - Thêm vào danh sách yêu thích
- `POST /follow-artist` - Theo dõi nghệ sĩ
- `POST /album-like` - Like album
- `GET /stream-queue` - Lấy hàng đợi phát

### Quiz
- `GET /quiz` - Lấy danh sách quiz
- `GET /quiz/:id` - Lấy thông tin quiz
- `POST /quiz/answer` - Trả lời quiz

### Recommender
- `GET /recommender/recommend` - Lấy đề xuất nhạc

### Health Check
- `GET /health` - Kiểm tra trạng thái service

## Công Nghệ và Dependencies

### Main Technologies
- **Node.js** (v20+): Runtime environment
- **TypeScript** (v5.3+): Programming language
- **Express.js** (v4.18+): Web framework
- **TypeORM** (v0.3+): ORM
- **PostgreSQL**: Database
- **Redis**: Caching
- **InversifyJS**: Dependency Injection

### Security
- **Helmet**: Security headers
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing

### Validation & Transformation
- **class-validator**: Input validation
- **class-transformer**: Object transformation

### Utilities
- **lodash**: Utility functions
- **chalk**: Terminal colors
- **morgan**: HTTP request logger
- **nodemailer**: Email sending

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Jest**: Testing framework
- **ts-node**: TypeScript execution

## Cấu Hình

Mỗi service có thư mục `config/` chứa các file cấu hình:

- `default.json`: Cấu hình mặc định
- `development.json`: Cấu hình development
- `production.json`: Cấu hình production

Cấu hình bao gồm:
- Database connection
- Redis connection
- JWT secrets
- Server port
- API version
- CORS settings
- Email settings

## Setup và Chạy

### Prerequisites
- Node.js (v20+)
- PostgreSQL (v14+)
- Redis (v6+)
- Docker (optional)

### Installation

1. **Clone repository và vào thư mục service:**

```bash
cd SE122-Sonata-Music-Backend/main.service
```

2. **Cài đặt dependencies:**

```bash
npm install
```

3. **Cấu hình môi trường:**

Tạo file `.env` hoặc cập nhật các file trong `config/`:
- Database connection string
- Redis connection
- JWT secret keys
- Server port

4. **Chạy migrations:**

```bash
npm run migration:run
```

5. **Chạy ở chế độ development:**

```bash
npm run start:dev
```

### Scripts Khác

- `npm run build` - Build project
- `npm run start:prod` - Chạy production
- `npm run migration:generate` - Tạo migration mới
- `npm run migration:revert` - Revert migration
- `npm run lint` - Kiểm tra linting
- `npm run lint:fix` - Sửa linting errors
- `npm run prettier` - Kiểm tra code formatting
- `npm run prettier:fix` - Format code
- `npm run create:module` - Tạo module mới (auto-generate)
- `npm test` - Chạy tests

## Database Migrations

Hệ thống sử dụng TypeORM migrations để quản lý database schema:

1. **Tạo migration mới:**
```bash
npm run migration:generate
```

2. **Chạy migrations:**
```bash
npm run migration:run
```

3. **Revert migration:**
```bash
npm run migration:revert
```

4. **Tạo migration trống:**
```bash
npm run migration:create --name=MigrationName
```

## Testing

Hệ thống sử dụng Jest cho testing:

```bash
npm test
```

Test files được đặt trong thư mục `tests/`. Hiện tại có health check test để đảm bảo service hoạt động đúng.

## Code Style và Best Practices

### Commit Message Format

Tuân theo convention commit messages:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: Tính năng mới
- `fix`: Sửa lỗi
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Build, config

### Code Organization

- Mỗi module có đầy đủ: Model, Repository, Service, Controller, Route, Container, DTO
- Sử dụng interfaces cho abstraction
- Base classes để tránh code duplication
- Utilities cho các function dùng chung

### Error Handling

- Custom exceptions với error codes
- Global error handler middleware
- Consistent error response format

## Deployment

### Docker

Mỗi service có `Dockerfile` và `docker-compose.yml`:

```bash
docker-compose up -d
```

### CI/CD

GitHub Actions được sử dụng để:
- Build Docker images
- Push lên Docker Hub
- Deploy lên server
- Health checks

### Production Checklist

- [ ] Set environment variables
- [ ] Run database migrations
- [ ] Build project (`npm run build`)
- [ ] Start with production mode (`npm run start:prod`)
- [ ] Configure reverse proxy (Nginx)
- [ ] Setup SSL certificates
- [ ] Configure monitoring
- [ ] Setup backup strategy

## Monitoring và Logging

- **Morgan**: HTTP request logging
- **Health check endpoint**: `/api/v1/health`
- **Error logging**: Centralized error handler
- **Redis**: Caching và pub/sub

## Security Considerations

- JWT authentication
- Password hashing với bcrypt
- Helmet cho security headers
- CORS configuration
- Input validation
- SQL injection prevention (TypeORM)
- Rate limiting (có thể thêm)

## Tài Liệu Bổ Sung

- Xem README trong từng service để biết chi tiết cụ thể:
  - `main.service/README.md`
  - `media.service/README.md`
  - `emotion-collector.service/README.md`
  - `recommendation.service/README.md`

## Kết Luận

Backend của Sonata Music được thiết kế với kiến trúc microservices hiện đại, sử dụng các best practices trong phát triển phần mềm. Hệ thống dễ dàng mở rộng, bảo trì và test. Code được tổ chức rõ ràng theo layered architecture với dependency injection, giúp đảm bảo tính modular và reusability.

