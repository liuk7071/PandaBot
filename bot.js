const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'panda',
        description: 'Sends a panda image',
    },
];

// Read the token from a file
const fs = require('fs');
fs.readFile('./token', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    client.login(data)
    const rest = new REST({ version: '10' }).setToken(data);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands("1056939856774828033"), { body: commands });
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
});

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client(
    { intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }
);

const gis = require('g-i-s');
var queries = [
    "real red panda pic",
    "image of a red panda in a zoo",
    "picture of red panda",
    "red panda image",
    "image of a red panda eating",
    "picture of a red panda sleeping",
    "red panda boop"
]

client.on('ready',
    function(e) {
        console.log(`Logged in as ${client.user.tag}`)
    }
)

// Commands
client.on('interactionCreate',
    function(msg) {
        if (!msg.isChatInputCommand()) return;

        if(msg.commandName == "panda") {
            toReply = msg;
            var opts = {
                searchTerm: queries[Math.floor(Math.random()*queries.length)],
                queryStringAddition: '',
                filterOutDomains: [
                  'fbsbx.com',
                  "people.com"
                ]
            }
            gis(opts, (error, results) => {
                if (error) {
                    console.log(error);
                }
                else {
                    msg.reply(JSON.stringify(results[Math.floor(Math.random()*results.length)]['url']).replace('"', '').replace('"', ''));
                }
            });
        }
    }
)
