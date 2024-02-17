function DSNV() {
    this.danhSachNV = [];

    //Khai báo methods của DSNV
    /**
     * 1. Thêm người dùng mới
     * 2. Tìm vị trí nhân viên
     * 3. Xoá nhân viên
     * 4. Cập nhật nhân viên
     * 5. Tìm kiếm nhân viên theo tên
     */
    // 1. THÊM NHÂN VIÊN
    this.themNguoiDung = function (nhanVien) {
        this.danhSachNV.push(nhanVien);
    }

    // 2. TÌM VỊ TRÍ NHÂN VIÊN
    this.timViTriNV = function (id) {
        let index = -1;
        for (let i = 0; i < this.danhSachNV.length; i++) {
            let nhanVien = this.danhSachNV[i];
            if (nhanVien.taiKhoan == id) {
                return index = i;
            }
        }
    }

    // 3. XOÁ NHÂN VIÊN
    this.xoaNV = function (id) {
        let index = this.timViTriNV(id);
        if (index != -1) {
            for (let i = 0; i < this.danhSachNV.length; i++) {
                if (index == i) {
                    const nhanVien = this.danhSachNV[index];
                    this.danhSachNV.splice(nhanVien, 1);
                }
            }
        }
    }

    // 4. SỬA THÔNG TIN NHÂN VIÊN
    this.suaThongTinNV = function (id) {
        let index = this.timViTriNV(id);
        if (index != -1) {
            for (let i = 0; i < this.danhSachNV.length; i++) {
                if (index == i) {
                    const nhanVien = this.danhSachNV[index];
                    return nhanVien;
                }
            }
        }
    }

    // 5. CẬP NHẬT THÔNG TIN NHÂN VIÊN
    this.capNhatNV = function (sinhVienmoi) {
        let index = this.timViTriNV(sinhVienmoi.taiKhoan);
        let sinhVienNew = sinhVienmoi;
        if (index != -1) {
            for (let i = 0; i < this.danhSachNV.length; i++) {
                if (index == i) {
                    this.danhSachNV[index] = sinhVienNew;
                }
            }
        }
    }

    // 6. TÌM KIẾM NHÂN VIÊN THEO LOẠI
    this.timKiemNV = function (keyword, nhanVien) {
        // Tạo mảng mới rỗng để chứa toàn bộ Nhân viên phù hợp
        let newDSNV = [];

        const lowkeyword = keyword.toLowerCase();
        for (let i = 0; i < this.danhSachNV.length; i++) {
            const nhanVienmatch = this.danhSachNV[i];
            if (nhanVienmatch.xepLoai.toLowerCase().indexOf(lowkeyword) != -1) {
                newDSNV.push(nhanVienmatch);
            }
        }return newDSNV;
    }
}