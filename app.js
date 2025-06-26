const video = document.getElementById('camera-stream');
const canvas = document.getElementById('captured-image');
const photo = document.getElementById('photo');
const captureButton = document.getElementById('capture-button');
const gallery = document.getElementById('gallery');

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        alert('Could not access the camera.');
    });

// Capture photo
captureButton.addEventListener('click', () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    photo.src = dataUrl;
    photo.style.display = 'block';

    // Add to gallery
    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = 'Captured Photo';
    img.style.animationDelay = `${gallery.children.length * 0.1}s`;
    gallery.appendChild(img);

    // Optional: click to view larger
    img.addEventListener('click', () => {
        photo.src = img.src;
        photo.style.display = 'block';
        photo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});