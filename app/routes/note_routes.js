var ObjectId = require('mongodb').ObjectID;

module.exports = function(app,db){
    app.get('/allnotes',(req,res) => {
        db.collection('notes').find({}).toArray((err,items) => {
            if (err) {
                res.send({'error':'An Error Occoured'});
            } else {
                res.send(items);
            }
    });
    });

    app.get('/notes/:id',(req,res) => {
        const id = req.params.id;
        const details = {'_id':new ObjectId(id)};
        db.collection('notes').findOne(details,(err,item) => {
            if (err) {
                res.send({'error':'An error has occoured'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes',(req,res) => {
        const note ={'title':req.body.title, 'body':req.body.body};
        db.collection('notes').insert(note, (err,result) => {
            if(err){
                res.send({'error':"An error has occoured"});
            }else{
                res.send(note);
            }
        });
        
    });

    app.delete('/notes/:id',(req,res) => {
        const id = req.params.id;
        const details = {'_id':new ObjectId(id)};
        db.collection('notes').remove(details, (err,item) => {
            if (err) {
                res.send({'error':'An error has occoured'});
            } else {
                res.send('Note ' + id + ' deleted');
            }
        });
    });

    app.put('/notes/:id',(req,res) => {
        const id = req.params.id;
        const details ={'_id':new ObjectId(id)};
        const note = {description: req.body.description, title:req.body.title};
        db.collection('notes').update(details, note, (err,result) => {
            if (err) {
                res.send({'error':'An error has occured'});
            } else {
                res.send(note);
            }
        });
    });
};