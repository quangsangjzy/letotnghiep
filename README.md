# Graduation Invitation React

Landing page thiệp mời tốt nghiệp bằng ReactJS + Vite, dựng theo concept digital invitation: phong bì mở đầu, thiệp giấy nhiều lớp, animation khi cuộn, RSVP modal, địa điểm, dress code, album và lời cảm ơn.

## Chạy project

```bash
npm.cmd install
npm.cmd run dev
```

Nếu dùng CMD thay vì PowerShell thì có thể chạy:

```bash
npm install
npm run dev
```

Sau khi chạy, mở link Vite hiển thị trong terminal, thường là:

```text
http://localhost:5173/
```

## Sửa nội dung

Mở file:

```text
src/main.jsx
```

Sửa object `CONFIG` ở đầu file:

```js
const CONFIG = {
  graduateName: 'Nguyễn Minh Anh',
  shortName: 'Minh Anh',
  className: 'Lớp 12A1 / Khóa 2026',
  school: 'Trường Đại học ABC',
  dateLabel: '28.06.2026',
  ceremonyDate: '2026-06-28T08:30:00+07:00',
  timeLabel: '08:30 sáng',
  venueName: 'Hội trường A - Trường Đại học ABC',
  venueAddress: '123 Đường Thanh Xuân, Quận 1, TP. Hồ Chí Minh',
  mapsUrl: 'https://maps.google.com/?q=Ho%20Chi%20Minh%20City',
  portrait: '...',
  photos: ['...', '...']
};
```

## Build để deploy

```bash
npm.cmd run build
```

Upload thư mục `dist` lên Vercel, Netlify hoặc hosting tĩnh bất kỳ.
