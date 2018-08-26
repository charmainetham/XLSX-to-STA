var express = require('express');
var router = express.Router();
var formidable = require('formidable')
var XLSX = require('xlsx')
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'XLSX TO STA' });
});

router.post("/", function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var new_file_name = files.logName.name.split('.')[0];
    new_file_name_w_ext = '../sta_files/'+new_file_name + '.sta'
    const file = fs.createWriteStream(new_file_name_w_ext);

      var f = files[Object.keys(files)[0]];
      var wb = XLSX.readFile(f.path);
      var ws = wb.Sheets[wb.SheetNames[0]];
      var json_sheet = XLSX.utils.sheet_to_json(ws, {header:0, raw:false})
      var sta_array = [];
      json_sheet.forEach(function(item){
        file.write('sta {'+ '\n' +
          'ID: "' + item['Point number'] + '"\n'+
          'DESC: "' + item['Description'].toUpperCase() + '"\n'+
          'GTime:' + item['GPS TIME OF WEEK']+ '\n'+
          'Hi: 2.081 VERT' + '\n' +
          'Ant: 2.081 2.081'+ '\n'+
          '}' + '\n');
        var sta_obj = {};
        sta_obj.ID = item['Point number'];
        sta_obj.DESC = item['INPUT Date/time here'];
        sta_obj.GTim = item['GPS TIME OF WEEK'];
        sta_obj.Hi = '2.081 VERT';
        sta_obj.Ant = '2.081 2.081';
        sta_array.push(sta_obj);
      })

      file.end()
      file.on("finish",function(){
        res.download(new_file_name_w_ext);
      });
  })
 
})

module.exports = router;