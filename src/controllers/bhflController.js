import "dotenv/config"

import {
  fibonacci,
  primes,
  lcmArray,
  hcfArray
} from "../services/math.js";

import { askAI } from "../services/ai.js";
import { success, fail } from "../utils/response.js";

const EMAIL = process.env.OFFICIAL_EMAIL;

export const healthCheck = (req, res) => {
    console.log(EMAIL)
  res.json(success(EMAIL));
};

export const handleBFHL = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json(fail(EMAIL, "Request body required"));
    }

    const keys = Object.keys(req.body);

    if (keys.length !== 1) {
      return res.status(400).json(fail(EMAIL, "Exactly one key required"));
    }

    const key = keys[0];
    const value = req.body[key];

    let result;

    if (key === "fibonacci") {
      if (value > 1000) {
        return res.status(400).json(
          fail(EMAIL, "Input too large")
        );
      }

      result = fibonacci(value);

    } else if (key === "prime") {
      result = primes(value);

    } else if (key === "lcm") {
      result = lcmArray(value);

    } else if (key === "hcf") {
      result = hcfArray(value);

    } else if (key === "AI") {
      result = await askAI(value);

    } else {
      return res
        .status(400)
        .json(fail(EMAIL, "Unsupported key"));
    }

    res.json(success(EMAIL, result));

  } catch (error) {
    next(error);
  }
};
