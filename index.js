var fs = require("fs")
const { exec } = require("child_process")

const parseError = require("./parseError.js")

module.exports = function jsOfReason(reasonCode, callback) {
  var error = undefined
  var code = undefined

  fs.writeFileSync(__dirname + "/output/output.re", reasonCode)

  var getJsCode = setTimeout(() => {
    if (fs.existsSync(__dirname + "/output/output.bs.js")) {
      fs.readFile(__dirname + "/output/output.bs.js", (err, data) => {
        callback(error, data.toString())
      })
    } else {
      callback("more than 2s compiling")
    }
  }, 2000)

  exec(
    `cd node_modules/js-of-reason/ && npm run build`,
    (err, stdout, stderr) => {
      if (err) {
        error = parseError(stdout)
        clearTimeout(getJsCode)
        callback(error, code)
      }
    },
  )
}
