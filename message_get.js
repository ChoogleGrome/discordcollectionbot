const Discord = require("discord.js")
const fs = require("fs")
const token = require("./token/token")

const client = new Discord.Client()

const guildID = "689284104214151281"

// const userID = "736137614716960768"

let fs_arr = []
let x = 0

fs.open("./jsons/messages.json", "w", (err, file) => {
    if (err) { throw err }
    console.log("File Created")
    return
}) // creates json file

client.once("ready", () => {
    console.log("ready")

    const msg_channels = client.guilds.cache.get(guildID).channels.cache.filter(ch => { 
        switch (ch.id) {
            case "689332889078333450" : return
            case "691466335603130388" : return
            case "692550371364700252" : return
            case "691473546597105754" : return
            case "691470014104076338" : return
            case "691780514025308181" : return
            case "691527650136555550" : return
            case "689296776548581446" : return
            case "691470674258296843" : return
            case "691500316956295229" : return
        } // avoids channel unrelated to analysis

        // if (ch.type === 'text'){
        //     ch.messages.fetch({ limit:100 }) // gets last 100 messages from channel
        //         .then(messages => {
        //             const msgs = messages 
        //             console.log(msgs)
        //             // console.log(msgs)
                    
        //             msgs.forEach(m => {
        //                 // console.log(`${m.content} - ${m.channel.name} - ${m.author}`)

        //                 fs_arr[x] = [m.content, m.channel.id, m.author.id, m.createdAt]
        //                 x = x + 1
        //                 // console.log(fs_arr)

        //                 fs.writeFile("./jsons/messages.json", JSON.stringify(fs_arr), (err) => {
        //                     if (err) { throw err }
        //                 })
        //             }) // loops though all message objects and appends data to messages.json 
        //         })
        // } // checks for text channels

        if (ch.type === "text") {
            let lastMessage_bool = false
            let lastMessage = null
            let y = 0

            while (lastMessage_bool === false) {
                // let lastMessage = getMID(ch)

                // console.log(lastMessage)

                // return

                if (y === 0) {
                    ch.messages.fetch({ limit: 100, before: lastMessage }) 
                        .then(messages => {
                            const msgs = messages
                            
                            msgs.forEach(m => {
                                fs_arr[x] = [m.content, m.channel.id, m.author.id, m.createdAt]
                                x = x + 1

                                lastMessage = m.id
                                y = y + 1

                                fs.writeFile("./jsons/messages.json", JSON.stringify(fs_arr), (err) => {
                                    if (err) { throw err }
                                    console.log("edited")
                                })
                            })

                            // console.log(Number.isInteger(fs_arr.length))

                            // if (Number.isInteger((fs_arr.length) / 100) === true) { lastMessage_bool = true }
                        })
                }

                ch.messages.fetch({ limit: 100, before: lastMessage }) 
                    .then(messages => {
                        const msgs = messages
                        
                        msgs.forEach(m => {
                            fs_arr[x] = [m.content, m.channel.id, m.author.id, m.createdAt]
                            x = x + 1

                            lastMessage = m.id

                            fs.writeFile("./jsons/messages.json", JSON.stringify(fs_arr), (err) => {
                                if (err) { throw err }
                                console.log("edited")
                            })
                        })

                        console.log(Number.isInteger(fs_arr.length))

                        if (Number.isInteger((fs_arr.length) / 100) === true) { lastMessage_bool = true }
                    })
            }
        }
        
        else {
            return;
        }

        // console.log(fs_arr)

        // fs.appendFile("./jsons/messages.json", JSON.stringify(fs_arr), (err) => {
        //     if (err) { throw err }
        //     console.log("appended")
        // })
    })
})

// function getMID(ch) {
//     ch.messages.fetch({ limit: 1 })
//         .then(message => {
//             const msgs = message
//             msgs.forEach(m => {
//                 return m.id
//             })
//         })
// }

client.login(token.token)