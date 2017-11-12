var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

/**
 * TCP Data schema
 */

var TcpSchema = new Schema({
    event: {
      header :{
        msgID: { type: String, default: 0 }, 
        operation: { type: String, default: '' },
        type: { type: String, default: '' },
        timestamp: { type: String, default: '' }
      },
      body : {
        eventId :  { type: String, default: '' },
        category : { type: String, default: '' },
        subCategory:  { type: String, default: '' },
        name :  { type: String, default: '' },
        startTime : { type: String, default: '' },
        displayed :  { type: String, default: '' },
        suspended : { type: String, default: '' }
      }
    },
    market: {
      header : {
        msgId : { type: Number, default: '' },
        operation :  { type: String, default: '' },
        type :  { type: String, default: '' },
        timestamp : { type: String, default: '' }
      },
      body: {
        eventId : { type: String, default: '' },
        marketId : { type: String, default: '' },
        name : { type: String, default: '' },
        displayed : { type: String, default: '' },
        suspended  : { type: String, default: '' }
      }
    },
    outcome: {
      header: {
        msgId : { type: String, default: '' },
        operation : { type: String, default: '' },
        type : { type: String, default: '' },
        timestamp : { type: String, default: '' }
      },
      body: {
        marketId : { type: String, default: '' },
        outcomeId : { type: String, default: '' },
        name : { type: String, default: '' },
        price:  { type: String, default: '' },
        displayed:  { type: String, default: '' },
        suspended : { type: String, default: '' }
      }
    }
});

const TCPData = mongoose.model('Tcp', TcpSchema);
module.exports = TCPData;
