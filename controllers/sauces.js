const Sauce = require('../models/Things');
const fs = require('fs')

exports.createSauce = (req, res, next) =>{
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new Sauce({ ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`})
    sauce.save()
        .then(() => res.status(201).json({sauce}))
        .catch(error => res.status (400).json({ error }))
};

exports.modifySauce = (req, res, next) =>{
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id }, )
        .then(() => res.status(200).json({message : "Objet modifié"}))
        .catch(error => res.status (400).json({ error }));
};

exports.deleteSauce = (req, res, next) =>{
  Sauce.findOne({_id: req.params.id})
    .then(sauce =>{
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      })
    })
    .catch(error =>  res.status(500).json({ error }))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};

exports.likedSauce = (req, res, next) => {
  const userId = req.body.userId
   

    Sauce.findOne({ _id: req.params.id})
      .then(() => {
        switch (req.body.like){
          case 1:
            Sauce.updateOne({ _id: req.params.id},{$push: {usersLiked: userId}, likes: +1})
            .then(() => res.status(200).json({ message: "sauce liké"}))
            .catch(error => res.status(400).JSON({ error }));
          break
          
          case 0:
            Sauce.updateOne({ _id: req.params.id},{$push: {usersLiked: userId}, $inc:{likes: 0}})
            .then(() => res.status(200).json({ message: "sauce disliké"}))
            .catch(error => res.status(400).JSON({ error }));
          break

          case -1:
            Sauce.updateOne({ _id: req.params.id},{$push: {usersDisliked: userId}, $inc:{dislikes: +1}})
            .then(() => res.status(200).json({ message: "sauce disliké"}))
            .catch(error => res.status(400).JSON({ error }));
          break
        }
    })
};
        /*
        switch (req.body.dislike){
          case -1:
            Sauce.updateOne({ _id: req.params.id},{$push: {usersDisliked: userId}, $inc:{dislikes: -1}})
            .then(() => res.status(200).json({ message: "sauce disliké"}))
            .catch(error => res.status(400).JSON({ error }));
          break

          case 0:
            Sauce.updateOne({ _id: req.params.id},{$push: {usersDisLiked: userId}, dislikes: 0})
            .then(() => res.status(200).json({ message: "sauce disliké"}))
            .catch(error => res.status(400).JSON({ error }));
          break
        }
        */
        


