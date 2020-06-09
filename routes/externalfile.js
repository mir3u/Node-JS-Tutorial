process.send("Hello");

process.on('message', message => {
    console.log('message from parent:', message);
});