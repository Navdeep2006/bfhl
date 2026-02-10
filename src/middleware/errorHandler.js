import { fail } from "../utils/response.js";

export default (err, req, res, next) => {
  console.error(err.message);

  const status = err.status || 500;

  res.status(status).json(
    fail(
      process.env.OFFICIAL_EMAIL,
      status === 400
        ? err.message
        : "Internal server error"
    )
  );
};
