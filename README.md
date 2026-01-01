# Sonata Music - Hệ Thống Quản Lý Nhạc Cổ Điển

## Thông Tin Dự Án

**Tác giả:** Huỳnh Đăng Khoa  
**MSSV:** 22590669  
**Môn học:** SE122 Đồ án 2

## Giới Thiệu

Sonata Music là một hệ thống quản lý và phát nhạc cổ điển toàn diện, được thiết kế để hỗ trợ người dùng khám phá, nghe và tìm hiểu về âm nhạc cổ điển. Hệ thống cung cấp các tính năng quản lý dữ liệu nhạc, nghệ sĩ, album, thể loại, nhạc cụ và các thành phần liên quan khác. Ngoài ra, hệ thống còn tích hợp các công nghệ AI/ML để phát hiện cảm xúc từ nhạc và đề xuất nhạc phù hợp với sở thích người dùng.

## Kiến Trúc Hệ Thống

Hệ thống được xây dựng theo kiến trúc microservices, bao gồm các service chính:

### Backend Services

1. **Main Service**: Service chính quản lý các nghiệp vụ core như nghệ sĩ, album, nhạc, thể loại, nhạc cụ, dàn nhạc, giai đoạn âm nhạc, quiz.
2. **Media Service**: Service quản lý và xử lý các file media (audio, image).
3. **Emotion Collector Service**: Service thu thập và phân tích cảm xúc từ nhạc.
4. **Music Emotion Detector Service**: Service sử dụng machine learning để phát hiện cảm xúc từ file nhạc.
5. **Recommendation Service**: Service đề xuất nhạc dựa trên sở thích và hành vi người dùng.

### Frontend

- **Next.js Application**: Ứng dụng web frontend được xây dựng bằng Next.js, cung cấp giao diện người dùng hiện đại và tương tác.

## Kiến Trúc Backend

Hệ thống backend được tổ chức theo mô hình **Controller → Service → Repository → Entity**, với các thành phần chính:

1. **Models (Entities)**:
   - Định nghĩa các bảng database sử dụng TypeORM classes, ví dụ: `Artist`, `Album`, `Music`, `Period`, `Orchestra`, `Quiz`, etc.
   - Các models này được map trực tiếp với các bảng trong database.

2. **Repositories**:
   - Xử lý các tương tác với database và thực hiện các thao tác CRUD sử dụng TypeORM.
   - Ví dụ: `ArtistRepository`, `AlbumRepository`, `MusicRepository`, etc.

3. **Services**:
   - Xử lý business logic và kết hợp dữ liệu từ nhiều repositories nếu cần.
   - Ví dụ: `ArtistService`, `AlbumService`, `MusicService`, etc.

4. **Controllers**:
   - Xử lý các HTTP requests từ client và gọi các services tương ứng để thực thi business logic.
   - Ví dụ: `ArtistController`, `AlbumController`, `MusicController`, etc.

5. **Containers**:
   - Kết hợp các components (controllers, services, repositories) sử dụng Dependency Injection.
   - Ví dụ: `ArtistContainer`, `AlbumContainer`, `MusicContainer`, etc.

6. **Routes**:
   - Định nghĩa các API endpoints và map URLs với các controllers tương ứng.
   - Ví dụ: `artist.route.ts`, `album.route.ts`, `music.route.ts`, etc.

## Tính Năng Chính

### Quản Lý Nghệ Sĩ
- Tạo, cập nhật, xóa và tìm kiếm nghệ sĩ.
- Liên kết nghệ sĩ với thể loại, nhạc cụ, dàn nhạc và giai đoạn âm nhạc.

### Quản Lý Album
- Tạo, cập nhật, xóa và tìm kiếm album.
- Liên kết album với bài hát và thể loại.

### Quản Lý Nhạc
- Tạo, cập nhật, xóa và tìm kiếm bài hát.
- Liên kết bài hát với nghệ sĩ, album, thể loại, nhạc cụ, giai đoạn và danh mục.

### Quản Lý Thể Loại
- Tạo, cập nhật, xóa và tìm kiếm thể loại nhạc.

### Quản Lý Nhạc Cụ
- Tạo, cập nhật, xóa và tìm kiếm nhạc cụ.

### Quản Lý Dàn Nhạc
- Tạo, cập nhật, xóa và tìm kiếm dàn nhạc.

### Quản Lý Giai Đoạn Âm Nhạc
- Tạo, cập nhật, xóa và tìm kiếm các giai đoạn âm nhạc.

### Quản Lý Quiz
- Tạo, cập nhật, xóa và tìm kiếm các quiz liên quan đến bài hát.

### Tính Năng AI/ML
- Phát hiện cảm xúc từ file nhạc sử dụng machine learning.
- Đề xuất nhạc dựa trên sở thích và hành vi người dùng.

## Công Nghệ Sử Dụng

### Backend
- **Node.js**: Nền tảng chính cho việc xây dựng backend.
- **Express.js**: Framework để xây dựng RESTful APIs.
- **TypeORM**: ORM cho việc quản lý database.
- **InversifyJS**: Library cho Dependency Injection.
- **PostgreSQL**: Hệ quản trị cơ sở dữ liệu.
- **Python**: Sử dụng cho các service AI/ML (emotion detection, recommendation).

### Frontend
- **Next.js**: Framework React để xây dựng ứng dụng web.
- **TypeScript**: Ngôn ngữ lập trình chính.

### DevOps
- **Docker**: Đóng gói và triển khai ứng dụng.
- **GitHub Actions**: CI/CD tích hợp cho việc build và deploy tự động.

## CI/CD Workflow

- **Build and Publish Docker Image**:
  - Tự động build Docker images từ source code và push lên Docker Hub.
  
- **Deploy to Server**:
  - Xóa các container cũ và khởi động container mới trên port khác.
  - Thực hiện health check trên container mới trước khi chuyển đổi.
  - Reload Nginx để trỏ đến container mới.

## Hướng Dẫn Sử Dụng

### Development

Chạy ứng dụng ở chế độ development:

```bash
npm run start:dev
```

Tạo migrations tự động:

```bash
npm run migration:generate
```

Áp dụng migrations:

```bash
npm run migration:run
```

### Production

Build và chạy ứng dụng:

```bash
npm run build
npm run start:prod
```

### Tạo Module Mới

Tự động tạo các components (service, controller, repository, container, route):

```bash
npm run create:module
```

### Lint Source

Kiểm tra lint:

```bash
npm run lint
```

Sửa lint tự động:

```bash
npm run lint:fix
```

### Format Source

Kiểm tra format:

```bash
npm run prettier
```

Áp dụng format:

```bash
npm run prettier:fix
```

### Commit Message Guideline

#### Commit Message Format

Mỗi commit message bao gồm header, body và footer. Header có format đặc biệt bao gồm type, scope và subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Header là bắt buộc và scope của header là tùy chọn.

#### Type

Phải là một trong các loại sau:

- build: Thay đổi ảnh hưởng đến build system hoặc dependencies bên ngoài
- ci: Thay đổi các file và script cấu hình CI
- docs: Chỉ thay đổi documentation
- feat: Tính năng mới
- fix: Sửa lỗi
- perf: Thay đổi code cải thiện hiệu suất
- refactor: Thay đổi code không sửa lỗi cũng không thêm tính năng
- style: Thay đổi không ảnh hưởng đến ý nghĩa code (white-space, formatting, missing semi-colons, etc)
- test: Thêm test còn thiếu hoặc sửa test hiện có

## Kết Luận

Dự án này cung cấp một nền tảng backend mạnh mẽ, có khả năng mở rộng và dễ bảo trì, phù hợp cho việc quản lý dữ liệu liên quan đến âm nhạc. Hệ thống được thiết kế với kiến trúc microservices hiện đại, tích hợp các công nghệ AI/ML để mang lại trải nghiệm người dùng tốt nhất.
