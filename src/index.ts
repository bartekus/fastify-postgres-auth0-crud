import { server } from './app/app';

const PORT = process.env.PORT;

server.listen(PORT, (err, address) => {
    if (err) {
        console.log('error ', err);
    } else {
        server.log.info(`server has started on ${address}`);
    }
});
