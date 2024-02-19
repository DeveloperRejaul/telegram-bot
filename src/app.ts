import {config} from 'dotenv'
config()

import { Telegraf , Context, Format } from'telegraf';
import { message } from 'telegraf/filters';
import FormatApi from './format/format';
import InputApi from './input/input';


// check all env variables available
const REQUIRED_ENVS = ["BOT_TOKEN"];
const ALL_ENVS = new Set(Object.keys(process.env));
const existEnvs = REQUIRED_ENVS.every(e=> ALL_ENVS.has(e));
if(!existEnvs) {
    console.log("Environment variables missing");
    process.exit(1);
}

if(existEnvs) console.log("Environment variables Loaded successfully");



export default async function main () {

    // creating telegram bot 
    const bot = new Telegraf(process.env.BOT_TOKEN!)

    // listen /start command
    bot.start((ctx:Context) => ctx.reply('Welcome'))

    //listen /help command
    bot.help((ctx:Context) => ctx.reply('Send me a sticker'))

    // listen text message
    bot.hears('hi', (ctx:Context) => ctx.reply('Hey there'))

    // creating command
    bot.command('hi', (ctx) => ctx.reply('Hello'))


    // ===== explore api start ===========
    const formatApi = new FormatApi(bot);
    await formatApi.listen()

    const inputApi = new InputApi(bot);
    await inputApi.listen()

  
    // handling all text message
    bot.on(message('text'), async (ctx) => {
        // Explicit usage
        await ctx.telegram.sendMessage(ctx.message.chat.id, `Hello , I'm handle all text messages`)

        // Using context shortcut
        // await ctx.reply(`Hello , I'm handle all text messages`)
    });

    bot.launch()

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}









