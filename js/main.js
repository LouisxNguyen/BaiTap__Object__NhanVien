//GLOBAL
function domID(id) {
    return document.getElementById(id);
}

//----------------------------------------

// TẠO CỜ

let checkNV = new kiemTraNV();
// LẤY THÔNG TIN NGƯỜI DÙNG
function layThongTinNhanVien() {
    const _taiKhoan = domID("tknv").value;
    const _hoTen = domID("name").value;
    const _email = domID("email").value;
    const _matKhau = domID("password").value;
    const _ngayLam = domID("datepicker").value;
    const _luongCoBan = domID("luongCB").value;
    const _chucVu = domID("chucvu").value;
    const _gioLam = Number(domID("gioLam").value);

    // Validation
    let isValid = true;
    isValid &= checkNV.kiemTra(_taiKhoan, "tbTKNV", "Tài khoản");
    isValid &= checkNV.kiemTra(_hoTen, "tbTen", "Họ tên");
    isValid &= checkNV.kiemTraLuong(_luongCoBan, "tbLuongCB", "Lương phải trong khoảng 1 - 20tr");
    isValid &= checkNV.kiemTraGio(_gioLam, "tbGiolam", "Giờ làm phải trong khoảng 80 - 200 giờ");

    if (!isValid) return null;
    //Tạo đối tượng nhân viên mới
    const nhanVien = new NhanVien(_taiKhoan, _hoTen, _email, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam);
    if (_chucVu === 'Sếp') {
        nhanVien.luongGiamDoc()
    }
    else if (_chucVu === 'Trưởng phòng') {
        nhanVien.luongTruongPhong()
    }
    else if (_chucVu === 'Nhân viên') {
        nhanVien.luongNhanVien()
    }
    return nhanVien;
}

// TẠO ĐỐI TƯỢNG DSNV MỚI
let danhSachNhanVien = new DSNV();

function resetThongTin(){
    domID("tknv").value = "";
    domID("tknv").disabled = false;
    domID("name").value = "";
    domID("email").value = "";
    domID("password").value = "";
    domID("datepicker").value = "";
    domID("luongCB").value = "";
    domID("gioLam").value = "";
}
// Xoá nội dung đã nhập trước khi thêm vào form
domID("btnThem").onclick = function () {
    resetThongTin();
    domID("btnThemNV").style.display = "block";
    domID("btnCapNhat").style.display = "none";
}

// IN THÔNG TIN NHÂN VIÊN RA BẢN
function inThongTinNhanVien(danhSachNV) {
    let content = '';
    for (let i = 0; i < danhSachNV.length; i++) {
        const nhanVien = danhSachNV[i];
        content += `
        <tr>
            <td>${nhanVien.taiKhoan}</td>
            <td>${nhanVien.hoTen}</td>
            <td>${nhanVien.email}</td>
            <td>${nhanVien.ngayLam}</td>
            <td>${nhanVien.chucVu}</td>
            <td>${nhanVien.tongLuong.toLocaleString()}</td>
            <td>${nhanVien.xepLoai}</td>
            <td>
            <button class="btn btn-danger" onclick="xoaNV(${nhanVien.taiKhoan})">Xoá</button>
            <button class="btn btn-secondary" onclick="suaNV(${nhanVien.taiKhoan})">Sửa</button>
            </td>
        </tr>
        `
    }
    domID("tableDanhSach").innerHTML = content;
}


// GẮN SỰ KIỆN CHO NÚT THÊM NHÂN VIÊN
domID("btnThemNV").onclick = function () {
    const thongTinNhanVien = layThongTinNhanVien();
    if (!thongTinNhanVien) return;
    thongTinNhanVien.xepLoaiNV();
    // Gọi phương thức để push nhân viên vào mảng
    danhSachNhanVien.themNguoiDung(thongTinNhanVien);
    // Gọi hàm in để hiển thị thông tin ra trình duyệt
    inThongTinNhanVien(danhSachNhanVien.danhSachNV);
    resetThongTin();
}

// GẮN SỰ KIỆN CHO NÚT XOÁ NHÂN VIÊN
function xoaNV(id) {
    domID("card__delete").style.display = "block";
    // Xử lý khi người dùng xác nhận mới xoá
    domID("card__delete__do").onclick = function () {
        danhSachNhanVien.xoaNV(id);
        inThongTinNhanVien(danhSachNhanVien.danhSachNV);
        alert("Xoá thành công!")
        domID("card__delete").style.display = "none";
    }
    // Xử lý khi người dùng không muốn xoá nữa
    domID("card__delete__close").onclick = function () {
        domID("card__delete").style.display = "none";
    }
}

// GẮN SỰ KIỆN CHO NÚT SỬA NHÂN VIÊN
function suaNV(id) {
    domID("body").classList = "modal-open";
    domID("myModal").style.display = "block";
    domID("myModal").classList = "modal fade show";
    domID("btnThemNV").style.display = "none";
    domID("btnCapNhat").style.display = "block";
    const nhanVien = danhSachNhanVien.suaThongTinNV(id);

    // Lấy thông tin hiện tại và hiển thị lại trên khung nhập
    domID("tknv").value = nhanVien.taiKhoan;
    domID("tknv").disabled = true;
    domID("name").value = nhanVien.hoTen;
    domID("email").value = nhanVien.email;
    domID("password").value = nhanVien.matKhau;
    domID("datepicker").value = nhanVien.ngayLam;
    domID("luongCB").value = nhanVien.luongCoBan;
    domID("chucvu").value = nhanVien.chucVu;
    domID("gioLam").value = nhanVien.gioLam;

    // Đóng form khi người dùng kh muốn cập nhật nữa
    domID("btnDong").onclick = function () {
        domID("body").classList = "";
        domID("myModal").style.display = "none";
        domID("myModal").classList = "modal fade";
    }
}

// CẬP NHẬT NHÂN VIÊN
function capNhatNV() {
    const thongTinnew = layThongTinNhanVien();
    thongTinnew.xepLoaiNV();
    // Gọi hàm để cập nhật sinh viên mới sau khi đổi thông tin
    danhSachNhanVien.capNhatNV(thongTinnew);
    // Hiển thị ra bên ngoài
    alert("Cập nhật thành công!");
    inThongTinNhanVien(danhSachNhanVien.danhSachNV);

}
// Ẩn nút để cải thiện UX, giúp người dùng dễ thao tác

// TÌM KIẾM NHÂN VIÊN
domID("searchName").addEventListener('keyup', function () {
    const keyword = domID("searchName").value;
    const newDSNV = danhSachNhanVien.timKiemNV(keyword);
    inThongTinNhanVien(newDSNV)

})
