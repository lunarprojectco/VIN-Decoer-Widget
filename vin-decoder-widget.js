// Variables to store the DOM elements
const video = document.getElementById('vin-decoder-widget-video');
const canvas = document.getElementById('vin-decoder-widget-canvas');
const scanBtn = document.getElementById('vin-decoder-widget-scan-btn');
const resultsContainer = document.getElementById('vin-decoder-widget-results');

// Variables to store the ML Kit and CarMD API objects
let vision;
let carmd;

// Variables to store the API keys
const mlKitApiKey = 'AIzaSyC3iRR3sSC07cXfIWQjO0gVze6AtP18tLw';
const carmdApiKey = 'c66918d63fa043e4afb3e8fa7bf37951';
const carmdAuthKey = 'Basic OWU1NWM3OGEtZGRhMC00NmRhLWI0YjYtM2Y5ODA1YTBhZDYz';

// Function to initialize the ML Kit and CarMD API objects
async function initialize() {
    // Initialize the ML Kit Vision object
    await firebase.initializeApp({
        apiKey: mlKitApiKey,
    });

    vision = await firebase
        .app()
        .functions('us-central1')
        .httpsCallable('processImage');

    // Initialize the CarMD API object
    carmd = axios.create({
        baseURL: 'https://api.carmd.com/v3.0',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Partner-Token': carmdApiKey,
            'Authorization': carmdAuthKey,
        },
    });
}

// Function to decode the VIN number
async function decodeVinNumber() {
    // Get the current video stream
    const stream = video.srcObject;

    // Stop the video stream
    video.srcObject = null;
    stream.getVideoTracks()[0].stop();

    // Set the canvas dimensions to match the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to the canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to a base64-encoded string
    const image = canvas.toDataURL('image/jpeg');

    // Use ML Kit Vision to process the image and extract the VIN number
    const response = await vision({
        image: image,
        features: ['TEXT_DETECTION'],
    });

    const text = response.data.responses[0].fullTextAnnotation.text;
    const vin = text.match(/[A-HJ-NPR-Z0-9]{17}/g)[0];

    // Use the CarMD API to get the vehicle details for the extracted VIN number
    const vehicleDetails = await carmd.get(`/vehicle?vin=${vin}`);

    // Display the vehicle details in the results container
    resultsContainer.innerHTML = `
        <h2>Vehicle Details:</h2>
        <p><strong>VIN:</strong> ${vin}</p>
        <p><strong>Make:</strong> ${vehicleDetails.data.data.make}</p>
        <p><strong>Model:</strong> ${vehicleDetails.data.data.model}</p>
        <p><strong>Year:</strong> ${vehicleDetails.data.data.year}</p>
        <p><strong>Engine:</strong> ${vehicleDetails.data.data.engine}</p>
        <p><strong>Trim:</strong> ${vehicleDetails.data.data.trim}</p>
    `;
}

