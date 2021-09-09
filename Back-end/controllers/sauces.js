const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOnesauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [""],
    usersDisliked: [""],
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Registered object !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifysauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Modified object !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletesauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        sauce
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Deleted object !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.createlike = (req, res, next) => {
  const userid = req.body.userId;
  const like = req.body.like;
  Sauce.updateOne({ _id: req.params.id })
    .then((sauce => {
      if (like === 1) {
        sauce.likes += 1;
        sauce.usersLiked.push(userid)
      }
      else if (like === -1) {
        sauce.dislikes -= -1;
        sauce.usersDisliked.push(req.body.userId)
      }
      else (like == 0);{
        sauce.likes -= 1
        sauce.dislikes += 1;
      }
      sauce.save()
    .then(() => res.status(200).json({ message: "Modified object !" }))
    .catch((error) => res.status(400).json({ error }));
    }))
};
