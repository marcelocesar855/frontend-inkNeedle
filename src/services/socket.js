import SocketIOClient from "socket.io-client";
import { getToken } from './auth';

export default () => {
    const socket = SocketIOClient(process.env.REACT_APP_API_URL);

    socket.emit('init', getToken());

    return socket;    
};