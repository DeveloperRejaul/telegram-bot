import {  Markup, Telegraf } from "telegraf";

class MarkupApi {
    constructor(private bot :Telegraf){}

    async listen(){


        /**
         * @description markup Inline Keyboard handle
         */
        this.bot.hears("markupInlineKeyboard", async(ctx) => {

            const inlineKeyboard = Markup.inlineKeyboard([
                Markup.button.callback('Button 1', 'button1'),
                Markup.button.callback('Button 2', 'button2')
            ]);
            
           await ctx.reply('Choose an option:',inlineKeyboard);
        });
        
        
        /**
         * @description markup Keyboard handle
         */
        this.bot.hears("markupKeyboard", async (ctx) => {
            const keyboard = Markup.keyboard([
                Markup.button.callback('Button 1', 'button1'),
                Markup.button.callback('Button 2', 'button2')
            ]);
            
           await ctx.reply('Choose an option:',keyboard);
           
        });



    }

}


export default MarkupApi;