# NexOrb

NexOrb is an all-in-one platform where startups can manage people, tasks, and communication

# Current progress

 ## Initial Development
  - [ ]  User Authentication 
  - [ ]  One-One Real Time Communication
  - [ ]  Group Communication 
  - [ ]  Channel support
  - [ ]  Emoji support
  - [ ]  Typing indicators
  - [ ]  File sharing

# Development 

- Fork this repository
- Create a new branch with the feature name
- start developing
- To develop the frontend
```bash
cd web
```

## To connect with the backend
   To connect with the backend you need `docker-compose` in your system. It can be downloaded from [Docker Official Page](https://docs.docker.com/compose/)

   **After Installing** check the version by running 
   ```bash
   docker-compose --version
```

  - Then copy the `.env.example` to `.env` file 
   
  - To start the backend server 
    run 
     ```bash
     docker-compose up --build
     ```

   You will see the logs of the postgres db and the nexorb_backend. 
   Then you can connect with the backend running on port `8080`. 

   - To know more details about the api open the [Link](http://localhost:8080/swagger/index.html)

   -  **To Stop the backend**:run 
      ```bash
      docker-compose down
      ```