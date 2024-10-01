import jwt from "jsonwebtoken";

export function signSessionJwts(user) {
  const accessToken = jwt.sign(
    {
      user,
    },
    process.env.JWT_SECRET,
    { expiresIn: + process.env.ACCESS_TOKEN_EXPIRE }
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: +process.env.REFRESH_TOKEN_EXPIRE }
  );

  return { accessToken, refreshToken };
}

export function decodeRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}