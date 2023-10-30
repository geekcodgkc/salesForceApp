import { io } from "socket.io-client";

const URL = "http://10.30.30.254:8002";

export const socket = io(URL, {
	autoConnect: true,
	reconnection: true,
});

const login = ({ roomID, readID }) => {
	io(URL, {
		autoConnect: true,
		reconnection: true,
		auth: {
			token: "3egUxGRb1x2ekiHreBshswQpsEL0QsgOtSYcMYiiOoPx7PtU70EYpHdJ6vALOisb",
			roomID,
			readID,
		},
	});
};

io.on("connect", () => {
	socket.emit("getDraft");
});

io.on("draft", (e) => {
	console.log("draft: ", e);
});

export { login, io };
