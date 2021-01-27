# React + Electron = GUI 2020

GUI2020 using electron app to render react.js framework.

## Install npm environment
```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash``` to install nvm from curl repository

```nvm install v10.16.3``` to install specific version of node

```nvm --version &&node -v && npm -v``` to check versions

```npm install -g yarn``` to install yarn


## Scripts on GUI side
```git clone {paste the url for git clone}```  

```git add .``` to update all the changes to repo to the index file

```git commit -m "{any message}"``` to commit the changes to local repo

```git push {branch name}``` to push the local repo to github repo

```export ROS_MASTER_URI=http://10.4.168.163(jetson IP):11311```

```export ROS_IP=10.4.168.192(GUI PC IP)```

```roslaunch rosbridge_server rosbridge_websocket.launch``` to launch rosbridge at port 9090

```yarn install``` will install node_modules and other dependencies in package.json.

```yarn start``` will start the Electron app and the React app at the same time.

If the number of watchers increase then use this command
```echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p```

if bootstrap is not installed as a node_module
```yarn add bootstrap``` will add bootstrap to node_modules

## Scripts on Jetson side
enter into catkin-ws

```export ROS_MASTER_URI=tegra-ubuntu:11311```

```export ROS_IP=10.4.168.192(GUI PC IP)```

```rosrun gpsd_client gpsd_client _host:=localhost _port:=2947``` run the gpsd client on tcp to obtain values from daemon and send it to the subscriber(GUI)

## Read more
if libgconf-2.so.4 is missing
```sudo apt -y install libgconf2-4```

##do not commit to master 
