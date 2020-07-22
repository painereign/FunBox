const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const generatePassword = require('password-generator');
const axios = require('axios');

const app = express();

var Rooms = [];

//serve the static files
app.use(express.static(path.join(__dirname, 'client/build')));

//create a room
app.get('/api/createroom/:MaxPlayers', (req, res) => {
	
	
  //create a room to hold the latest payloads from each player
	const maxPlayers = req.params.MaxPlayers;
	
  const roomCode = generatePassword(4, false, "[A-Z]");
  var ps = [];
  for (var i = 0; i < maxPlayers; i++)
  {
    var p = {RoomID: roomCode, PlayerID: i, Name: '', LastGamePlayload: '', LastDevicePayload: ''}
    ps.push(p);
  }
  var r = {RoomID: roomCode, players: ps, InactiveTime:0};
  Rooms.push(r);

  console.log("Total Rooms " + Rooms.length)
  console.log("Total Players " + Rooms[Rooms.length-1].players.length)

	res.json(roomCode);
});

//Called by game to set payload
/*
app.get('/api/SendToPlayer/:Payload', (req,res) => {

  //payload format:
  //roomID.playerID [!if to all].payload string
  //abcd.4.payload string

    const val = req.params.Payload;
    var split = val.split('.');

    console.log(split[0]);

    res.json(200);

});*/


app.use(bodyParser.json());
app.post('/api/createRoomPost', function(request, response){
  console.log(request.body); //my JSON

  var jsonRequest = request.body;
  var jsonResponse = {};    
  jsonResponse.result = jsonRequest.val1 + jsonRequest.val2;
  response.send(jsonResponse);
});



//Called by web client to get payload
app.get('api/UserGetPayload', (req, res) => {

});


//catchall handler
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`FunBox Server listening on on ${port}`);



var player =
{
  RoomID: '',
  PlayerID: 0,
  Name: '',
  LastGamePlayload: '',
  LastDevicePayload: ''
}

var Room=
{
  RoomID:'',
  players: [],
  InactiveTime: ''
}