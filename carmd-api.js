var carmdAPI = {
  apiUrl: 'https://api.carmd.com/v3.0',
  partnerToken: 'c66918d63fa043e4afb3e8fa7bf37951',
  authorizationKey: 'Basic OWU1NWM3OGEtZGRhMC00NmRhLWI0YjYtM2Y5ODA1YTBhZDYz',

  decodeVIN: function(vin, callback) {
    var url = this.apiUrl + '/decode?vin=' + vin;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('partner-token', this.partnerToken);
    xhr.setRequestHeader('authorization', this.authorizationKey);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        callback(null);
      }
    };
    xhr.send();
  },

  getMakeModels: function(make, year, callback) {
    var url = this.apiUrl + '/makemodels?make=' + make + '&year=' + year;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('partner-token', this.partnerToken);
    xhr.setRequestHeader('authorization', this.authorizationKey);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        callback(null);
      }
    };
    xhr.send();
  },

  getSubModels: function(make, model, year, callback) {
    var url = this.apiUrl + '/submodels?make=' + make + '&model=' + model + '&year=' + year;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('partner-token', this.partnerToken);
    xhr.setRequestHeader('authorization', this.authorizationKey);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        callback(data);
      } else {
        callback(null);
      }
    };
    xhr.send();
  }
};
