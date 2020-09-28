const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Cambiar el volúmen de la música",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Nada está sonando.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Primero debes unirte a un canal de voz!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 The current volume is: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Please use a number to set volume.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Utilice un número entre 0 - 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Volúmen en: **${args[0]}%**`).catch(console.error);
  }
};
