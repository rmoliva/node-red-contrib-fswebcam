const NodeWebcam = require( 'node-webcam' );

module.exports = function(RED) {
  const opts = {
    //Picture related
    width: 1280,
    height: 720,
    quality: 100,

    // Number of frames to capture
    // More the frames, longer it takes to capture
    // Use higher framerate for quality. Ex: 60
    frames: 1,

    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows
    delay: 0,

    //Save shots in memory
    saveShots: true,

    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "jpeg",

    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    // device: false,

    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "buffer",

    //Logging
    verbose: false
  }

  function FSWebcamNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;
    node.on('input', function(msg) {
      opts.width = config.width;
      opts.height = config.height;
      opts.quality = config.quality;
      opts.device = config.device;

      const Webcam = NodeWebcam.create( opts );

      Webcam.capture( "test_picture", function( err, data ) {
        msg.payload = data;
        msg.error = err;
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType('fswebcam', FSWebcamNode);
}
