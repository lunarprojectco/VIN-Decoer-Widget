(function ($) {
  // Define constants
  const CAR_MD_API_BASE_URL = 'https://api.carmd.com/v3.0';
  const PARTNER_TOKEN = 'c66918d63fa043e4afb3e8fa7bf37951';
  const AUTHORIZATION_KEY = 'Basic OWU1NWM3OGEtZGRhMC00NmRhLWI0YjYtM2Y5ODA1YTBhZDYz';
  const ML_KIT_API_KEY = 'AIzaSyC3iRR3sSC07cXfIWQjO0gVze6AtP18tLw';

  // Define helper functions
  function decodeVIN(vin) {
    return new Promise(function (resolve, reject) {
      const requestUrl = 'https://automl.googleapis.com/v1beta1/projects/156008741883/locations/us-central1/models/VIN_Decoder:predict';
      const requestBody = {
        payload: {
          image: {
            imageBytes: vin
          }
        }
      };
      $.ajax({
        url: requestUrl,
        type: 'POST',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Authorization', 'Bearer ' + ML_KIT_API_KEY);
        },
        data: JSON.stringify(requestBody),
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
    const vehicleData = data.payload[0].displayName.split(' ');
    $('#vin-widget-output').html(
      '<ul>' +
      '<li><strong>Year:</strong> ' + vehicleData[0] + '</li>' +
      '<li><strong>Make:</strong> ' + vehicleData[1] + '</li>' +
      '<li><strong>Model:</strong> ' + vehicleData[2] + '</li>' +
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

    //
