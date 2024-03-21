const express = require('express');
const router = express.Router();
const fs = require('fs');


// status codes
router.route("/status").get(
    (req,res)=>{
        fs.readFile("./Logs.txt",'utf-8',(err,data)=>{
            const logEntries = data.split('\n');         
            const statusCounts = {};            
            logEntries.forEach((log) => {
              const logParts = log.split(' ');
              if (logParts.length > 8) {
                const statusCode = logParts[8];
                statusCounts[statusCode] = (statusCounts[statusCode] || 0) + 1;
                }
            });
            res.send({statusCounts})
        })
    }
)

// @ route to get the method type 
router.route("/method").get(
    (req,res)=>{
        let api_methods = {}
        fs.readFile("./Logs.txt","utf-8",(ree,data)=>{
            const Logs = data.split("\n");
            Logs.forEach((log)=>{
              let method = log.split(" ");
              let onlymethod = method[5]
              api_methods[onlymethod] = (api_methods[onlymethod] || 0)+1
            })
            res.send({"api methos":api_methods})
        })
    }
)

// Accessing Dates 
router.route("/dates").get(
    (req,res)=>{
        fs.readFile("./Logs.txt","utf-8",(err,data)=>{
            const Logs = data.split("\n");
            const EachDate = {};
            Logs.forEach((Eachlog)=>{
                const Log = Eachlog.split("\n");
                const getDate = Log[0].split(" ")
                const Dates = getDate[3].replace("["," ")
                // const Date = Dates.split(" ")
                const Date = Dates[1]+Dates[2] 
                EachDate[Dates] = (EachDate[Dates] || 0) +1;

            })
            res.send({"dates":EachDate})
        })
    }
)
// Ip address count

router.route("/ip").get(
    (req,res)=>{
        const Ip = {}
        fs.readFile("./Logs.txt",'utf-8',(err,data)=>{
            const Entries = data.split("\n");
            Entries.forEach((log)=>{
                const Logg = log.split(" ")
                const ip = Logg[0]
                Ip[ip] = (Ip[ip] || 0)+1

            })
            res.send({"Ip":Ip})
        })
    }
)
module.exports = router
