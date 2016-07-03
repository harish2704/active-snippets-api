var nodemailer = require('nodemailer');
var config = require('config');
var ejs  = require('ejs');
var fs = require('fs');
var child_process = require('child_process');
var Promise = require('bluebird');
var path = require('path');


// create reusable transporter object using the default SMTP transport

function sendMailReal( opts ){
  var transporter = nodemailer.createTransport( config.mail.authStr );
  return Promise.fromCallback(function(cb){
    return transporter.sendMail(opts, cb);
  });
}


function sendMailDev( opts ){
  var tmpDir =  config.appRoot + '/temp' ;
  if( !fs.existsSync( tmpDir ) ){
    fs.mkdirSync( tmpDir )
  }
  var tmpFileName = path.join( tmpDir, Date.now() + '.html' );
  fs.writeFileSync( tmpFileName, opts.html );
  child_process.exec('xdg-open ' + tmpFileName )
  return Promise.resolve();
}

function sendMail( opts ){
  if( config.env == 'development' ){
    return sendMailDev( opts );
  } else {
    return sendMailReal( opts );
  }
}

exports.sendRegistrationMail = function( user ){

  var emailData = {
    link: config.SITE_ROOT + '/verify?emailToken=' + user.emailToken,
    user: user,
  };
  var emailTmpl = fs.readFileSync( config.appRoot + '/mail-templates/registration.html', 'utf-8' );
  var emailBody = ejs.render( emailTmpl, emailData );

  var mailOptions = {
    from: config.mail.email,
    to: user.email,
    subject: 'Please verify your email',
    html: emailBody,
  };

  return sendMail( mailOptions );
}




