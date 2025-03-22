const moment = require("moment");
const colors = require("colors");

module.exports = (content, type='log') => {

    const typeColors = {
        log: "blue",
        warn: "yellow",
        error: "red",
        cmd: "magenta",
        ready: "green",
        info: "cyan",
        debug: "gray"
    }

    const prefix = `[${moment().format("DD-MM-YYYY HH:mm:ss")}]: ${typeColors[type] ? colors[typeColors[type]].bold(type.toUpperCase()) : type.toUpperCase()}`;
    console.log(`${prefix} ${content}`);
    if (type == "error") return console.error(content);
    
};