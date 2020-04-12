function doGet()
{
  //var output = HtmlService.createHtmlOutput('<b>Hello world</b>');
  var output = HtmlService.createTemplateFromFile('index');

  return output.evaluate();
}

//1eLuvh-96ssmqiahB7qqTL3xpD782fxym


//19ncWroDo2cCPD7xSj56DtKfNSPbSFF_hlEEsbEc-MH8



function loadFileURLS(id){
  var list = [];
  var file;
  try{
    var folder = DriveApp.getFolderById(id);
    var files = folder.getFiles();
    while (files.hasNext()){
      file = files.next();
      list.push({'url':file.getUrl(),'name':file.getName()});
    }
  }
  catch(e){
    Logger.log(e.toString());
  }
  return JSON.stringify(list);
}




function doUpload(data){
  var id = '1eLuvh-96ssmqiahB7qqTL3xpD782fxym';
  var blob = Utilities.newBlob(Utilities.base64Decode(data.data), data.mimeType, data.fileName);
  var folder = DriveApp.getFolderById(id);
  var newFile = folder.createFile(blob);
  var response = {'url':newFile.getUrl(),'status':true}
  var ss = SpreadsheetApp.openById('19ncWroDo2cCPD7xSj56DtKfNSPbSFF_hlEEsbEc-MH8');
  var sheet = ss.getSheetByName('uploads');
  var addRow = sheet.appendRow([data.fileName,data.mimeType,newFile.getUrl(),Session.getActiveUser().getEmail()]);
  var body = "File Uploaded "+newFile.getUrl();
  var email = MailApp.sendEmail('mayanklearn16@gmail.com', 'New File Uploaded', body);

  return response;
}
