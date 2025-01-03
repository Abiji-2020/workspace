# Use an official Go image as the base
FROM golang:1.23

# Set the working directory
WORKDIR /app

# Copy go.mod and go.sum files first
COPY go.mod go.sum ./

# Download dependencies (instead of go mod download, use go get)
RUN go get -d -v ./...

# Copy the rest of the source code
COPY . .

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["go", "run", "NexOrb/main.go"]
