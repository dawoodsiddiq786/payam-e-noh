var express = require('express');
var router = express.Router();
const AuthController  = require('../controllers/auth/AuthController');
const RegisterController  = require('../controllers/auth/RegisterController');
const Categories   = require('../controllers/admin/CategoriesController');

const Home          = require('../controllers/HomeController');
const Filecontroller = require('../controllers/FileController');
/** Routes for Mobile API  */
router.get('/v1', (req, res) => {
  res.send('welcome to user api');
});
router.post('/v1/login', AuthController.login);
router.post('/v1/register', RegisterController.store);
router.post('/v1/upload-video', Home.display_videos);
router.get('/v1/get-categories', Categories.listapi);

// TODO: NEED TO UPLOAD FILE USING HTTP REQUEST
router.post("/v1/upload", Filecontroller.upload);
router.get("/v1/files", Filecontroller.getListFiles);
router.get("/v1/files/:name", Filecontroller.download);


module.exports = router;
