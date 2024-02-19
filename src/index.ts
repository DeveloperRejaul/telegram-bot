import main from "./app"

(async function () { 
    try {
        await main() 
    } catch (error) {
        console.log(error);
    }
})()