const express = require("express");
const documentRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
const fs = require("fs");
const documentsServices = require("../BL/documents.services");
const { sendError } = require("../errController");

documentRouter.put("/addfile", upload.any('files'), async (req, res) => {
  try {
    const file = req.files[0]
    fs.renameSync(
      file.path,
      `uploads/${req.body.arrayPath
        .replaceAll(',',"/")}/${file.originalname}`
    );
    const addFile = await documentsServices.addFile(
      req.body.id,
      file.originalname
    );
    return res.send(addFile);
  } catch (err) {
    sendError(res, err);
  }
});
documentRouter.put("/adddirectory", async (req, res) => {
  try {
    fs.existsSync(`uploads/${req.body.arrayPath.join("/")}/${req.body.directoryName}`)? fs.mkdirSync(
      `uploads/${req.body.arrayPath.join("/")}/${req.body.directoryName}_${Date.now()}`
    ):fs.mkdirSync(
      `uploads/${req.body.arrayPath.join("/")}/${req.body.directoryName}`
    )
    const addDirectory = await documentsServices.addDirectory(
      req.body.id,
      req.body.directoryName
    );
    res.send(addDirectory);
  } catch (err) {
    sendError(res, err);
  }
});

documentRouter.put("/delete", async (req, res) => {
  try{
    await documentsServices.deleteDocuments({_id:req.body.childrenId})
    const updateChildren = await documentsServices.getChildren({_id:req.body.id})
    res.send(updateChildren);
  }catch(err){
    sendError(res, err);
  }
});
// documentRouter.put("/rename", async (req, res) => {});

documentRouter.get("/getchildren", async (req, res) => {
  try {
    const _id = req.query.dirId;
    const children = await documentsServices.getChildren({ _id });
    res.send(children);
  } catch (err) {
    sendError(res, err);
  }
});
module.exports = documentRouter;
