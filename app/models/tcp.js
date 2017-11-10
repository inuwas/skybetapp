var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

/**
 * TCP Data schema
 */

var TcpSchema = new Schema({
    event: {
      header :{
        msgID: { type: Number, default: 0 }, 
        operation: { type: String, default: '' },
        type: { type: String, default: '' },
        timestamp: { type: Number, default: '' }
      },
      body : {
        eventId :  { type: String, default: '' },
        category : { type: String, default: '' },
        subCategory:  { type: String, default: '' },
        name :  { type: String, default: '' },
        startTime : { type: Number, default: '' },
        displayed :  { type: Boolean, default: '' },
        suspended : { type: Boolean, default: '' }
      }
    },
    market: {
      header : {
        msgId : { type: Number, default: '' },
        operation :  { type: String, default: '' },
        type :  { type: String, default: '' },
        timestamp : { type: Number, default: '' }
      },
      body: {
        eventId : { type: String, default: '' },
        marketId : { type: String, default: '' },
        name : { type: String, default: '' },
        displayed : { type: Boolean, default: '' },
        suspended  : { type: Boolean, default: '' }
      }
    },
    outcome: {
      header: {
        msgId : { type: Number, default: '' },
        operation : { type: String, default: '' },
        type : { type: String, default: '' },
        timestamp : { type: Number, default: '' }
      },
      body: {
        marketId : { type: String, default: '' },
        outcomeId : { type: String, default: '' },
        name : { type: String, default: '' },
        price:  { type: String, default: '' },
        displayed:  { type: Boolean, default: '' },
        suspended : { type: Boolean, default: '' }
      }
    }
});

const TCPData = mongoose.model('Tcp', TcpSchema);
module.exports = TCPData;
