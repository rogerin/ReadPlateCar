// import dependencies de socket.io-client
// url: https://www.npmjs.com/package/socket.io-client
const io = require('socket.io-client')

// url para conexão
const url = 'https://dev.chat.channel.devexo.com.br'

// inicio de conexão
const socket = io(url, { query: { token: '2694f6db5e1152c42585dbdac784ccf8962a6fd8ac390a6595ac33c06223970b3b16fa2330d700d797e8de83359bf939' } })

// função recebe o evento de connect
const connect = () => {
  console.log('connect socket')
}

// função recebe o evento de disconnect
const disconnect = () => {
  console.log('disconnect')
}

socket.on('error', (data) => {
  console.log(data) // error handler
})

socket.on('connect', connect)
socket.on('disconnect', disconnect)

setTimeout(() => {
  console.log('send connect')
  socket.emit('channel.agent.department.connnect', { token: '2694f6db5e1152c42585dbdac784ccf8962a6fd8ac390a6595ac33c06223970b3b16fa2330d700d797e8de83359bf939', DepartmentId: '1001d11f-6f0c-41d4-a19c-f7e7d7590a20' })
}, 2000)

setTimeout(() => {
  console.log('send disconnect')
  socket.emit('channel.agent.department.disconnect', { token: '2694f6db5e1152c42585dbdac784ccf8962a6fd8ac390a6595ac33c06223970b3b16fa2330d700d797e8de83359bf939', DepartmentId: '1001d11f-6f0c-41d4-a19c-f7e7d7590a20' })
}, 4000)