const express = require('express');
const createClient = require('@supabase/supabase-js');

const app = express();
app.use(express.json());
const port = 8081;

const supabase = createClient.createClient('https://vstbmotqtpyxerrpdsnm.supabase.co', 
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzdGJtb3RxdHB5eGVycnBkc25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTQ4NjY2MywiZXhwIjoxOTk1MDYyNjYzfQ.amnf5n_CP1VibrVWtXnKgdDopwQI2ogvplqr7YaVQdA');


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.post("/kavach/", async (req, res) => {
    const {data, error} = await supabase.from('CCM').insert({
        MAC: req.body.mac,
        id: req.body.id
    });
    console.log(error, req.body.mac);
    if (!error) {
        res.json({status: "ok"});
    }
    else {
        res.json({status: "error"});
    }
});

app.get("/kavach/", async (req, res) => {
    const { data, error } = await supabase.from('CCM').select();
    res.json(data);
});

app.listen(port, "192.168.55.66", () => {
    console.log(`api listening at ${port}`);
});