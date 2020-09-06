const app = require('./app');

// 1. START THE SERVER
const port = 3000;
app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
