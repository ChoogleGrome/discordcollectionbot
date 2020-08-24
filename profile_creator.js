const y11_general = require("./jsons/11/stage1_general.json")
const y11_help = require("./jsons/11/stage1_help.json")
const y11_grades = require("./jsons/11/stage1_grade.json")

const y10ex_general = require("./jsons/10ex/10ex_general.json")
const y10ex_help = require("./jsons/10ex/10ex_help.json")
const y10ex_grades = require("./jsons/10ex/10ex_grade.json")

const fs = require("fs")

// Y11 Code
let y11Arr = []

y11_grades.forEach((val) => {
    let studentTemp = {
        "id": val.ID,
        "mp_grade": val["DS Grade"],
        "exam_percentage": Math.round(val.Percentage),
        "messages": [],
        "messagesSent": null,
        "avgTime": null
    }

    y11Arr.push(studentTemp)
}) // Init ForEach

let y11Msg_general = y11_general.messages.map((val) => {
    return { "id": val.author.id, "content": val.content, "time": val.timestamp }
}) // msg arr

let y11Msg_help = y11_help.messages.map((val) => {
    return { "id": val.author.id, "content": val.content, "time": val.timestamp }
}) // msg arr

y11Arr.forEach((val) => {
    y11Msg_general.forEach((msg) => {
        if (msg.id == val.id) {
            val.messages.push({ "content": msg.content, "time": Date.parse(msg.time) })
        }
    }) 

    y11Msg_help.forEach((msg) => {
        if (msg.id == val.id) {
            val.messages.push({ "content": msg.content, "time": Date.parse(msg.time) })
        }
    })

    val.messagesSent = val.messages.length

    if (val.id != null) {
        val.avgTime = time_avg(val.messages)
    } else {
        val.avgTime = null
    }

}) // msg append to individual students

// console.log(y11Arr)

// Y10ex Code
let y10exArr = []

y10ex_grades.forEach((val) => {
    let studentTemp = {
        "id": val.ID,
        "mp_grade": val["MP Grade"],
        "exam_percentage": Math.round(val.Percentage),
        "messages": [],
        "messagesSent": null,
        "avgTime": null
    }

    y10exArr.push(studentTemp)
})

let y10exMsg_general = y10ex_general.messages.map((val) => {
    return { "id": val.author.id, "content": val.content, "time": Date.parse(val.timestamp) }
})

let y10exMsg_help = y10ex_help.messages.map((val) => {
    return { "id": val.author.id, "content": val.content, "time": Date.parse(val.timestamp) }
})

y10exArr.forEach((val) => {
    y10exMsg_general.forEach((msg) => {
        if (msg.id == val.id) {
            val.messages.push({ "content": msg.content, "time": msg.time })
        }
    }) 

    y10exMsg_help.forEach((msg) => {
        if (msg.id == val.id) {
            val.messages.push({ "content": msg.content, "time": msg.time })
        }
    })

    val.messagesSent = val.messages.length

    if (val.id != null) {
        val.avgTime = time_avg(val.messages)
        // console.log(val.avgTime)
    } else {
        val.avgTime = null
    }
})

fs.writeFile("./jsons/general/profile.json", JSON.stringify({ "y11": y11Arr, "y10ex": y10exArr }), (err) => {
    if (err) { throw err }
    console.log("done")
})

function time_avg(msg) {
    let totl = 0
    let diff = 0

    msg.sort((a, b) => {
        if (a.time < b.time) { return -1 }
        else if (b.time < a.time ) { return 1 }
        else { return 0 }
    })

    for (let x = 0; x < msg.length; x++) {
        if (x == 0 || x == msg.length - 1) {
            continue
        }
        console.log(msg[x].time)
        diff = msg[x + 1].time - msg[x].time

        totl = totl + diff
    }

    avg = (totl / (msg.length))/ 1000000 

    return Math.round(avg)
}