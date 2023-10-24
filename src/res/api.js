import axios from "axios";

const api = axios.create({
	baseURL: "http://192.168.20.38:3001/",
	headers: {
		Authorization:
			"Bearer 3egUxGRb1x2ekiHreBshswQpsEL0QsgOtSYcMYiiOoPx7PtU70EYpHdJ6vALOisb",
	},
	timeout: 5000,
});

export default api;
