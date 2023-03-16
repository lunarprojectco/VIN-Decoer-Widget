(function ($) {
  // Define constants
  const CAR_MD_API_BASE_URL = 'https://api.carmd.com/v3.0';
  const PARTNER_TOKEN = 'c66918d63fa043e4afb3e8fa7bf37951';
  const AUTHORIZATION_KEY = 'Basic OWU1NWM3OGEtZGRhMC00NmRhLWI0YjYtM2Y5ODA1YTBhZDYz';

  // Define helper functions
  function decodeVIN(vin) {
    return new Promise(function (resolve, reject) {
      const requestUrl = CAR_MD_API_BASE_URL + '/decode?vin=' + encodeURIComponent(vin);
      $.ajax({
        url: requestUrl,
        type: 'GET',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('partner-token', PARTNER_TOKEN);
          xhr.setRequestHeader('authorization', AUTHORIZATION_KEY);
        },
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, status, error) {
          reject(xhr.responseText);
        }
      });
    });
  }

  function displayVINData(data) {
    $('#vin-widget-output').html(
      '<ul>' +
      '<li><strong>Year:</strong> ' + data.year + '</li>' +
      '<li><strong>Make:</strong> ' + data.make + '</li>' +
      '<li><strong>Model:</strong> ' + data.model + '</li>' +
      '<li><strong>Trim:</strong> ' + data.trim + '</li>' +
      '<li><strong>Engine:</strong> ' + data.engine + '</li>' +
      '<li><strong>Drive Type:</strong> ' + data.driveType + '</li>' +
      '<li><strong>Vehicle Type:</strong> ' + data.vehicleType + '</li>' +
      '<li><strong>Body Type:</strong> ' + data.bodyType + '</li>' +
      '<li><strong>Fuel Type:</strong> ' + data.fuelType + '</li>' +
      '</ul>'
    );
  }

  // Define click handler for scan button
  $('#vin-widget-scan-button').click(function () {
    // Check if camera is supported by device
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Sorry, your device does not support camera scanning.');
      return;
    }

    // Get reference to video element
    const videoElement = $('#vin-widget-video').get(0);

    // Request permission to access camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        // Start playing video stream in video element
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch(function (error) {
        alert('Sorry, there was an error accessing the camera: ' + error.message);
      });

    // Define function to stop video stream
    function stopVideoStream() {
      videoElement.pause();
      videoElement.srcObject = null;
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }

    // Define function to process scanned VIN
    function processScannedVIN(vin) {
      decodeVIN(vin)
        .then(function (data) {
          displayVINData(data);
          stopVideoStream();
        })
        .catch(function (error) {
          alert('Sorry, there was an error decoding the VIN: ' + error);
          stopVideoStream();
        });
    }

    // Set up barcode scanner
