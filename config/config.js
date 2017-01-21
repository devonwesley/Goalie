const path = require('path')
const fs = require('fs')

let config

const env = () => process.env.NODE_ENV || 'development'
const isProduction = () => env() === 'production'
const testEnv = () => process.env.NODE_ENV || 'test'

const readConfig = () => {
  if(config){
    return config
  } else {
    const _env = env()
    const filepath = path.join(__dirname, `./${_env}.json`)
    try {
      config = JSON.parse(fs.readFileSync(filepath).toString())
      return config
    } catch(e) {
      throw new Error(`Error reading config file : ${filepath}`)
    }
  }
}

export {readConfig}
