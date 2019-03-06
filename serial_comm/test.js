const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://plant1:hellohello77@cluster0-swyfw.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

function parse(json) {
  var parsed
  try {
    parsed = JSON.parse(json)
  } catch (e) {
    console.log("parse failed");
    console.log(json);
  }
  return parsed // Could be undefined!
}


client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  // Read the port data
  port.on("open", () => {
    console.log('serial port open');
  });
  parser.on('data', data =>{
    var sensorData = parse(data);
    console.log(sensorData);
    if(!sensorData) { return }
    collection.insertOne(sensorData, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      //db.close();
    });
  });
  //client.close();
});
