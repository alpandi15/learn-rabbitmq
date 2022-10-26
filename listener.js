const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err
    connection.createChannel((err, channel) => {
        if (err) throw err

        let queueName = 'notification.test'
        channel.assertQueue(queueName)

        channel.consume(queueName, (msg) => {
            console.log('Received: ', msg.content.toString())
        }, {
            noAck: true
        })
    })
})