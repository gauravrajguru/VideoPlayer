const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const db = 'mongodb://gaurav:mlab%4012@ds119993.mlab.com:19993/videoplayer';

mongoose.Promise = global.Promise;
console.log('debug 0.0');
mongoose.connect(db,function (err){
    if(err){
        console.log('Error '+err);
    }
    else
        console.log('debug 1');
});
console.log('debug 1.1');
const video = require('../Models/Video');

router.get('/videos',function(req,res){
    console.log('here');
    video.find({}).
    exec(function(err, videos){
        if(err)
            console.log('error')
        else
            {
                console.log('debug 2')
                res.json(videos);
            }
    });
});

router.get('/videos/:id',function(req,res){
    
    video.findById(req.params.id).
    exec(function(err,video){
        if(err)
            console.log('error');
        else    
            res.json(video);
    });
});

router.post('/videos',function(req,res){
    console.log('hit 1');
    var newVideo = video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    
    newVideo.save(function(err,insertedVideo){
        if(err)
            console.log('error in post');
        else
            res.json(insertedVideo);
    });
});

router.put('/videos/:id',function(req,res){
    var updateVideo;
    video.findByIdAndUpdate(req.params.id,
        {
            $set:{title:req.body.title, 
                    url:req.body.url,
                    description:req.body.description
            }
        },
        {new:true},
        function(err,nv){
                if(err)
                    res.send(err);
                else
                    res.json(nv);
        }
    );
});

router.delete('/videos/:id',function(req,res){
    console.log(req.params);
    video.findByIdAndDelete(req.params.id,function(err,deleted){
        if(err)
            res.send('err');
        else
            res.json(deleted);
    });
});

module.exports = router;