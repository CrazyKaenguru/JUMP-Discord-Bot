module.exports = {
    name: 'help',
    description: 'Displays a help message.',
    execute(client, interaction) {
      interaction.reply('/help to get help');
    },
  };