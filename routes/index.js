var express = require('express');
var router = express.Router();

var db = 'mongodb+srv://adminn:adminn@cluster0.n85tt.mongodb.net/datavonx?retryWrites=true&w=majority'
const mongoose = require('mongoose');
const {Schema} = mongoose;
mongoose.connect(db).catch(e => {
    if (e) {
        console.log("co loi" + e.message);
    }
});
;

const Student = new Schema({
    email: String,
    maSV: String,
    add: String,
    khoa: String
})

const SV = mongoose.model('Student', Student)

/* GET home page. */
router.get('/', async function (req, res, next) {

    // lay danh sach
    var sinhVien = await SV.find({});

    res.render('index', {data: sinhVien});
});


router.post('/insertUser', function (req, res, next) {
    var Email = req.body.email;
    var MaSV = req.body.maSV;
    var Add = req.body.add;
    var Khoa = req.body.khoa;

    console.log(Email + " " + MaSV + " " + Add + " " + Khoa)
    var data = Email + "--" + MaSV + "--" + Add + "--" + Khoa

    const SinhVienNew = new SV({
        email: Email,
        maSV: MaSV,
        add: Add,
        khoa: Khoa
    })

    SinhVienNew.save(function (error) {
        if (error) {
            res.render('index', {message: "Thêm thất bại rồi :(((" + error.message})
        } else {
            res.render('index', {message: "Thêm thành công rồi nhé :)))"})
        }
    })
    // res.redirect('/')

});

router.get('/xoa', async function (req, res, next) {

    console.log("xoa request")

    await SV.deleteOne({_id: req.query.id})

    //quay ve trang chu
    res.redirect('/');

});

router.get('/sua', async function (req, res, next) {

    console.log("sua request")

    var id = req.query.id;

    res.render('sua', {id: id});
});

router.post('/update', function (req, res, next) {
    var id = req.body.id;
    var Email = req.body.email;
    var MaSV = req.body.maSV;
    var Add = req.body.add;
    var Khoa = req.body.khoa;

     SV.findOneAndUpdate({_id: id}, {
        email: Email,
        maSV: MaSV,
        add: Add,
        khoa: Khoa
    },{new: true},function (error, doc) {
        res.redirect('/');
    })
})

module.exports = router;
