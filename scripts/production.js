const fs = require('fs')
const code = `module.exports = {
    mode: "prod",
};`
fs.writeFileSync('env.js', code, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('JavaScript(prod) file created and code written successfully!')
})
