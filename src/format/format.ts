import { Context, Format, Telegraf } from "telegraf";

class FormatApi {
    constructor(private bot :Telegraf){}

    async listen(){

        this.bot.hears("formatBold", (ctx:Context) =>{
            const text = "hello world!";
            const formattedText =  Format.bold(text)
            ctx.reply(formattedText);
        });
    
        this.bot.hears("formatItalic", (ctx:Context) =>{
            const text = "hello world!";
            const formattedText =  Format.italic(text)
            ctx.reply(formattedText);
        });
    
        this.bot.hears("formatUnderline", (ctx:Context) =>{
            const text = "hello world!";
            const formattedText =  Format.underline(text)
            ctx.reply(formattedText);
        });

        this.bot.hears("formatCode", (ctx:Context) =>{
            const text = "hello world!";
            const formattedText =  Format.code(text)
            ctx.reply(formattedText);
        });

        this.bot.hears("formatLink", (ctx:Context) =>{
            const text = "Goto Google";
            const formattedText =  Format.link(text, "https://www.google.com")
            ctx.reply(formattedText);
        });

        this.bot.hears("formatJoin", (ctx:Context) =>{
            const boldText = Format.bold('Bold text');
            const italicText = Format.italic('Italic text');
            const formattedText =  Format.join([boldText, italicText], " ")
            ctx.reply(formattedText);
        });
        
        this.bot.hears("formatMention", (ctx:Context) =>{
            const formattedText =  Format.mention('John Doe', 123456789);
            ctx.reply(formattedText);
        });
        
        this.bot.hears("formatPre", (ctx:Context) =>{
            const preformattedText = Format.pre('javascript')( `const greeting = 'Hello, world!'; console.log(greeting);`);
            ctx.reply(preformattedText);
        });
        
        this.bot.hears("formatSpoiler", (ctx:Context) =>{
            const spoilerText = Format.spoiler('Spoiler Alert:', 'This is a secret message!');
            ctx.reply(spoilerText);
        });

    }
}

export default FormatApi;