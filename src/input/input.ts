
import fs from "fs";
import path from "path";

import { Context, Input, Telegraf, } from "telegraf";
import { type IFileIdsType } from "../types/types";
const filePath = path.join(__dirname, "fileIds.json")

class InputApi {
    constructor(private bot :Telegraf){}

    async listen(){

        /**
         * @description sending document  file 
         */
        this.bot.hears("inputFromBuffer", async (ctx:Context) =>{
            const data = fs.readFileSync(path.join(__dirname, "example.txt"))
            const buffer = Buffer.from(data.toString(), 'utf-8');
            const inputFile = Input.fromBuffer(buffer, 'example.txt');
            const file =  await ctx.replyWithDocument(inputFile);
            const existsFile = fs.existsSync(path.join(__dirname, "fileIds.json"));
            if(!existsFile) return fs.writeFileSync(path.join(__dirname, "fileIds.json"), JSON.stringify([{id:file.document.file_id}]));
            
           const fileData = fs.readFileSync(path.join(__dirname, "fileIds.json"), "utf-8");
           const jsonFileData = JSON.parse(fileData);
           jsonFileData.push({id:file.document.file_id});
           fs.writeFileSync(path.join(__dirname, "fileIds.json"), JSON.stringify(jsonFileData));
        })


        /**
         * @description when we are call inputFromBuffer this method than upload a file into telegram server
         * we don't need multiple time upload same file just use Input.fromFileId 
         * than sent fit to telegram server with file_id
         */
        this.bot.hears("inputFromFileId", async ctx => {
            const uploadFileId = fs.readFileSync(filePath, "utf-8");
            const data:IFileIdsType[] = JSON.parse(uploadFileId);
            
            Promise.all(data.map(async (d)=> await ctx.replyWithDocument(Input.fromFileId(d.id)) ))
        });


        /**
         * @description using for sending local documents
        */
        this.bot.hears("inputFromLocalFile", async ctx => {
           const file = Input.fromLocalFile(path.join(__dirname, "example.txt"), "InputLocal.txt");
           await ctx.replyWithDocument(file);
        })


        /**
         * @description  using for sending documents fromReadableStream
        */
        this.bot.hears("inputFromReadableStream", async ctx => {
            const stream = fs.createReadStream(path.join(__dirname, "example.txt"));
            const file =  Input.fromReadableStream(stream, "inputFromReadableStream.txt");
            await ctx.replyWithDocument(file);
        })


        /**
         * @description  using for sending documents from url
         */
        this.bot.hears("inputFromURL", async ctx => {
           const file = Input.fromURL("https://www.gstatic.com/webp/gallery3/1.sm.png");
           await ctx.replyWithDocument(file);
        })
        
        /**
         * @description  using for sending documents from url
         */
        this.bot.hears("inputFromURLStream", async ctx => {
           const file = Input.fromURLStream("https://www.gstatic.com/webp/gallery3/1.sm.png","fromURLStream.png");
           await ctx.replyWithDocument(file);
        })

    }
}
    
export default InputApi;