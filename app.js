document.addEventListener('DOMContentLoaded', function() {
    const cameraStream = document.getElementById('camera-stream');
    const captureButton = document.getElementById('capture-button');
    const capturedImage = document.getElementById('captured-image');
    const photo = document.getElementById('photo');
    const context = capturedImage.getContext('2d');

    // Access the camera
    async function startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
            cameraStream.srcObject = stream;
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access the camera. Please check your browser permissions.');
        }
    }

    // Capture photo
    captureButton.addEventListener('click', function() {
        context.drawImage(cameraStream, 0, 0, 640, 480);
        const imageDataURL = capturedImage.toDataURL('image/png');
        photo.src = imageDataURL;
        photo.style.display = 'block'; // Show the photo
    });

    // Start the camera when the page loads
    startCamera();
});