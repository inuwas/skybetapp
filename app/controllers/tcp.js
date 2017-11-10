var net = require('net');
var Promise = require('bluebird');
var tcpDataModel = require('../models/tcp');
/**
 * Connects TCP service and saves data to mongodb
 * @param {*} res 
 */
var connectToServer = (res) => {
  var client = new net.Socket();
  client.connect(8181, '127.0.0.1', () => {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
  });
  
  client.on('data', (data) => {
    console.log('Received: ' + data);

    Promise.resolve(data).then(function () {
      /* Return The Array of Objects Converted from | delimited
       to JSON */
      let TcpDataArray = convertJSON(data);
      let curentData = new tcpDataModel;
      TcpDataArray.map((tcpData) => {
        curentData.push(tcpData);
      });
      curentData.save();      
      return res.json(TcpDataArray);
    }).then(() => {
      // kill client after server's response
      client.destroy();
    });
  });
  
  client.on('close', () => {
    console.log('Connection closed');
  });
};
/**
 * Converts Packet Response to JSON Format
 * @param {*} data 
 */
var convertJSON = (data) => {
  // Split text into array on new line character 
  var splitOnNewLineArray = data.split(/\r|\n/gm);
  var arrayOfJsonObjects = [];
  splitOnNewLineArray.forEach((elementString, index) => {

    elementString.replace('\|','');
    let element = elementString.split('|');
    let typeObject = {};
    
    // Split items with pipes
    if ( (index % 3) == 0 ) {
      let event = {};
      let header = {};
      header.msgID = element[0];
      header.operation = element[1];
      header.type =  element[2];
      header.timestamp =  element[3];

      let body = {};
      body.eventId = element[4];
      body.category = element[5];
      body.subCategory =  element[6];
      body.name =  element[7];
      body.startTime = element[8];
      body.displayed = element[9];
      body.suspended = element[10];
      
      event.header = header;
      event.body = body;

      typeObject.event = event;
    }
    if ( (index % 3) == 1 ) {
      let market = {};
      let header = {};
      header.msgID = element[0];
      header.operation = element[1];
      header.type =  element[2];
      header.timestamp =  element[3];

      let body = {};
      body.eventId = element[4];
      body.marketID = element[5];
      body.name = element[6];
      body.displayed = element[7];
      body.suspended = element[8];

      market.header = header;
      market.body = body;

      typeObject.market = market;
    }
    if ( (index % 3 ) == 2 ) {
      let outcome = {};
      let header = {};
      header.msgId = element[0];
      header.operation = element[1];
      header.type = element[2];
      header.timestamp = element[3];

      let body = {};
      body.marketId = element[4];
      body.outcomeId = element[5];
      body.name = element[6];
      body.price =  element[7];
      body.displayed = element[8];
      body.suspended = element[9];

      outcome.header = header;
      outcome.body = body;

      typeObject.outcome = outcome;
    }
    if (((index % 3 ) == 0) && index > 1 ) {
      arrayOfJsonObjects.push(typeObject);
    }
  });
  console.log(arrayOfJsonObjects);
  return arrayOfJsonObjects; 
};

/**
 * GET /tcp.
 * Calls Connect to server to generate 
 * the TCP protocol server response
 */
exports.tcp = function (req, res) {
  connectToServer(res);
};
