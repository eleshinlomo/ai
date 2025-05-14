export const detectCameras = async () => {
    try {
      // Request permissions to access media devices (if not already granted)
      await navigator.mediaDevices.getUserMedia({ video: true });
  
      // Enumerate all available media devices
      const devices = await navigator.mediaDevices.enumerateDevices();
  
      // Filter for video input devices (cameras)
      const cameras = devices.filter(device => device.kind === 'videoinput');
  
      // Display the detected cameras
      if (cameras.length > 0) {
        console.log(`Detected ${cameras.length} camera(s):`);
        cameras.forEach((camera, index) => {
          console.log(`Camera ${index + 1}: ${camera.label || 'Unnamed Camera'}`);
        });
      } else {
        console.log('No cameras detected.');
      }
  
      return cameras; // Return the list of cameras
    } catch (error) {
      console.error('Error detecting cameras:', error);
      return [];
    }
  };
  
 
  