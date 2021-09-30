const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};


/*
if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nServer created on: ${interaction.guild.createdAt}`);
	} else if (commandName === 'user') {
        let tagg = "<@" + interaction.user.id + ">";
		await interaction.reply(`${tagg}\nYour tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	}
*/