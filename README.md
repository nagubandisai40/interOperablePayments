# Steps for Quick installation

1.  Cloning the repo and housekeeping
2.  Bringing up the network
3.  Installing Chaincode
4.  Enrolling Admin User
5.  Running Express Server
6.  Running Angular Application

## 1. Cloning the repo and housekeeping

Clone the repo into fabric-samples directory of hyperledgerfabric-2.0, Run the following commands for removing already existing volumes and stopping the running docker containers.

`docker stop $(docker ps -aq)`  
`docker rm $(docker ps -aq)`  
`docker volume prune`  

## 2. Bringing up the network

navigate to test-network1 by using `cd test-network1`

Run the **network.sh** script by `./network.sh up createChannel -c mychannel -ca` by running this channel named mychannel is created. We can verify by using `docker ps -a` which shows all the containers running.

## 3. Installing the chaincode

Run **deployChaincode.sh** by `./deployChaincode.sh`

## 4. Enrolling Admin User

Navigate to application-js-test directory and enroll the admin by running **enrollAdmin.js** by `node enrollAdmin.js` you can verify this by checking the presence of admin.id in wallet folder.

## 5. Running Express Server

Up the express server by running `node server.js` before running this make sure that you have installed all the dependencies required to up the express server.

## 6. Running Angular Application

Follow the **README.md** file of angular app (interOperableApp) to run the angular application.






