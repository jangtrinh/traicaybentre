# Use Cases — Mobile Nav + Hero Fix

## UC-01 — Khách mobile mở menu điều hướng

**Actor:** Khách hàng tiềm năng đang duyệt trên điện thoại
**Precondition:** Đang ở bất kỳ trang nào của site, header đang hiển thị

**Main flow:**
1. Khách chạm vào nút hamburger góc phải header
2. Menu overlay trượt/fade vào chiếm toàn màn hình
3. Khách nhìn thấy 6 link điều hướng + nút close
4. Khách chạm một link (vd: "Kiến thức")
5. Chuyển trang → overlay tự đóng → trang mới load

**Alt flow A — Đóng không chọn:**
- 4a. Khách chạm nút close (X) ở góc
- 5a. Overlay fade out → trở lại trang cũ

**Alt flow B — ESC key (a11y):**
- 4b. User nhấn phím ESC
- 5b. Overlay đóng

### Gherkin

```gherkin
Feature: Mobile navigation menu

  Background:
    Given tôi đang ở trang chủ với viewport rộng 375px

  Scenario: Mở menu từ hamburger button
    When tôi tap vào hamburger button ở header
    Then menu overlay phải hiển thị
    And body không được cuộn được
    And tôi phải thấy 6 link điều hướng

  Scenario: Điều hướng từ menu
    Given menu overlay đang mở
    When tôi tap vào link "Kiến thức"
    Then trình duyệt phải chuyển đến /kien-thuc
    And menu phải tự đóng trước khi rời trang

  Scenario: Đóng menu bằng close button
    Given menu overlay đang mở
    When tôi tap vào nút close
    Then menu phải biến mất
    And body phải cuộn được lại

  Scenario: A11y — đóng bằng ESC
    Given menu overlay đang mở
    When tôi nhấn phím Escape
    Then menu phải đóng
```

---

## UC-02 — Khách mobile xem hero ảnh xoài

**Actor:** Khách hàng tiềm năng lần đầu vào trang chủ trên mobile
**Precondition:** Viewport < 1024px

**Main flow:**
1. Khách load trang chủ
2. Thấy tiêu đề "Ngọt Đậm / Vị Mặn Nhẹ / Cuối Lưỡi"
3. Cuộn nhẹ xuống → thấy carousel ảnh xoài tự chuyển sau 4 giây
4. Có thể tap dot indicator để nhảy ảnh
5. Cuộn tiếp → đoạn text mô tả + scroll hint

### Gherkin

```gherkin
Feature: Responsive hero image on mobile

  Scenario: Ảnh hiển thị trên viewport mobile
    Given tôi mở trang chủ với viewport rộng 375px
    Then tôi phải thấy carousel ảnh xoài
    And ảnh đầu tiên phải có priority loading
    And aspect ratio của ảnh không được vượt quá 4/3

  Scenario: Carousel auto-rotate
    Given tôi đang xem hero trên mobile
    When tôi chờ 4 giây
    Then ảnh phải chuyển sang ảnh tiếp theo với fade transition

  Scenario: Tap dot để nhảy ảnh
    Given tôi đang xem hero trên mobile
    When tôi tap vào dot thứ 3
    Then ảnh thứ 3 phải được hiển thị

  Scenario: Desktop không bị ảnh hưởng
    Given tôi mở trang chủ với viewport rộng 1440px
    Then layout phải giữ nguyên 2 cột (text trái, ảnh phải)
    And không được stack dọc
```

---

## Acceptance Criteria tổng

- [ ] Hamburger button có `aria-expanded`, `aria-controls`, `aria-label`
- [ ] Menu overlay đóng khi click link, click backdrop, nhấn ESC, click close button
- [ ] Body scroll lock khi overlay mở, unlock khi đóng
- [ ] Hero carousel hiển thị trên mọi viewport ≥ 320px
- [ ] Desktop (lg+) layout không thay đổi
- [ ] `npx tsc --noEmit` pass
- [ ] `bun run lint` pass
- [ ] Test thủ công trên Chrome DevTools iPhone 13 preset
