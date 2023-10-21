const fs = require('fs')
const code = `module.exports = {
    mode: "release",
};`
fs.writeFileSync('env.js', code, err => {
  if (err) {
    console.error(err)
    return
  }
  console.log('JavaScript(release) file created and code written successfully!')
})
