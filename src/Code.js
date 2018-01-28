function fare() {
  var captchaUrl = 'http://www.indianrail.gov.in/enquiry/captchaDraw.png';
  var captchaRes = UrlFetchApp.fetch(captchaUrl);
  
  var img = captchaRes.getContent();
  
  var headers = captchaRes.getAllHeaders();
  var cookies = headers['Set-Cookie'].map(function(str){return str.match(/.+;/)}).join('');
  var ans = solveCaptcha(captchaRes.getContent());
  var url = 'http://www.indianrail.gov.in/enquiry/CommonCaptcha?inputCaptcha='+ans+'&trainNo=12559+-+SHIV+GANGA+EXP&dt=28-01-2018&sourceStation=MANDUADIH+-+MUV&destinationStation=NEW+DELHI+-+NDLS&classc=SL&quota=GN&inputPage=SEAT&language=en';
  var options = {
    method: 'get',
    headers: {
      Cookie: cookies
    }
  };
  var res = UrlFetchApp.fetch(url, options);
  var json = JSON.parse(res.getContentText());
  if(!json.errorMessage) return json
  return fare();
}
