const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ButtonInteraction, PermissionsBitField} = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Use this command to create a ticket message'),
    async execute (interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must be an administrator to create a ticket message"})

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('Button')
            .setEmoji('<a:emoji_16:1148239369963049061> ')
            .setLabel('Create Ticket')
            .setStyle(ButtonStyle.Secondary),
        )

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Ticket and Support")
        .setDescription(`Click the button below to talk to staff (create ticket)`)

        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i => {

            await i.update({ embeds: [embed], components: [button] });

            const channel = await interaction.guild.channels.create({
                name: `ticket ${i.user.tag}`,
                type: ChannelType.GuildText,
                parent: '1148244203252482109'
            });

            channel.permissionOverwrites.create(i.user.id, { ViewChannel: true, SendMessages: true });
            channel.permissionOverwrites.create(channel.guild.roles.everyone, { ViewChannel: false, SendMessages: false });

            channel.send({ content: `Welcome to your ticket, ${i.user}. When you are finished here, have an admin delete the channel`});
            i.user.send(`Your ticket within ${i.guild.name} has been create. You can view it in ${channel}.`);
        })
    }
}