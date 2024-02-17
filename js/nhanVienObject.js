function NhanVien(_taiKhoan,_hoTen,_email,_matKhau,_ngayLam,_luongCoBan,_chucVu,_gioLam){
    // Khai báo thuộc tính của Nhân viên
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = '';

    // Khai báo method của Nhân viên
    /**
     * 1. Lương giám đốc
     * 2. Lương trưởng phòng
     * 3. Lương nhân viên
     */
    this.luongGiamDoc = function(){
         this.tongLuong = Number(this.luongCoBan*3);
        
    }
    this.luongTruongPhong = function(){
         this.tongLuong = Number(this.luongCoBan*2);
    }
    this.luongNhanVien = function(){
         this.tongLuong = Number(this.luongCoBan*1);
    }
   
    // XẾP LOẠI NHÂN VIÊN
    this.xepLoaiNV = function(){
        if(this.gioLam >= 192){
            this.xepLoai = 'Outstanding';
        }
        else if(this.gioLam >= 176 && this.gioLam<192){
            this.xepLoai = 'Excellent';
        }
        else if(this.gioLam >= 160 && this.gioLam<176){
            this.xepLoai = 'Good';
        }
        else{this.xepLoai = 'Average';}
    }
}