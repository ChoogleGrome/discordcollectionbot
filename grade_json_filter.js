const grade_10ex = require("./jsons/10ex_grade.json")
const grade_11 = require("./jsons/stage1_grade.json")

const fs = require("fs")

let newGrade_10ex = []

grade_10ex.forEach((val) => {
    // console.log(val)
    delete val["E Grade"]

    if (val.ID == "null") {
        val.ID = null
    }

    switch (val["MP Grade"]) {
        case "D-": val["MP Grade"] = 4; break;
        case "D": val["MP Grade"] = 5; break;
        case "D+": val["MP Grade"] = 6; break;
        case "C-": val["MP Grade"] = 7; break;
        case "C": val["MP Grade"] = 8; break;
        case "C+": val["MP Grade"] = 9; break;
        case "B-": val["MP Grade"] = 10; break;
        case "B": val["MP Grade"] = 11; break;
        case "B+": val["MP Grade"] = 12; break;
        case "A-": val["MP Grade"] = 13; break;
        case "A": val["MP Grade"] = 14; break;
        case "A+": val["MP Grade"] = 15; break;
        default: console.error("GRADE ERROR: MP GRADE"); return;
    }

    newGrade_10ex.push(val)

    // console.log(val)
}) 

fs.writeFile("./jsons/10ex_grade.json", JSON.stringify(newGrade_10ex), (err) => {
    if (err) { throw err }
    console.log("10ex done")
})

let newGrade_11 = []

grade_11.forEach((val) => {
    delete val["E Grade"]

    if (val.ID == "null") {
        val.ID = null
    }

    switch (val["DS Grade"]) {
        case "D-": val["DS Grade"] = 4; break;
        case "D": val["DS Grade"] = 5; break;
        case "D+": val["DS Grade"] = 6; break;
        case "C-": val["DS Grade"] = 7; break;
        case "C": val["DS Grade"] = 8; break;
        case "C+": val["DS Grade"] = 9; break;
        case "B-": val["DS Grade"] = 10; break;
        case "B": val["DS Grade"] = 11; break;
        case "B+": val["DS Grade"] = 12; break;
        case "A-": val["DS Grade"] = 13; break;
        case "A": val["DS Grade"] = 14; break;
        case "A+": val["DS Grade"] = 15; break;
        default: console.error("GRADE ERROR: DS GRADE"); return;
    }

    newGrade_11.push(val)
}) 

fs.writeFile("./jsons/stage1_grade.json", JSON.stringify(newGrade_11), (err) => {
    if (err) { throw err }
    console.log("11 done")
})
