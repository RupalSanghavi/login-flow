// import request from './fakeRequest';

/**
 * Authentication lib
 * @type {Object}
 */
var auth = {
  /**
   * Logs a user in
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was logged in on the remote server
   */
  login(username, password, callback) {
    // If there is a token in the localStorage, the user already is
    // authenticated
    console.log("sdfl");
    if (this.loggedIn()) {
      callback(true);
      return;
    }
    var request = require('superagent');
    //const url = "http://192.168.56.103/login";
    const url = "http://private-58586-hartcenterportal.apiary-mock.com/login";
    var authenticated = " ";
    request
      .post(url)
      .send({ username: username, password: password})
      .accept('application/json')
      .then(function(res) {
        debugger;
        if(res.body.authenticated){
            console.log("IN")
            localStorage.token = res.body.token;
            callback(true);
          }else {
            // If there was a problem authenticating the user, show an error on the
            // form
            callback(false, res.error);
          }
        // authenticated = res.authenticated;
        // return res;
      })
      // .then((res) => if(authenticated){
      //     localStorage.token = response.token;
      //     callback(true);
      //   }else {
      //     // If there was a problem authenticating the user, show an error on the
      //     // form
      //     callback(false, response.error);
      //   }
      //)
    // Post a fake request (see below)
    // request.post('/login', { username, password }, (response) => {
    //   // If the user was authenticated successfully, save a random token to the
    //   // localStorage
    //   if (response.authenticated) {
    //     localStorage.token = response.token;
    //     callback(true);
    //   } else {
    //     // If there was a problem authenticating the user, show an error on the
    //     // form
    //     callback(false, response.error);
    //   }
    // });
  },
  /**
   * Logs the current user out
   */
  logout(callback) {
    request.post('/logout', {}, () => {
      callback(true);
    });
  },
  /**
   * Checks if anybody is logged in
   * @return {boolean} True if there is a logged in user, false if there isn't
   */
  loggedIn() {
    return !!localStorage.token;
  },

  /**
   * Registers a user in the system
   * @param  {string}   username The username of the user
   * @param  {string}   password The password of the user
   * @param  {Function} callback Called after a user was registered on the remote server
   */
  register(username, password, callback) {





    // Post a fake request
    // request.post('/register', { username, password }, (response) => {
    //   // If the user was successfully registered, log them in
    //   if (response.registered === true) {
    //     this.login(username, password, callback);
    //   } else {
    //     // If there was a problem registering, show the error
    //     callback(false, response.error);
    //   }
    // });
  },
  onChange() {}
}

module.exports = auth;
