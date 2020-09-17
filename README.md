# Interoperable Payments System 
This System can be used to transfer assets between different organizations without any external medium involvement in a **Private**,**Decentralized**, **Trusted** and **Highly-Secure Blockchain Network**.

## TechStack
* [Hyperledger-Fabric v2.2](https://hyperledger-fabric.readthedocs.io/en/release-2.2/ "Hyperledger-Fabric v2.2 documentation page")
* [NodeJS](https://nodejs.org/ "NodeJS Homepage")
* [NodeJS Contact API](https://github.com/hyperledger/fabric-chaincode-node "NodeJS Contract API")
* [Angular](https://angular.io/docs "Angular Documentation")
* [XRP Ledger](https://xrpl.org/ "XRP Ledger Homepage")
## Steps to bring up the application

1.  Installing the prerequisites
2.  Cloning the repo and housekeeping
3.  Bringing up the network
4.  Installing Chaincode
5.  Enrolling Admin User
6.  Running Express Server
7.  Running the XRP Server
8.  Running Angular Application


## 1. Installing the prerequisites

*(Skip this step and go to step 2 if NodeJS and Hyperledger-2.2 are already installed in your system)*
### Steps to install NodeJS
We need to install NodeJS in order to run the server.
Follow this page to [download and install NodeJS.](https://nodejs.org/en/download/)

### Steps to install Hyperledger-Fabric 2.2
We need to Setup the Hyperledger-Fabric Network prerequisites and clone the hyperledger fabric network before we proceed.
Follow the official documentation to set up the [Hyperledger-Fabric Prerequisites](https://hyperledger-fabric.readthedocs.io/en/release-2.2/prereqs.html "Hyperledger-Fabric Prerequisites") and [Clone the Samples.](https://hyperledger-fabric.readthedocs.io/en/release-2.2/install.html "Install Samples, Binaries, and Docker Images")

## 2. Cloning the repo and housekeeping

Now clone this repo into **fabric-samples** directory [`hyperledger/fabric-samples`](https://github.com/hyperledger/fabric-samples)  (*which was previously cloned while seting up the hyperledger-fabric in step 1*).

Check and Remove any running docker containers.
Run the following commands for removing already existing docker volumes and stopping any running docker containers.

*Note: the below commands will stop and remove all the runnning containers and all the docker volumes whhich are present while exectuting the below code* <br />
`$ docker ps -a`  
`$ docker stop $(docker ps -aq)`  
`$ docker rm $(docker ps -aq)`  
`$ docker volume prune`  

## 3. Bringing up the network
Navigate inside the test-network1 directory using `$ cd test-network1`

Run the [**network.sh**](/test-network1/network.sh) script using `$ ./network.sh up createChannel -c mychannel -ca` after this command is executed all the docker container are up and a channel named mychannel is created. We can verify by using `$ docker ps -a` which shows all the containers running.

## 4. Installing the chaincode

Run [ **deployChaincode.sh** ](/test-network1/deployChaincode.sh) by `$ ./deployChaincode.sh`

## 5. Enrolling Admin User

Navigate to [**application-js-test**](/application-js-test) directory and, Install all the required dependencies by executing `$ npm i`

Now, We need to enroll the admin by exectuting the [**enrollAdmin.js**](/application-js-test/enrollAdmin.js) file by using `$ node enrollAdmin.js`. We can verify if the enrollment is successfull or not by checking the presence of **admin.id** in wallet directory.

## 6. Running Express Server
Bring Up the express server by running `$ node server.js`.

## 7. Running the XRP server
Navigate to [ripple](/ripple) directory using `$ cd ripple`
Bring up the XRP server by `$ node server.js`.

### Note: Inorder to transfer tokens we will need to use a XRPL net credentials. For making a sample account go to [XRPL Testnet Credentials](https://xrpl.org/xrp-testnet-faucet.html) and click on **Generate Testnet credentials**


## 8. Running Angular Application
Navigate to interOperableApp(/interOperableApp) and Follow the [**README.md**](/interOperableApp/README.md) file of angular app to run the angular application.







