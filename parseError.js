module.exports = parseError = text => {
  text = text.replace(/^\s*[\r\n]/gm, "")
  var array = text.split("\n")

  var errors = {}

  console.log(array)
  console.log("----------")
  console.log("----------")

  array.forEach((v, k) => {
    if (v.includes("<syntax error>")) {
      var synerr = array[k - 1].split(",")
      errors[">"] = " syntax error on" + synerr[1] + synerr[2]
    } else if (v.includes("  The value ")) {
      errors[">"] = array.slice(k - 3, k + 1).join("\n")
    } else if (v.includes("  The variant constructor ")) {
      errors[">"] = array.slice(k - 3, k + 1).join("\n")
    } else if (v.includes("  You referred to the module ")) {
      errors[">"] = array.slice(k, k + 2).join("\n")
    } else if (v.includes("Error: String li") || v.includes("Error: Module")) {
      const errorPosition = array[k - 1]
        .split(",")
        .slice(1)
        .join("")
      errors[">"] = array
        .slice(k, k + 1)
        .join("\n")
        .concat(errorPosition)
    } else if (v.includes("  The module or file ")) {
      errors[">"] = array.slice(k - 3, k + 1).join("\n")
    } else if (v.includes("  This has type:")) {
      errors["<type error>"] = array.slice(k - 3, k + 4).join("\n")
    }

    if (v.includes("  Hint:")) {
      errors["hint"] = v
    }
  })
  return errors
}
