const Discord = require("discord.js")
const fs = require("fs")
const token = require("./token/token.json")

const client = new Discord.Client()

client.once(`ready`, () => {
    console.log(`ready`)

    const guild = client.guilds.cache.find(guild => guild.name === "Digital Technologies 2020") // Server Guild Object

    const y11 = guild.roles.cache.find(role => role.id === "691461955478880387").members // Y11 class role object
    const y10ex = guild.roles.cache.find(role => role.id === "691471006681923685").members // Y10EX class role object

    const y11_class_id = y11.map(m => m.user.id) // Y11 Class ids
    let y11_class_name = y11.map(m => {if (m.nickname === null) { return m.user.username} else { return m.nickname }}) // Y11 Class names

    let y11_class = [] // Y11 class array

    for (x = 0; x < y11_class_id.length; x = x + 1) {
        y11_class[x] = {"id": y11_class_id[x], "name": y11_class_name[x]}
    } // Apppends data

    const y10ex_class_id = y10ex.map(m => m.user.id) // Y10ex Class ids
    let y10ex_class_name = y10ex.map(m => {if (m.nickname === null) { return m.user.username} else { return m.nickname }}) // Y10ex Class names

    let y10ex_class = [] // Y10ex class array

    for (x = 0; x < y10ex_class_id.length; x = x + 1) {
        y10ex_class[x] = {"id": y10ex_class_id[x], "name": y10ex_class_name[x]}
    } // Apppends data

    console.log(y11_class)
    console.log(y10ex_class)

    let data = JSON.stringify({"y11": y11_class, "y10ex": y10ex_class}, null, 2)

    fs.writeFile("classes.json", data, (err) => {
        if (err) { throw err }
        console.log("DATA WRITTEN")
    })
})



client.login(token.token)