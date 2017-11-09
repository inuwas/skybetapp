var net = require('net');
var Promise = require('bluebird');

var connectToServer = (res) => {
  var client = new net.Socket();
  client.connect(8181, '127.0.0.1', () => {
    console.log('Connected');
    client.write('Hello, server! Love, Client.');
  });
  
  client.on('data', (data) => {
    console.log('Received: ' + data);

    Promise.resolve(data).then(function () {
      return renderView(res, data);
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
 * Renders the view of data 
 * @param {*} res 
 * @param {*} data 
 */
var renderView = (res, data) => {
  return res.render('home/tcp', {
    title: 'TCP',
    serverData: data
  });
};
/**
 * GET /tcp.
 * Calls Connect to server to generate 
 * the TCP protocol server response
 */

exports.tcp = function (req, res) {
  connectToServer(res);
};
