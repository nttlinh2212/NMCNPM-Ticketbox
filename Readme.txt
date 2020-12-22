21/12: Linh_ Để cho khớp mn làm thế này nha:
-lúc render ra màn hình login có truyền vào một biến gọi là err_message cho trường hợp sau khi post login phát hiện username sai hoăc pass sai và render lại login thì err_message đó sẽ chứa lỗi. if(err_message) nếu có thì hiển thị ko thì thôi ->vì vậy trong màn hình login phải có 1 chổ để hiển thị lỗi.
-Sau khi login thành công nêu là admin thì chuyển sang màn hình home của admin
-Logout ở đây không phải get mà là post vì vậy trên header phải phải tạo thêm 1 form rống có một button login hay gì đó khi click vào thì gửi cái from đó đi.<xem ví dụ của thầy>
NHỚ Ở CẢ MÀN HÌNH CUSTOMER HAY ADMIN ĐỀU VẬY
-Đạt: id ko đc edit hay add vì vậy trong trường edit nếu xuất hiện thì để not enable, còn trong add thì khỏi cần nhập id và password ko xuất hiện ở trong bảng
-Vy: trong form signin, signup bà thêm field name vào nha name giống trong database lun. Bà nhớ trong signup có viết javascript dùng getJSon để gọi hàm is-available để check for username. Bỏ trường email đi bà vì trong db ko lưu thay vào đó để fullname.
-book-tickets
-add showtimes
-report