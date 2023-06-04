import { SlashCommandBuilder } from "discord.js";
import translations from "../../../locales/commands/translations.js";
import __ from "../../util/i18n.js";
import Log from "../../util/log.js";
import generate from "../../service/generateRequest.js";

// ========================= //
// = Copyright (c) arellak = //
// ========================= //

export default {
    data: new SlashCommandBuilder()
        .setName("generate")
        .setDescription(translations.generate.desc)
        .setDescriptionLocalizations(translations.generate.translations)
        .setDMPermission(false)
        .addStringOption((option) =>
            option.setName("prompt")
                .setDescription("Prompt for the image")),
    /**
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction){
        await interaction.reply({
            content: "Generating image...",
        });
        const noImage = await __("errors.no_image")(interaction.guildId);
        const image = await generate(interaction?.options?.get("prompt")?.value).then((res) => {
            Log.info(res ?? noImage);
            return res;
        }).catch((err) => {
            Log.error(err);
        });

        return await interaction?.editReply({
            content: image ?? noImage,
        });
    },
};
