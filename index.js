
const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const Discord = require('discord.js');
const {Telegraf} = require('telegraf');
const client = new Discord.Client();
const app = express();
app.use(bodyParser.json())

const bot = new Telegraf(process.env['TELETOKEN']);

bot.start((ctx) => ctx.reply(`Welcome ${ctx.from.first_name}.  Send me a word and and I'll send you back I'ts defination`))




bot.on("message", (ctx, msg) => {


  fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${ctx.update.message.text}?key=${process.env['DICT-API-KEY']}`)
  .then(res => res.json())
  .then(json => {
   const word = json[0].fl
   const def = json[0].shortdef
  
   if(def)
   {
    ctx.reply(`   ${word.toUpperCase()} \ndef 1: \n ${def[0].charAt(0).toUpperCase() + def[0].slice(1)} \ndef 2: \n ${def[1] && def[1].charAt(0).toUpperCase() + def[1].slice(1)} \ndef 3: \n ${def[2] && def[2].charAt(0).toUpperCase() + def[2].slice(1)}`)

   }
   else{
     ctx.reply("Word not found, please check your spelling or that the English word exists")
   }
    
 }).catch(err => console.log(err)) 
})

 
 bot.launch();

//DISCORD EXAMPLE BOT




client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content.startsWith === '!ping') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Whats that bitch.');
	}else if (message.content === `!server`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	}else if (message.content === `!user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
});

client.login(process.env['TOKEN']);






app.get('/', (req, res) => {
  res.send('Hello Express app!')
});


// request(url, function (error, response, body) {
//   if (!error) {
//     console.log(body);
//      res.status(200).end() 
//   }
// });

app.post('/hook', (req, res) => {
  console.log("It came")
  console.log(req.body)
  res.status(200).end() 
});

(function Tim(){
  console.log("Hello people")
})()




app.listen(3000, () => {
  console.log('server started');
});
