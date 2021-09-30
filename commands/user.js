const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        let tagg = "<@" + interaction.user.id + ">";
		await interaction.reply(`${tagg}\nYour tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	},
};