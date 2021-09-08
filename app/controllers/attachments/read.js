const Attachment = require('../../models/attachment');

const list = (req, res) => {
  try {
    const condition = req.query;

    Attachment.find(condition)
      .then((attachments) => {
        res.json({
          success: true,
          attachments,
        });
      })
      .catch((error) => {
        res.json({error});
      });
  } catch (error) {
    res.status(400).json({error});
  }
};

const show = (req, res) => {
  try {
    if (req.params.id && req.params.id !== 'null') {
      Attachment
        .findById(req.params.id)
        .then(attachment => {
          try {
            if (attachment) {
              res.download(attachment.path, attachment.originalname);
              res.status(200);
            } else {
              res.json({success: false});
            }
          } catch (error) {
            console.log('error on attachment', attachment);
            res.json({error})
          }
        })
        .catch(error => {
          console.log('error on attachment', error);
          res.json({error})
        });
    } else {
      res.json({success: false});
    }
  } catch (error) {
    console.log('error on attachment2', error);
    res.status(400).json({error});
  }
};


module.exports = {
  list,
  show
}
