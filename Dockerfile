FROM node:18-alpine
# Create app directory
RUN mkdir -p /usr/src/app
# Create a non-root group and user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Set working directory
WORKDIR /usr/src/app
# Copy package.json
COPY --chown=appuser:appgroup package.json .
# Install app dependencies
RUN npm install --production
# Install forever as non-root
RUN npm install -g forever --production
# Bundle app source
COPY --chown=appuser:appgroup . .
# Expose port
EXPOSE 3000
# Start npm as non-root
USER appuser
# Start the application
CMD [ "npm", "start" ]