import * as tf from "@tensorflow/tfjs";
import { TensorLike2D } from "@tensorflow/tfjs-core/dist/types";
import { loadGraphModel } from "@tensorflow/tfjs-converter";

const on_fail_response =
  "I'm sorry, I wasn't able to understand. Kindly elaborate...";

type authorType = "user" | "bot" | "system" | null;

/**
 * Represents a conversation between the user and the bot.
 */
export interface ConversationProps {
  id: ReturnType<typeof crypto.randomUUID>;
  text: string;
  time: Date;
  author: authorType;
}

interface VectorizerProps {
  user_input: string;
  vector: Float32Array | Int32Array | Uint8Array;
  time: string;
}

interface PredictionProps {
  id: ReturnType<typeof crypto.randomUUID>;
  user_input: string;
  response: string;
  time: string;
}

/**
 * Vectorizes the user input by sending it to the server for processing.
 * @param userInput - The user input to be vectorized.
 * @returns The vectorized user input.
 */
async function vectorizeUserInput(userInput: string) {
  const response = await fetch("http://localhost:3333/vectorize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_input: userInput }),
  });
  if (!response.ok) {
    throw new Error("Could not vectorize user input.");
  }
  const data: VectorizerProps = await response.json();
  return data;
}

/**
 * Loads the TensorFlow.js model.
 * @returns The loaded model.
 */
async function loadModel() {
  const model = await loadGraphModel("chatbot.model.tfjs/model.json");
  model.load();
  return model;
}

/**
 * Makes a prediction using the provided model and input data.
 * @param model - The TensorFlow.js model.
 * @param inputData - The input data for prediction.
 * @returns The prediction output.
 */
async function predict(model: tf.GraphModel, inputData: TensorLike2D) {
  const inputTensor = tf.tensor2d(inputData);
  const output = model.predict(inputTensor) as tf.Tensor;

  return output.reshape([inputData.length, -1]).dataSync();
}

async function parsePrediction(
  userInput: string,
  prediction: Float32Array | Int32Array | Uint8Array
) {
  const response = await fetch("http://localhost:3333/response", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_input: userInput,
      vector: prediction,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not parse prediction.");
  }

  const data: PredictionProps = await response.json();
  return data;
}

/**
 * Predicts the user input by loading the model, vectorizing the input, and making a prediction.
 * @param userInput - The user input to be predicted.
 * @returns The prediction output.
 */
export async function getBotResponse(userInput: string) {
  try {
    if (greet_inputs.includes(userInput.toLowerCase())) {
      return createGreeting(userInput);
    }

    if (bye_inputs.includes(userInput.toLowerCase())) {
      return createBye(userInput);
    }

    const model = await loadModel();

    const { vector } = await vectorizeUserInput(userInput);
    const prediction = await predict(model, vector);
    const parsedPred = await parsePrediction(userInput, prediction);

    return parsedPred;
  } catch (err) {
    console.log(err);
    const fail_response = {
      id: crypto.randomUUID(),
      user_input: userInput,
      response: on_fail_response,
      time: new Date().toLocaleTimeString(),
    };
    return fail_response;
  }
}

export const loadingBubbleState: ConversationProps = {
  id: crypto.randomUUID(),
  author: null,
  text: "Typing...",
  time: new Date(),
};

export const greet_inputs = ["hey", "hello", "hi", "whassup", "how are you ?"];

export const greet_responses = ["Hello there!", "Hi!", "Hey !", "Hi there!"];

export const bye_inputs = ["bye", "see you", "goodbye", "see you later"];

export const createGreeting = (userInput: string) => {
  const randomIndex = Math.floor(Math.random() * greet_responses.length);
  const greeting: PredictionProps = {
    id: crypto.randomUUID(),
    user_input: userInput,
    response: greet_responses[randomIndex] + " How can I help you?",
    time: new Date().toLocaleDateString(),
  };

  return greeting;
};

export const createBye = (userInput: string) => {
  const randomIndex = Math.floor(Math.random() * bye_inputs.length);
  const bye: PredictionProps = {
    id: crypto.randomUUID(),
    user_input: userInput,
    response: bye_inputs[randomIndex] + "Thanks for visiting!",
    time: new Date().toLocaleTimeString(),
  };

  return bye;
};
