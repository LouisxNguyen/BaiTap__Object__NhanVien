function kiemTraNV() {
    // Khai báo methods
    this.kiemTra = function (key, id, note) {
        if (key === "") {
            domID(id).style.display = "block";
            domID(id).innerHTML = note + " không phù hợp";
            return false;
        }
        else {
            domID(id).innerHTML = "";
            return true;
        }
    }
    // Kiểm tra lương cơ bản
    this.kiemTraLuong = function (key, id, note){
        if (key > 20000000 || key <1000000) {
            domID(id).style.display = "block";
            domID(id).innerHTML = note;
            return false;
        }
        else {
            domID(id).innerHTML = "";
            return true;
        }
    }
    // Kiểm tra giờ
    this.kiemTraGio = function (key, id, note){
        if (key > 200 || key <80) {
            domID(id).style.display = "block";
            domID(id).innerHTML = note;
            return false;
        }
        else {
            domID(id).innerHTML = "";
            return true;
        }
    }
}

