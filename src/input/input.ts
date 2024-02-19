
import fs from "fs";
import path from "path";

import { Context, Input, Telegraf, } from "telegraf";


class InputApi {
    constructor(private bot :Telegraf){}

    async listen(){

        this.bot.hears("inputFromBuffer", async (ctx:Context) =>{
            const data = fs.readFileSync(path.join(__dirname, "example.txt"))
            const buffer = Buffer.from(data.toString(), 'utf-8');
            const inputFile = Input.fromBuffer(buffer, 'example.txt');
            const file =  await ctx.replyWithDocument(inputFile);
            const existsFile =  fs.existsSync(path.join(__dirname, "fileIds.txt"));
            if(!existsFile) fs.writeFileSync(path.join(__dirname, "fileIds.json"), JSON.stringify([{id:file.document.file_id}]))
        })

        // this.bot.hears("", async ()=> {});

    }
}

export default InputApi;