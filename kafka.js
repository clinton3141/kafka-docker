const { Kafka } = require('kafkajs');

const clientId = 'test-app';
const brokers = ['127.0.0.1:9092'];
const topic = 'test-log';

const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();

const produce = async () => {
  await producer.connect();
  const randomValues = Array(1000).fill(null).map(x => Math.random());
  await Promise.all(randomValues.map(async (v, i) => {
    try {
      await producer.send({
        topic,
        messages: [
          {
            key: i.toString(),
            value: v.toString(),
          }
        ]
      });
      console.log(`sent message ${i}`);
    } catch (e) {
      console.error(`could not send message. ${err}`);
    }
  }));
  await producer.disconnect();
};

produce().then(() => console.log('done')).catch(e => console.log(e));
