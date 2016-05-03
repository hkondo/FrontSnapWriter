var path = require('path');
var os = require('os');
var fs = require('fs');
var execSync = require('child_process').execSync;
var exec = require('child_process').exec;

function find_dayone2_dir()
{
    var container_dir = path.join(os.homedir(),
                                  "Library", "Group Containers");
    var val = "";
    var files = fs.readdirSync(container_dir);
    files.some(function(file) {
        if(path.extname(file) == ".dayoneapp2") {
            val = path.join(container_dir, file,
                            "Data", "Auto Import", "Default Journal.dayone");
            return false;
        }
    });
    return val;
}
var DAYONE = find_dayone2_dir();
//console.log(DAYONE);

var canvas = document.getElementById("notification");
var context = canvas.getContext("2d"); 
context.font = "bold 16px 'Arial'";
context.fillStyle = "#2e8b57";
context.fillText("Created new entry.", 30, 25, 200);

var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: 'gfm',
  lineNumbers: true,
  theme: 'monokai',
  lineWrapping: true,
  autofocus: true
});

require('electron').ipcRenderer.on('Send', function(event, message) {
  //console.log(message);
  var temp_txt_path  = path.join(message, 'temp_message.txt');
  var entryText = myCodeMirror.doc.getValue();
  if(entryText) {
    fs.writeFileSync(temp_txt_path, entryText);
    //entryText = entryText.replace(/\n/g, "\\n")
    //var cmd = 'echo "' + entryText + '" | /usr/local/bin/dayone -j=' + DAYONE.replace(/(\s)/g, "\\ ") + ' new';
    var cmd = '/usr/local/bin/dayone -j=' + DAYONE.replace(/(\s)/g, "\\ ") + ' new < ' + temp_txt_path;
    //console.log(cmd)
    exec(cmd, function(error, stdout, stderr) {
        canvas.style.zIndex = 1;
        setTimeout(function() {
          canvas.style.zIndex = -1;
        }, 1000);
        console.log(error);
        fs.unlinkSync(temp_txt_path);
    });
    myCodeMirror.doc.setValue("");
  }
});
