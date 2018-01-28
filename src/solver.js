var zero = [6, 10, 6, 4, 4, 4, 6, 10, 6];
var one = [4, 5, 4, 12, 12, 2, 2, 2];
var two = [4, 5, 6, 7, 7, 8, 8, 6];
var three = [4, 4, 6, 6, 6, 6, 8, 10, 7];
var four = [3, 5, 6, 6, 6, 4, 12, 12, 2, 2];
var five = [9, 8, 6, 6, 6, 6, 8, 8, 4];
var six = [6, 10, 8, 6, 6, 6, 8, 8, 4];
var seven = [2, 2, 3, 5, 7, 6, 7, 5, 3];
var eight = [7, 11, 8, 6, 6, 6, 8, 11, 7];
var nine = [4, 8, 8, 6, 6, 6, 8, 10, 6];
var plus = [2, 2, 2, 2, 10, 10, 2, 2, 2, 2];
var minus = [2, 2, 2, 2, 2];

function solveCaptcha(img) {
  var reader = new pngjs.PNGReader(blobToUint8(img));
  return reader.parse(function(err, png){
    var pixels = new Array();
//rgba行列の作成
  for (var x=0; x < png.getWidth(); x++){
    var x_arr = new Array();
    for (var y=0; y < png.getHeight(); y++){
      x_arr.push(png.getPixel(x, y));
    }
    pixels.push(x_arr);
  }
    //alpha抜き出し
    pixels = pixels.map(function(x){
      return x.map(function(y){
        return y[3];
      });
    });
     //文字列の分割
    var flag = 0;
  var pix = new Array();
  for (var x=0; x < pixels.length; x++){
    if (pixels[x].toString() == [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].toString()){
      flag = 0;
      continue;
    }
    if (flag === 0){
      pix.push(new Array());
    }
    pix[pix.length-1].push(pixels[x]);
    flag = 1;
  }
    //比較の簡単化のため次元を減らす
    var res = new Array();
  for (var i=0; i<pix.length;i++){
    res.push(pix[i].map(function(e){
      return e.reduce(function(p,c){return p+c});
    }));
  }
    res = res.map(function(e){
      return e.map(function(i){
        return i/255;
      });
    });
    //計算式stringの作成
  var str = '';
  for(var i=0; i<=res.length-2;i++){
    switch(res[i].toString()){
      case zero.toString():
        str += '0';
        break;
      case one.toString():
        str += '1';
        break;
      case two.toString():
        str += '2';
        break;
      case three.toString():
        str =+ '3';
        break;
      case four.toString():
        str += '4';
        break;
      case five.toString():
        str += '5';
        break;
      case six.toString():
        str += '6';
        break;
      case seven.toString():
        str += '7';
        break;
      case eight.toString():
        str += '8';
        break;
      case nine.toString():
        str += '9';
        break;
      case plus.toString():
        str += '+';
        break;
      case minus.toString():
        str += '-';
        break;
    }
  }
  return eval(str).toString();
  });
}

function blobToUint8(blob) {
  return blob.map(function(e){
    return parseInt(e < 0 ? e + 256 : e);
  });
}
