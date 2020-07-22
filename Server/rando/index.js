const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const app = express();

var Rooms = [];

//serve the static files
app.use(express.static(path.join(__dirname, 'client/build')));

//create api components
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(4, false, "[A-Z]")
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

//create a room
app.get('/api/createroom/:MaxPlayers', (req, res) => {
	
	
  //create a room to hold the latest payloads from each player
	const maxPlayers = req.params.MaxPlayers;
	
  const roomCode = generatePassword(4, false, "[A-Z]");
  var ps = [];
  for (var i = 0; i < maxPlayers; i++)
  {
    var p = {RoomID: roomCode, Name: '', LastGamePlayload: '', LastDevicePayload: ''}
    ps.push(p);
  }
  var r = {RoomID: roomCode, players: ps, InactiveTime:0};
  Rooms.push(r);

  console.log("Total Rooms " + Rooms.length)
  console.log("Total Players " + Rooms[Rooms.length-1].players.length)

	res.json(roomCode);
});


//catchall handler
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);



var player =
{
  RoomID: '',
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