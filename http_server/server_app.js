var connect = require('connect');

// var errorCreator = require('./error_creator');
// var saveRequest = require('./save_request');
// var writeHeader = require('./write_header');
// var replyText = require('./reply_text');
// var errorHandler = require('./error_handler');

var app = connect();

//setup logger middleware
var format = ':method :url - :status - :response-time ms'
app.use(connect.logger(format));

//add error handler
app.use(connect.errorHandler());

//setup the static file server
app.use(connect.static(__dirname + '/public'));

//setup the query middleware
app.use(connect.query());

//setup the body parser
app.use(connect.bodyParser());

//setup middleware
app.use(connect.cookieParser());

//setup session store 
app.use(connect.session({
	cookie: {maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(function(req, res) {
	res.end(JSON.stringify(req.body));
});

//actually respond

app.use(function(req, res) {
	for (var name in req.query) {
		req.session[name] = req.query[name];
	}
	res.end(format(req.session) + '\n');
});


// app.use(function(req, res) {
// 	res.end(JSON.stringify(req.cookies));
// });


// app.use(function(req, res) {
// 	res.end(JSON.stringify(req.query));
// });


app.use(function(req, res) {
	res.end('Hello World!');
});


app.listen(4001);


