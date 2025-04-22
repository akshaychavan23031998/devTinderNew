1. Create React +Vite project, Integrate Tailwind CSS.
2. Git Initalizse, create repo on Github and then add 3 commands on the terminal.
3. Integrate DaisyUI, which is nothing but the component library, which is compatible with the tailwind css, which will give us the ready made coponents, ek, loader, nav bar, accordian, & etc.

# Deployment

1. Signup in AWS with creatit card details.
2. Launch a Instance.
3. chmod 400 `<secret>.pem 	==>> this file is the key to access our system on the server( ex. if server is the room then its the key of the room)`
4. now we have logged to our server machine using the 3rd step now we have to use this cloude machine via our local system using the git bash only through terminal and commands.
5. now to access this machine we have the ssh command as below and say yes to login to our clode ubantu cloude machine via local machine, ==>>

   ssh -i "DevTinderSec.pem" ubuntu@ec2-56-228-18-211.eu-north-1.compute.amazonaws.com
6. so installed the proper nvm and node on to the ubantu clode computer via u r local machine.
7. then we have installed the required packeges now our code is not there in the ubantu machine right now we need to clone our project from the git on to ubantu clode machine.

   https://github.com/akshaychavan23031998/DevTinder.git ==>> this is the HTTPS Link for Backend Project.

   https://github.com/akshaychavan23031998/devTinderNew.git ==>>this is the HTTPS Link for Front end project.
8. front End: (devTinderNew)

   1. npm install
   2. npm run buid ==>> this will create dist folder.
   3. sudo apt update
   4. sudo apt install nginx ==>> its a http server to deploy our application.
   5. sudo systemctl start nginx ==>> to start the nginx
   6. sudo systemctl enable nginx ==>> to make it up and runnnig.
   7. now copy the dist(Build files) file of our front end to this nginx folder (/var/www/html/)
   8. sudo scp -r dist/* /var/www/html/
   9. now by default its giving port 22, but we need to enable the port 80.
9. Backend End: (DevTinder)

   1. first change directory to devTinder (ls --> DevTinder devTinderNew --> cd DevTinder --> npm install --> npm run start).
   2. so now i did npm startand it will start my application and if become ideal for 15 mins my server will stop so i want something that run my server in bacground like its doing npm start and my serevr should work for 24*7, means upto deployment our server will work only, once deployment also it should work for 24**7 so for that we have pacgae called pm2 (process manager) which wi;l run our server in background for 24***7
   3. to install pm2, ==>> ""npm install pm2 -g".
   4. to start our application via pm2 we need to this command "pm2 start npm -- start"
   5. pm2 logs ==>> to check logs
   6. sudo nano /etc/nginx/sites-enabled/default
   7. sudo systemctl restart nginx
   8. modify the base url in the fornt end project as "/api"
