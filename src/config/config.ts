export default {
  jwtSecret: process.env.JWT_SECRET || '',
  DB: {
    URI: process.env.MONGODB_DOCKER_COMPOSE_URI || '',
    USER: process.env.MONGODB_USER || '',
    PASSWORD: process.env.MONGODB_PASSWORD || '',
  },
};
