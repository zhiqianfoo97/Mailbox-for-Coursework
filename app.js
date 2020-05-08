var express = require('express');
var app = express();

var monk = require('monk');
var db = monk('localhost:27017/“assignment1”');

var globalIndex =0;
var globalID="";

app.use(express.static('public'), function(req,res,next){	
  req.db = db;
  next();
}) 


app.get('/retrieveemaillist',function(req,res){
  var db = req.db;
  var collection = db.get('emailList');
  var show = req.query.show;
  var number = req.query.number;
  var currentDivision = req.query.currentDivision;
  var pageCategory = req.query.pageCategory;

  if (show == "Inbox"){
    collection.find({mailbox:'Inbox'}, {sort: {_id:-1}}, function(err, docs){
      globalIndex=0;
      if (err === null){
          res.send(ResHTML(docs,number,show));
      } else res.send(err);   
    });
  }else if (show == "Important"){
    collection.find({mailbox:'Important'}, {sort: {_id:-1}}, function(err, docs){
        globalIndex=0;
        if (err === null){
               res.send(ResHTML(docs,number,show));
        } else res.send(err);     
    }); 
    
  } else if (show == "Sent"){
     collection.find({mailbox:'Sent'}, {sort: {_id:-1}}, function(err, docs){
        globalIndex=0;
        if (err === null){
                res.send(ResHTML(docs,number,show));
        } else res.send(err);     
    });
   } else if (show == "Trash"){
    collection.find({mailbox:'Trash'}, {sort: {_id:-1}}, function(err, docs){
      globalIndex=0;
       if (err === null){
               res.send(ResHTML(docs,number,show));
       } else res.send(err);     
   });
  }else if (show == "Previous"){
    if (pageCategory != "Content"){
      collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
        if (globalIndex != 0){
          globalIndex-=1;
        }
        if (err === null){
                res.send(ResHTML(docs,number,currentDivision));
        } else res.send(err);     
      });
    } else{
      collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
        if (err === null){
          res.send(showPreviousEmailContent(docs,globalID));       
      } else res.send(err);     
      });
    }

  } else if (show == "Next"){
    if (pageCategory != "Content"){
      collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
        if (globalIndex != parseInt((docs.length-1)/number) && docs.length != 0){
          globalIndex +=1;
        }
        if (err === null){ 
                  res.send(ResHTML(docs,number,currentDivision));
        } else res.send(err);          
      });
  }else{
    collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
      if (err === null){
        res.send(showNextEmailContent(docs,globalID));          
    } else res.send(err);     
    });
  }

  };
})


app.get('/getemail',function(req,res){
  var db = req.db;
  var collection = db.get('emailList');
  var show = req.query.show;
  var id = req.query.id;
  globalID = id;

  if (show =="Content"){
    collection.find({_id:id}, {}, function(err, docs){
      if (err === null){
              res.send(displayContent(docs));
      } else res.send(err);     
    });
  }

})

function displayContent(docs) {
  var response_string = "";
  for (var i = 0; i < docs.length; i++) {
    var email = docs[i];
    response_string += "<div class= 'mailcontent' id="+email['_id']+">";
    response_string += "<h2 style=\"align: left; display: inline-block; margin-right: 50px; width:60%; word-wrap: break-word;vertical-align: top; font-weight: bold\">" + email['title'] + "</h2>" + "<h5 style=\"display: inline-block; float:right;margin-right: 50px;word-wrap: break-word;vertical-align: top;\">" + email['time'] + "</h5><br>";
    response_string += "<h3 style=\"display: inline-block; margin-right:10px;vertical-align: top;\">Sender:" + email['sender'] + "</h3><br>";
    response_string += "<h3 style=\"display: inline-block; margin-right:10px;vertical-align: top;\">Receiver:"+ email['recipient'] + "</h3><br>";
    response_string += "<p>" + email['content'] + "<p>";
    response_string += "</div>";

  }
  return response_string;
}

function showPreviousEmailContent(docs,id){
  var stringID=""+id;
  var position=0;
  for (var i=0; i<docs.length; i++){
    var email=docs[i];
    if (email['_id']==stringID){
      position =i;
      break;
    }
  }
  if(position>0){
    position-=1;
  }
  
  var response_string = "";
  var email = docs[position];
  globalID= email['_id'];
  response_string += "<div class= 'mailcontent' id="+email['_id']+">";
  response_string += "<h2 style=\"align: left; display: inline-block; margin-right: 50px; width:60%; word-wrap: break-word;vertical-align: top; font-weight: bold\">" + email['title'] + "</h2>" + "<h5 style=\"display: inline-block; float:right;margin-right: 50px;word-wrap: break-word;vertical-align: top;\">" + email['time'] + "</h5><br>";
  response_string += "<h3 style=\"display: inline-block; margin-right:10px;vertical-align: top;\">Sender:" + email['sender'] + "</h3><br>";
  response_string += "<h3 style=\"display: inline-block; margin-right:10px;vertical-align: top;\">Receiver:"+ email['recipient'] + "</h3><br>";
  response_string += "<p>" + email['content'] + "<p>";
  response_string += "</div>";

  return response_string;
}

function showNextEmailContent(docs,id){
  var stringID=""+id;
  var position=0;
  var length = docs.length-1;
  for (var i=0; i<docs.length; i++){
    var email=docs[i];
    if (email['_id']==stringID){
      position =i;
      break;
    }
  }
  if (position<length){
    position=position+1;
  }
  var response_string = "";
  var email = docs[position];
  globalID= email['_id'];
  response_string += "<div class= 'mailcontent' id="+email['_id']+">";
  response_string += "<h2 style=\"align: left; display: inline-block; margin-right: 50px; width:60%; word-wrap: break-word;vertical-align: top; font-weight: bold\">" + email['title'] + "</h2>" + "<h5 style=\"display: inline-block; float:right;margin-right: 50px;word-wrap: break-word;vertical-align: top;\">" + email['time'] + "</h5><br>";
  response_string += "<h3 style=\"display: inline-block; margin-right:10px;vertical-align: top;\">Sender:" + email['sender'] + "</h3><br>";
  response_string += "<h3 style=\"display: inline-block; margin-right:10px;vertical-align: top;\">Receiver:"+ email['recipient'] + "</h3><br>";
  response_string += "<p>" + email['content'] + "<p>";
  response_string += "</div>";
  return response_string;
}

function ResHTML(docs,number,show) {

  if (show == "Sent"){
    var response_string = "";
    for (var i = globalIndex*number ;  i < (globalIndex+1) * number && i< docs.length; i++) {
      var email = docs[i];
      response_string += "<div class= 'mail' style='border-bottom: 1px solid red;' id="+email['_id']+ ">";
      response_string += "<input type= 'checkbox' style='margin-top: 23px;margin-right:50px;' name='checkbox' value="+email['_id']+"><h3 onclick='showContent(this)' style='display: inline-block; width: 20%;margin-right: 50px;word-wrap: break-word;vertical-align: top;'>"+email['recipient'] +"</h3>"+"<h3 onclick='showContent(this)' style='display: inline-block; width:40%; margin-right: 50px;word-wrap: break-word;vertical-align: top;'>"+email['title'] +"</h3>"+"<h3 onclick='showContent(this)' style='float: right;  margin-right: 50px;word-wrap: break-word;vertical-align: top; ' class= 'time'>"+ email['time'] +"</h3>";
      response_string += "</div>";
    }
      return response_string;
  }else{
    var response_string = "";
    for (var i = globalIndex*number ;  i < (globalIndex+1) * number && i< docs.length; i++) {
      var email = docs[i];
      response_string += "<div class= 'mail' style='border-bottom: 1px solid red;' id="+email['_id']+ ">";
      response_string += "<input type= 'checkbox' style='margin-top: 23px;margin-right:50px;' name='checkbox' value="+email['_id']+"><h3 onclick='showContent(this)' style='display: inline-block; width: 20%;margin-right: 50px;word-wrap: break-word;vertical-align: top;'>"+email['sender'] +"</h3>"+"<h3 onclick='showContent(this)' style='display: inline-block; width:40%; margin-right: 50px;word-wrap: break-word;vertical-align: top;'>"+email['title'] +"</h3>"+"<h3 onclick='showContent(this)' style='float: right;  margin-right: 50px;word-wrap: break-word;vertical-align: top; ' class= 'time'>"+ email['time'] +"</h3>";
      response_string += "</div>";
    }
      return response_string;
    }
}

app.post('/changemailbox',express.urlencoded({extended:true}),function(req,res){
  var selected = JSON.parse(req.body.selected);
  var moveto = req.body.moveto;
  var db = req.db;
  var collection = db.get('emailList');
  var number = req.body.number;
  var currentDivision = req.body.currentDivision;
  var pageCategory=req.body.pageCategory;
  
  if (moveto == "inbox"){
    if (pageCategory != "Content"){
      for (var i =0; i < selected.length; i++){
        collection.update({"_id":selected[i]},{$set:{'mailbox':"Inbox"}});
      }
      collection.find({"mailbox":currentDivision}, {sort: {_id:-1}}, function(err, docs){
        if (err === null){
          res.send(ResHTML(docs,number,currentDivision));
        } else res.send(err); 
      });
    }else{
      collection.update({"_id":globalID},{$set:{'mailbox':"Inbox"}});
      collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
        globalIndex=0;
        if (err === null){
                res.send(ResHTML(docs,number,currentDivision));
        } else res.send(err);  
      });
    }

  }else if (moveto == "important"){
    if (pageCategory != "Content"){
      for (var i =0; i < selected.length; i++){
        collection.update({"_id":selected[i]},{$set:{'mailbox':"Important"}});
      }
      collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
        if (err === null){
          res.send(ResHTML(docs,number,currentDivision));
        } else res.send(err); 
      });
    }else{
      collection.update({"_id":globalID},{$set:{'mailbox':"Important"}});
      collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
        globalIndex=0;
        if (err === null){
                res.send(ResHTML(docs,number,currentDivision));
        } else res.send(err);  
      });
    }

  }else if (moveto == "sent"){
    if (pageCategory != "Content"){
      for (var i =0; i < selected.length; i++){
        collection.update({"_id":selected[i]},{$set:{'mailbox':"Sent"}});
      }
      collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
        if (err === null){
          res.send(ResHTML(docs,number,currentDivision));
        } else res.send(err); 
      });
    }else{
      collection.update({"_id":globalID},{$set:{'mailbox':"Sent"}});
      collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
        globalIndex=0;
        if (err === null){
                res.send(ResHTML(docs,number,currentDivision));
        } else res.send(err);  
      });
    }

  }else if (moveto == "trash"){
    if (pageCategory != "Content"){
      for (var i =0; i < selected.length; i++){
        collection.update({"_id":selected[i]},{$set:{'mailbox':"Trash"}});
      }
      collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
        if (err === null){
          res.send(ResHTML(docs,number,currentDivision));
        } else res.send(err); 
      });
    }else{
        collection.update({"_id":globalID},{$set:{'mailbox':"Trash"}});
        collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
          globalIndex=0;
          if (err === null){
                  res.send(ResHTML(docs,number,currentDivision));
          } else res.send(err);  
        });
    }
  }

})

app.post('/sendemail',express.urlencoded({extended:true}),function(req,res){
  var db = req.db;
  var collection = db.get('emailList');
  var sender = req.body.sender;
  var recipient = req.body.recipient;
  var title = req.body.title;
  var content = req.body.content;
  var time = getCurrentTime();  
  var currentDivision = req.body.currentDivision;
  var number = req.body.number;


  collection.insert({sender:sender, recipient:recipient, title: title, time:time, content:content, mailbox:"Sent"});
  collection.find({mailbox:currentDivision}, {sort: {_id:-1}}, function(err, docs){
    globalIndex=0;
    if (err === null){
            res.send(ResHTML(docs,number,currentDivision));
    } else res.send(err);  
  });


})

function getCurrentTime(){
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;
  var min  = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;
  var sec  = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "Aug";
  month[8] = "Sept";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  var englishMonth = month[date.getMonth()];

  var day  = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  
  var weekday = new Array(7);
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tues";
  weekday[3] = "Wed";
  weekday[4] = "Thurs";
  weekday[5] = "Fri";
  weekday[6] = "Sat";
  var dayOfTheWeek = weekday[date.getDay()];

  return hour+":"+min+":"+sec+" "+dayOfTheWeek+" "+englishMonth+" "+day+" "+year;
}

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})