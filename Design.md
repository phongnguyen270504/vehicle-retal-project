# Thiết kế sơ bộ Vehicle Rental Web Application

## 1. Mục tiêu dự án

Dự án được thực hiện nhằm phục vụ học tập và chuẩn bị cho kỳ thực tập sinh viên. Mục tiêu là xây dựng một Ứng dụng web về hệ thống cho thuê xe.

## 2. Đối tượng sử dụng

- Khách hàng
- Quản trị viên

## 3. Các chức năng chính
### Khách hàng
- Xem danh sách xe
- Tìm kiếm xe
- Xem chi tiết thông tin xe
- Gửi yêu cầu thuê xe
- Xem lịch sử thuê xe
### Quản trị viên

- Thêm / sửa / xóa xe
- Quản lý đơn thuê xe
- Quản lý người dùng
- Cập nhật trạng thái xe

## 4. Công nghệ sử dụng
- Node.js
- Express.js
- MySQL
- HTML, CSS, JavaScript

## 5. Thiết kế cơ sở dữ liệu (dự kiến)
- Users (user_id, name, email, password, role)
- Vehicles (vehicle_id, name, type, price_per_day, status)
- Rentals (rental_id, user_id, vehicle_id, start_date, end_date, status)

## 6. Trạng thái
Dự án đang trong giai đoạn thiết kế và xây dựng chức năng cơ bản.
