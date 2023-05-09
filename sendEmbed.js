const { MessageEmbed } = require('discord.js');

function sendEmbed(channel, title, description, color) {
  const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(description)
    .setColor(color);
  channel.send({ embeds: [embed] });
}

module.exports = sendEmbed;