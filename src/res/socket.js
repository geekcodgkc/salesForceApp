import { io } from "socket.io-client";

const url = "http://10.30.30.254:8002";

let client;

const initSocket = ({ roomID, readID }) => {
	client = io(url, {
		auth: {
			token: "3egUxGRb1x2ekiHreBshswQpsEL0QsgOtSYcMYiiOoPx7PtU70EYpHdJ6vALOisb",
			roomID,
			readID,
		},
		autoConnect: true,
		reconnection: true,
	});

	return client;
};

const getSocket = () => {
	return client;
};

const socketHandler = (socket) => {
	socket.emit("getDraft");

	socket.on("draft", (e) => {
		console.log("draft: ", e);
	});
};

export { getSocket, initSocket, socketHandler };
