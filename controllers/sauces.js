const Sauce = require('../models/Things');

exports.createSauce = (req, res, next) =>{
    /*const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;*/
    const sauce = new Sauce({ ...req.body})
    sauce.save()
        .then(() => res.status(201).json({sauce}))
        .catch(error => res.status (400).json({ error }))
};

exports.modifySauce = (req, res, next) =>{
    const sauceObject = req.file 
    Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({message : "Objet modifié"}))
        .catch(error => res.status (400).json({ error }));
}

exports.deleteSauce = (req, res, next) =>{
    Sauce.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({message : "Objet supprimé"}))
        .catch(error => res.status (400).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
}

  exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
}