const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('automod')
    .setDescription(`Setup type auto mod system`)
    .addSubcommand(command => command.setName('flagged-word').setDescription('Block profanity, sexual content, and slurs'))
    .addSubcommand(command => command.setName('spam-messages').setDescription('Block messages suspected of spam'))
    .addSubcommand(command => command.setName('mention-spam').setDescription('Block messages containing a certain amount of mentions').addIntegerOption(option => option.setName('number').setDescription('the number of mentions reqquired to block a message').setRequired(true)))
    .addSubcommand(command => command.setName('keyword').setDescription('Block a given keyword in the server').addStringOption(option => option.setName('word').setDescription('the word you want to block').setRequired(true))),
    async execute (interaction) {

        const { guild, options } = interaction;
        const sub = options.getSubcommand();

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You dont have perms to setup automod wuthin this server', ephemeral: true})

        switch (sub) {
            case 'flagged-word':

            await interaction.reply({ content: `<a:Early_Verified_Bot_Developer_a:1079768890164392076> Loading your automod  rule...`});

            const rule = await guild.autoModerationRules.create({
                name: `Block profanity, sexual content, and slurs by Quarxnt1ne Bot`,
                creatorId: '709431793023189104',
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetaData:
                    {
                        presets: [1, 2, 3]
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by Quarxnt1ne Bots auto moderation'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule) return;

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`:white_check_mark: You automod rule has been created- all swears will be stopped by Quarxt1ne Bot`)

                await interaction.editReply({ content: ``, embeds: [embed] });
            }, 3000)

            break;

            case 'keyword':

            await interaction.reply({ content: `a:Early_Verified_Bot_Developer_a:1079768890164392076: Loading your automod  rule...`});
            const word = options.getString('word');

            const rule2 = await guild.autoModerationRules.create({
                name: `Prevent the word ${word} from being used by Quarxnt1ne Bot`,
                creatorId: '709431793023189104',
                enabled: true,
                eventType: 1,
                triggerType: 1,
                triggerMetaData:
                    {
                        keywordFilter: [`${word}`]
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by Quarxnt1ne Bots auto moderation'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule2) return;

                const embed2 = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(` :white_check_mark: You automod rule has been created- all message containing the word ${word} will be delete`)

                await interaction.editReply({ content: ``, embeds: [embed2] });
            }, 3000)

            break;

            case 'spam-message':

            await interaction.reply({ content: `<a:Early_Verified_Bot_Developer_a:1079768890164392076:> Loading your automod  rule...`});

            const rule3 = await guild.autoModerationRules.create({
                name: `Prevent spam message By Quarxnt1ne Bot`,
                creatorId: '709431793023189104',
                enabled: true,
                eventType: 1,
                triggerType: 3,
                triggerMetaData:
                    {
                        //mentionTotalLimit: number
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by Quarxnt1ne Bots auto moderation'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule3) return;

                const embed3 = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(` :white_check_mark: You automod rule has been created- all swears will be stopped by Quarxt1ne Bot`)

                await interaction.editReply({ content: ``, embeds: [embed3] });
            }, 3000)

            break;

            case 'mention-spam':

            await interaction.reply({ content: `:a:Early_Verified_Bot_Developer_a:1079768890164392076: Loading your automod  rule...`});
            const number = options.getInteger('number');

            const rule4 = await guild.autoModerationRules.create({
                name: `Prevent spam mention by Quarxnt1ne Bot`,
                creatorId: '709431793023189104',
                enabled: true,
                eventType: 1,
                triggerType: 3,
                triggerMetaData:
                    {
                        mentionTotalLimit: number
                    },
                actions: [
                    {
                        type: 1,
                        metadata: {
                            channel: interaction.channel,
                            durationSeconds: 10,
                            customMessage: 'This message was prevented by Quarxnt1ne Bots auto moderation'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}`});
                }, 2000)
            })

            setTimeout(async () => {
                if (!rule4) return;

                const embed4 = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(` :white_check_mark: You automod rule has been created- all message suspace`)

                await interaction.editReply({ content: ``, embeds: [embed4] });
            }, 3000)
        }
    }
}