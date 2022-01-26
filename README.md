# hatch_BE

See comments above controller functions for light overview of its purpose  
To start the server:

# REDIS:

Make sure that you have redis installed and running locally
If you don't have redis on the machine that is running this,
Make sure wget is installed(for mac use homebrew) and then run these commands:  
wget https://download.redis.io/releases/redis-6.0.9.tar.gz  
wget https://download.redis.io/releases/redis-6.2.4.tar.gz  
tar xzf redis-6.2.4.tar.gz  
cd redis-6.2.4  
make  
src/redis-server

# Once redis is up and accepting connections:

In another tab:  
npm install  
npm start

# To run tests:

npm test

Current tests do not test redis cache or individual controllers, only basic routes  
To observe the reduced latency after caching, I used Postman  
and ran the same get request twice
