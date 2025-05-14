



export const renderPredictions = (predictions: any, canvas: any) => {

  const context = canvas.getContext('2d')
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);



  // Fonts
  const font = "16px sans-serif";
  context.font = font;
  context.textBaseline = "top";

  predictions.forEach((prediction: any) => {
    const [x, y, width, height] = prediction["bbox"];
    

    // bounding box
    context.strokeStyle = prediction.class === 'person' ? "#FFF000" : "#00FFFF";
    context.lineWidth = 4;
    context.strokeRect(x, y, width, height);

    // fill the color
    context.fillStyle = `rgba(255, 0, 0, ${prediction.class === 'person' ? 0.2 : 0})`; // Set the fill color to red
    context.fillRect(x, y, width, height);

    // Draw the label background.
    context.fillStyle = prediction.class === 'person' ? "#FFF000" : "#00FFFF";
    const textWidth = context.measureText(prediction.class).width;
    const textHeight = parseInt(font, 10); // base 10
    context.fillRect(x, y, textWidth + 4, textHeight + 4);

    context.fillStyle = "#000000";
    context.fillText(prediction.class, x, y);
    

    
  });

  
};




