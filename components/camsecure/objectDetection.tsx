"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // Ensure WebGL backend is included
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import { renderPredictions } from "./renderPredictions";
import ScreenShotPage from "./screenshot";
import { playAudio } from "./functions/playaudio";
import { stopAudio } from "./functions/stopaudio";

interface Prediction {
  class: string;
  score: number;
  bbox: [number, number, number, number];
}

const ObjectDetection = () => {
  const [message, setMessage] = useState("Camera not started");
  const [model, setModel] = useState<any>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [predictionArray, setPredictionArray] = useState<Prediction[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const loadModel = useCallback(async () => {
    setMessage("Loading model...");
    try {
      await tf.setBackend("webgl"); // Choose 'cpu' if preferred
      await tf.ready();
      const loadedModel = await cocoSSDLoad();
      console.log("Model loaded");
      return loadedModel;
    } catch (error) {
      console.error("Model load error:", error);
      setMessage("Problem loading model");
      return null;
    }
  }, []);

  const startCameraWithModel = useCallback(async () => {
    const loadedModel = model ?? (await loadModel());
    if (!loadedModel) {
      setMessage("Unable to load model, please try again");
      return;
    }

    if (!model) setModel(loadedModel);

    if (canvasRef.current && webcamRef.current?.video?.readyState === 4) {
      canvasRef.current.width = webcamRef.current.video.videoWidth;
      canvasRef.current.height = webcamRef.current.video.videoHeight;
      setCameraStarted(true);
      runPredictions(); // <-- Critical: Start prediction loop
    }
  }, [model, loadModel]);

  const startCameraWithoutModel = useCallback(() => {
    if (webcamRef.current?.video?.readyState === 4) {
      const { videoWidth, videoHeight } = webcamRef.current.video;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
    }
  }, []);

  const stopCamera = useCallback(() => {
    setCameraStarted(false);
    setModel(null);
    setMessage("Camera not started");
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const runPredictions = useCallback(async () => {
    if (!model || !cameraStarted || !webcamRef.current?.video) return;

    try {
      const predictions = await model.detect(webcamRef.current.video);

      if (
        predictions.length !== predictionArray.length ||
        JSON.stringify(predictions) !== JSON.stringify(predictionArray)
      ) {
        setPredictionArray(predictions);
      }

      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (context && canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        renderPredictions(predictions, canvas);
      }

      if (predictions.length > 0) {
        const detectedObject = predictions[0].class;
        setPrediction(detectedObject);
        setMessage(
          detectedObject === "person"
            ? "HUMAN DETECTED"
            : `${detectedObject.toUpperCase()} DETECTED`
        );
      } else {
        setPrediction(null);
        setMessage("No object detected");
      }
    } catch (error) {
      console.error("Prediction error:", error);
    }

    animationRef.current = window.setTimeout(runPredictions, 100); // Loop at ~10 FPS
  }, [model, cameraStarted, predictionArray]);

  useEffect(() => {
    startCameraWithoutModel();
  }, [startCameraWithoutModel]);

  const handleStopAudio = useCallback(() => {
    if (audioRef.current) {
      stopAudio(audioRef.current);
    }
  }, []);

  return (
    <div className="mt-2">
      <div className="flex flex-col justify-center items-center bg-transparent py-2">
        <select value={""} onChange={() => {}} className="bg-black text-white">
          <option>Default camera selected</option>
        </select>
      </div>

      <p className="text-center animate-pulse font-extrabold text-xl text-red-500 uppercase">
        {message}
      </p>

      <div className="flex flex-col items-center justify-center">
        {cameraStarted ? (
          <div className="flex gap-2">
            <button
              className="bg-blue-500 my-2 py-2 px-2 rounded-2xl"
              onClick={stopCamera}
            >
              Stop Camera
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 my-2 py-2 px-2 rounded-2xl"
            onClick={startCameraWithModel}
          >
            Start Camera
          </button>
        )}

        <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
          <Webcam
            ref={webcamRef}
            className={`rounded-md w-full lg:h-[420px] ${
              !cameraStarted ? "opacity-25" : ""
            }`}
            muted
            audio={false}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-99999 w-full lg:h-[420px]"
          />
          {!cameraStarted && (
            <p className="absolute gradient-text text-4xl">Camera not started</p>
          )}
        </div>

        {cameraStarted && (
          <div className="flex justify-center gap-3 py-6">
            <ScreenShotPage webcamRef={webcamRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ObjectDetection;
