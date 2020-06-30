const fs = require("fs")

const data = JSON.parse(fs.readFileSync("classes.json"))

// console.log(data)

let student_data = []

data.y11.forEach(element => {
    student_data.push({"id": element.id, "year_level": "y11"})
})

data.y10ex.forEach(element => {
    student_data.push({"id": element.id, "year_level": "y10ex"})
})

// console.log(student_data)

fs.writeFile("student.json", JSON.stringify(student_data, null, 2), (err) => {
    if (err) { throw err }
    console.log("DATA WRITTEN")
})
