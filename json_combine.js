const y10ex_general = require("./jsons/10ex_general.json")
const y10ex_help = require("./jsons/10ex_general.json")

const y11_general = require("./jsons/stage1_general.json")
const y11_help = require("./jsons/stage1_help.json")

const fs = require("fs")


// const y12_general = require("./jsons/stage2_general.json")
// const y12_help = require("./jsons/stage2_general.json")


const combineArr = [
    y10ex_general,
    y10ex_help,
    y11_general,
    y11_help,
]


fs.writeFile("./jsons/messages.json", JSON.stringify(combineArr), (err) => {
    if (err) { throw err }
    console.log("done")
})

console.log(combineArr)

