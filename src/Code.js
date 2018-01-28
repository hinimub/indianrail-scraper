function fare(train, date, source, dest, class, quota) {
  var captchaUrl = 'http://www.indianrail.gov.in/enquiry/captchaDraw.png';
  var captchaRes = UrlFetchApp.fetch(captchaUrl);
  
  var img = captchaRes.getContent();
  
  var headers = captchaRes.getAllHeaders();
  var cookies = headers['Set-Cookie'].map(function(str){return str.match(/.+;/)}).join('');
  var ans = solveCaptcha(captchaRes.getContent());
  var url  = 'http://www.indianrail.gov.in/enquiry/CommonCaptcha';
      url += '?inputCaptcha=' + ans;
      url += '&trainNo=' + getTrainName(train);
      url += '&dt=' + date;
      url += '&sourceStation=' + getStationName(source);
      url += '&destinationStation=' + getStationName(dest);
      url += '&classc=' + class;
      url += '&quota=' + quota;
      url += '&inputPage=FARE&language=en';
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
