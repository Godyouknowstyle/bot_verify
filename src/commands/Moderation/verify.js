const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('verify')
    .setDescription("Get verified in the discord server"),
    async execute (interaction, client) {

        const role = interaction.guild.roles.cache.find(r => r.name === 'Verified')

        const member = interaction.member;

        member.roles.add(role);

        await interaction.reply({ content: "คุณได้รับยศแล้ว", ephemeral: true});
    }
}