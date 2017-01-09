var rfid;
var front;
var back2;
var left;
var right;
var up;
var down;
var one;
var val;
var time;
var money;
var m;
var omg;
var m2;

function getElement(dom) {
  var element = document.querySelector(dom);
  return element;
}

function controllerBtnEvent(c,e,callback) {
  if(e!="click"){
    var _u = navigator.userAgent;
    if(_u.indexOf("Android") > -1 || _u.indexOf("iPhone") > -1 || _u.indexOf("iPad") > -1){
      c.addEventListener(e[1], function(){
        callback();
      });
    }else{
      c.addEventListener(e[0], function(){
        callback();
      });
    }
  }else{
      c.addEventListener("click", function(){
        callback();
      });
  }
}


boardReady('3P0k', function (board) {
  board.systemReset();
  board.samplingInterval = 250;
  front = getPin({ transport: 'mqtt', device: '3P0k' }, 3);
  back2 = getPin({ transport: 'mqtt', device: '3P0k' }, 4);
  left = getPin({ transport: 'mqtt', device: '3P0k' }, 5);
  right = getPin({ transport: 'mqtt', device: '3P0k' }, 6);
  up = getPin({ transport: 'mqtt', device: '3P0k' }, 7);
  down = getPin({ transport: 'mqtt', device: '3P0k' }, 8);
  val = 1;
  time = 1;
  m=1000;
  one = new Firebase("https://fuck-c33bc.firebaseio.com/");
  
  one.on("value", function(snapshot) {
     data = snapshot.val().次數;
  });
  
  one.on("value", function(snapshot) {
     data2 = snapshot.m().money;
  });
  
  rfid = getRFID(board);
  rfid.read();
  rfid.on("enter",function(_uid){
    rfid._uid = _uid;
    document.getElementById("demo-area-01-show").innerHTML = rfid._uid;
    val = val + 1;
    document.getElementById("Q").innerHTML = val;
    m=m-10;
    document.getElementById("D").innerHTML = m;
    one.update({
      QQ:{  次數:val,
      WW:time,
      money:m,
      omg:m2    
    },
    });
  });
  one.on("value", function(snapshot) {
    time=[];
    snapshot.forEach(function(data) {
      if(data.val().次數){
        time=(data.val().次數);
        val = time;
      }
    });
    
    one.on("value", function(snapshot) {
    m2=[];
    snapshot.forEach(function(data2) {
      if(data2.m().money){
        m2=(data.m().money);
        m=m2;
      }
    });
    
   });
   }, function (errorObject) {
     console.log("The read failed: " + errorObject.code);
  });
  
  rfid.read();
rfid.on("enter",function(_uid){
  controllerBtnEvent(getElement("#demo-area-09 .btn-up"),["mousedown","touchstart"], function(){
    front.write(1);
    back2.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-up"),["mouseup","touchend"], function(){
    front.write(0);
    back2.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-down"),["mousedown","touchstart"], function(){
    front.write(0);
    back2.write(1);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-down"),["mouseup","touchend"], function(){
    front.write(0);
    back2.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-left"),["mousedown","touchstart"], function(){
    left.write(1);
    right.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-left"),["mouseup","touchend"], function(){
    left.write(0);
    right.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-right"),["mousedown","touchstart"], function(){
    right.write(1);
    left.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-right"),["mouseup","touchend"], function(){
    right.write(0);
    left.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-pre"),["mousedown","touchstart"], function(){
    up.write(1);
    down.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-pre"),["mouseup","touchend"], function(){
    up.write(0);
    down.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-next"),["mousedown","touchstart"], function(){
    down.write(1);
    up.write(0);
  });
  controllerBtnEvent(getElement("#demo-area-09 .btn-next"),["mouseup","touchend"], function(){
    up.write(0);
    down.write(0);
  });
 
});

});

