const debug = require("debug")("app.js");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

<<<<<<< HEAD


=======
const checker = require("./checker.js");
>>>>>>> checker

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 3})
<<<<<<< HEAD
})
=======
});

//url checker endpoint
app.post('/check',function (req, res) {
	debug(req.body)

	if(req.body.url) {
		checker(
            req.body.url,
            req.body.invocationParameters,
            req.body.expectedResultData,
            req.body.expectedResultStatus)
        // checker(...req.query)
        .then((result) => {
			debug(result);
			res.json(result);
		});
	} else {
		throw Error("It is required and url");
	}
});


//error handler
app.use(function(error, req, res, next) {
	res.status(error.status || 500);
	res.json({
		message: error.message
	});
});

>>>>>>> checker

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
