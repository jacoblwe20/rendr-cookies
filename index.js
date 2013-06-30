var 
// depedencies
Cookies = require("cookie"),
_ = require("underscore");

// getAll is a method that gets all cookies 
getAll = function(){

	if(typeof document === "object"){
		return Cookies.parse(document.cookie);
	}else{
		if( typeof this.app.req.headers.cookie === "string" ){
			return Cookies.parse(this.app.req.headers.cookie);
		}
		return null;
	}

	return null;

};

// get the cookies by name, first param is the name of the cookie
// this should be a string
exports.get = function( name ){

	var 
	cookies = getAll.call(this) || {},
	pattern = new RegExp(name),
	value, 
	obj;

	for(var key in cookies){
		if(key === name) {
			value = decodeURIComponent(cookies[key]);
		}
	}
	try {
		// since we are using express's default cookies
		// it has a j: prefix
		obj = JSON.parse(value.replace(/^j:/, ""));
	} catch(){
		obj = value; 
		// reset value to string value if error occurs in json parse
	}


	return obj;

};

// set the cookie is the a way to set a cookie the frist param
// is the cookie name and the soecond is the payload to be set
// for the cookies data can be a string or an object
exports.set = function( name, value, opts ){

	if(typeof document === "object"){
		// literally taken from 
		// https://github.com/visionmedia/express/blob/master/lib/response.js#L583
		// so we make the same looking cookies
		if ('number' == typeof value) value = value.toString();
  		if ('object' == typeof value) value = 'j:' + JSON.stringify(value);
  		if (null == options.path) options.path = '/';
  		if ('maxAge' in options) {
		    options.expires = new Date(Date.now() + options.maxAge);
		    options.maxAge /= 1000;
		}
		var cookie = Cookies.serialize( name, value, opts );
		document.cookie += cookies;
		// do client stuff
	}else if(
		this.app &&
		typeof this.app.req === "object"
		typeof this.app.req.res === "object"
	){
		// use express to set cookie
		this.app.req.res.cookie( name, value, opts );
	}
};

exports.getAll = getAll;
