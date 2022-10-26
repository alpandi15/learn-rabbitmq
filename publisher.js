const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err

    connection.createChannel((err, channel) => {
        if (err) throw err

        let queueName = 'notification.test'
        let message = 'Are you ready?'
    
        channel.assertQueue(queueName)

        channel.sendToQueue(queueName, Buffer.from(message))

        setTimeout(() => {
            connection.close()
        }, 1000)
    })
})