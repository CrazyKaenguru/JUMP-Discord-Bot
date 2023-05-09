const { Client, Intents } = require('discord.js');
const Discord = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const sendEmbed = require('./sendEmbed');
const { MessageEmbed, MessageMentions } = require('discord.js');

const client = new Discord.Client({
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: true,
  },
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  partials: ['CHANNEL'],
});

// Command handling
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./commands/')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('JUMP!', {
    type: 'WATCHING',
  });

  // Command registration
  const guildID = '950418591088529448'; // Replace with your own test guild ID if desired
  const guild = client.guilds.cache.get(guildID);
  let commands;

  if (guild && process.env.LOCAL_COMMANDS === 'true') {
    commands = guild.commands;
    console.log('Commands: Test guild only');
  } else {
    commands = client.application?.commands;
    console.log('Commands: Global');
  }

  commands?.create({
    name: 'help',
    description: 'Get help!',
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;
  if (commandName === 'help') {
    client.commands.get('help').execute(client, interaction);
  }
});


const welcomechannelId=process.env.welcome_channel_id 

client.on('guildMemberAdd', (member) => {
    const welcomeChannel = member.guild.channels.cache.find((channel) => channel.id === welcomechannelId);
    if (!welcomeChannel) return;
  
    const channlid=process.env.fotos_channel_id
    sendEmbed(welcomeChannel, `Willkommen ${member.user.username}, schön das du da bist!`, ` Schick doch mal ein Bild von deinem Flugzeug/Hubschrauber etc. in den <#${channlid}> Chanel! ${member}`,  '#00ff00');
  });

client.login(process.env.DISCORD_TOKEN); // Replace with your own token variable name
