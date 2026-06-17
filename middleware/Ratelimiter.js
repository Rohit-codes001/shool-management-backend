import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 100, // production par 3 to 5

  message: {
    success: false,
    message:
      "Too many demo booking attempts. Please try again after 15 minutes.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;