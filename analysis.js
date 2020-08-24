const profile = require("./jsons/general/profile.json")

const fs = require("fs")

const avgGrade_exam_y10ex = avgGrade_exam(profile.y10ex)
const avgGrade_mp_y10ex = avgGrade_mp(profile.y10ex)
const avgGrade_exam_y11 = avgGrade_exam(profile.y11)
const avgGrade_mp_y11 = avgGrade_mp(profile.y11)

const avgTime_y10ex = avgTime(profile.y10ex)
const avgTime_y11 = avgTime(profile.y11)

const avgMsg_y10ex = avgMsg(profile.y10ex)
const avgMsg_y11 = avgMsg(profile.y11)

// avg messages sent per mp grade band

let y11Grade = profile.y11.sort((a, b) => {
    return a.mp_grade - b.mp_grade
})

let y10exGrade = profile.y10ex.sort((a, b) => {
    return a.mp_grade - b.mp_grade
})

// [[number of grades, avg msg, total msg]]
let y11CountArr_msg = [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]]
let y10exCountArr_msg = [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]]

y10exGrade.forEach((val) => {
    y10exCountArr_msg[val.mp_grade - 1][0] = y10exCountArr_msg[val.mp_grade - 1][0] + 1
    y10exCountArr_msg[val.mp_grade - 1][2] = y10exCountArr_msg[val.mp_grade - 1][2] + val.messagesSent
})

y11Grade.forEach((val) => {
    y11CountArr_msg[val.mp_grade - 1][0] = y11CountArr_msg[val.mp_grade - 1][0] + 1
    y11CountArr_msg[val.mp_grade - 1][2] = y11CountArr_msg[val.mp_grade - 1][2] + val.messagesSent
})

y10exCountArr_msg.forEach((val) => {
    if (val[2] != 0) {
        val[1] = val[2]/val[0]
    }
})

y11CountArr_msg.forEach((val) => {
    if (val[2] != 0) {
        val[1] = val[2]/val[0]
    }
})

// avg amount of time between messages sent per mp grade band\
// [[number of grades, avg msg_time, total msg_time]]

let y11CountArr_time = [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]]
let y10exCountArr_time = [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]]

y10exGrade.forEach((val) => {
    y10exCountArr_time[val.mp_grade - 1][0] = y10exCountArr_time[val.mp_grade - 1][0] + 1
    y10exCountArr_time[val.mp_grade - 1][2] = y10exCountArr_time[val.mp_grade - 1][2] + val.avgTime
})

y11Grade.forEach((val) => {
    y11CountArr_time[val.mp_grade - 1][0] = y11CountArr_time[val.mp_grade - 1][0] + 1
    y11CountArr_time[val.mp_grade - 1][2] = y11CountArr_time[val.mp_grade - 1][2] + val.avgTime
})

y10exCountArr_time.forEach((val) => {
    if (val[2] != 0) {
        val[1] = val[2]/val[0]
    }
})

y11CountArr_time.forEach((val) => {
    if (val[2] != 0) {
        val[1] = val[2]/val[0]
    }
})

const fsArr = {
    "avg": {
        "grades": {
            "y11": {
                "exam": avgGrade_exam_y11,
                "mp": avgGrade_mp_y11
            },
            "y10ex": {
                "exam": avgGrade_exam_y10ex,
                "mp": avgGrade_mp_y10ex
            }
        },

        "time": {
            "y11": avgTime_y11,
            "y10ex": avgTime_y10ex
        },

        "msg": {
            "y11": avgMsg_y11,
            "y10ex": avgMsg_y10ex
        }
    },

    "gradeBand": {
        "msg": {
            "y11": y11CountArr_msg,
            "y10": y10exCountArr_msg
        },

        "time": {
            "y11": y11CountArr_time,
            "y10": y10exCountArr_time
        }
    }
}

fs.writeFile("./jsons/general/analysis.json", JSON.stringify(fsArr), (err) => {
    if (err) { throw err }
    console.log("Done")
})

console.log(fsArr)

// calculation functions
function avgGrade_exam(std) {
    let total = 0
    let avg = 0

    for (let x = 0; x < std.length; x = x + 1) {
        total = total + std[x].exam_percentage
    }

    avg = total / std.length

    return avg
} // returns avg exam grade


function avgGrade_mp(std) {
    let total = 0
    let avg = 0

    for (let x = 0; x < std.length; x = x + 1) {
        total = total + std[x].mp_grade
    }

    avg = total / std.length

    return avg
} // returns avg mp grade

function avgMsg(std) {
    let total = 0
    let avg = 0

    for (let x = 0; x < std.length; x = x + 1) {
        total = total + std[x].messagesSent
    }

    avg = total / std.length

    return avg
} // returns average amount of messages

function avgTime(std) {
    let total = 0
    let avg = 0

    for (let x = 0; x < std.length; x = x + 1) {
        total = total + std[x].avgTime
    }

    avg = total / std.length

    return avg
} // returns average amount of time between messages
