const express = require("express")
const app = express();
const fs = require('fs');

app.get("/",(req,res)=>{
    res.send("Hello from server...")
})


app.get("/logs",(req,res)=>{
    FilePath ="./Logs.txt"
   
    const data = fs.readFileSync(FilePath,'utf-8')//read file
    // variables
    const logEntries = data.split('\n');
    const browsers = {};
    const operatingSystems = {};
    const api_methods = {};
    const Status_codes = {};
    const EachDate = {};
    

    logEntries.forEach((log,i) => { //loop

        const GetLog = log.split("\n");
        // status-code
        const logParts = log.split(' ');
        if (logParts.length > 8) {
          const statusCode = logParts[8];
          Status_codes[statusCode] = (Status_codes[statusCode] || 0) + 1;
          }
        //   Date
          const Log = log.split("\n");
          const getDate = Log[0].split(" ")
          const Dates = getDate[3].replace("["," ")
          const cleaned_Dates = Dates
          const trimed_Date = cleaned_Dates.substring(0,12)
          EachDate[trimed_Date] = (EachDate[trimed_Date] || 0) +1;
        //   methods
        const getMethod = GetLog[0].split(" ")
        const Method = getMethod[5]
        api_methods[Method] = (api_methods[Method] || 0)+1;
        //   browser and os
      const user_url = log.indexOf('Mozilla');
      if (user_url !== -1) {
        const user_url_str = log.substring(user_url);
        const client = user_url_str.split(' ');
        const os = client[1];
        const browser = client[2];      
        browsers[browser] = (browsers[browser] || 0) + 1;

        operatingSystems[os] = (operatingSystems[os] || 0) + 1;
    }

  });
   res.send({
    "Access Dates":EachDate,
    "Status codes" : Status_codes,
   "apis":api_methods,
   "Client Browser":browsers,
   "Clients OS":operatingSystems})
})
   

app.use("/",require("./routes"))
app.listen(5050,()=>console.log("server is running on port 5050"))