const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('verify2')
    .setDescription("This is the verification message"),
    async execute (interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must be an admin to create a verification message", ephemeral: true});

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setEmoji('<a:purple_verified:1129423341082656779> ')
            .setLabel('กดเพื่อยืนยันตัวตนเข้าดิส')
            .setStyle(ButtonStyle.Success),
        )

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("server Verification")
        .setDescription(`กดเพื่อรับยศเห็นห้อง(บอทยังไม่เสร็จสมบูรณ์ เหลือแค่เอาขึ้น Host).`)

        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {

            await i.update({ embeds: [embed], components: [button] });

            const role = interaction.guild.roles.cache.find(r => r.name === 'Verified');

            const member = i.member;
            
            member.roles.add(role);

            i.user.send(`คุณได้รับยศแล้ว ขอให้สนุกนะครับ | **${i.guild.name}**`).catch(err => {
                return;
            })
        })
    }
}