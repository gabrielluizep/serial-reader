const { appendFile } = require('fs')
const { SerialPort, ReadlineParser } = require('serialport')

const myPort = new SerialPort({ path: 'COM4', baudRate: 115200 })

const parser = myPort.pipe(new ReadlineParser({ delimiter: '\n' }))

const onOpen = () => {
  console.log('open')
}
const onData = (data) => {
  // if (data.includes('Ultimas leituras')) {
  // data = `[READ] ${data}`
  // }
  //
  // if (data.includes('cm serial')) {
  // data = `[READ] ${data}`
  // }

  // if (data.includes('cm serial') || data.includes('Ultimas leituras')) {
  //   return
  // }

  console.log(data)

  appendFile('data.md', `${data}\n`, (err) => {
    if (err) {
      console.log(err)
    }
  })
}

parser.on('open', onOpen)
parser.on('data', onData)
