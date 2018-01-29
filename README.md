Indian Railways Enquiry
=======================

A scraper for [Indian Railways Enquiry](http://www.indianrail.gov.in). It works in Google Apps Script.

Dependencies
------------

[PNG.js](https://github.com/hinimub/pngjs)

Setup
-----

1. Select "Resources" > "Libraries..." in the Google Apps Script
editor.
2. Enter the project key `13r_vNwILiD4sv3wmrcwQONa5_it7ZzB-6IdYT-5uwqMY-hkPCUWNYrPM ` in the "Find a Library" field, and choose "Select". 
3. Choose a version in the dropdown box, and choose indianrail as the
identifier. 
4. Click the "Save" button.

Usage
-----

```js
  var fare = indianrail.fare(train_no, date_of_journey, source_station_code, dest_station_code, class, quota);
  Logger.log(fare.totalFare);

```
