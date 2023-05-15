let counter = 0; // A counter to keep track of the frames

let isSaving = true;

let video;
function preload() {
  video = vid = createVideo("https://jdeboi-public.s3.us-east-2.amazonaws.com/documents/vid3.mp4");
  video.hide(); // Hide the video element
}

// Set up the canvas
function setup() {
  createCanvas(320, 180); // Set the canvas size to match the thumbnail size
}

function draw() {
  if (video) {
    // Draw the video frame on the canvas
    image(video, 0, 0, width, height);

    if (isSaving) {
      // Save the canvas as an image every second
      
        saveCanvas('thumbnail' + counter, 'jpg'); // Save the canvas as a JPG image with a unique name
        counter+= ; // Increment the counter
     
      if (video.time() == video.duration()) { // Loop the video
        video.time(0);
        isSaving = false;
      }
    }

  }

}