var express = require('express');
var router = express.Router();
var AdminController    =  require('../controllers/admin/AdminController');
var UsersController    =  require('../controllers/admin/UsersController');
var VideosController   =  require('../controllers/admin/VideosController');
var CategoryController =  require('../controllers/admin/CategoriesController');
var Home               = require('../controllers/HomeController');

/** Routes for Home-React APP */
router.get('/view', Home.main);

/** Routes for admin  */
router.get('/login', AdminController.login);
router.post('/admin/login', AdminController.login);
router.get('/admin/login', AdminController.login);
router.get('/admin/Dashboard', requiredAuthentication, AdminController.dashboard);
router.get('/admin/logout', AdminController.logout);


/** Routes for users module  */
router.get('/admin/Users/list',requiredAuthentication,  UsersController.list);
router.get('/admin/Users/edit/:id', requiredAuthentication, UsersController.edit);
router.post('/admin/Users/edit/:id',requiredAuthentication,  UsersController.edit);
router.post('/admin/Users/add',requiredAuthentication, UsersController.add);
router.get('/admin/Users/add', requiredAuthentication, UsersController.add);
router.get('/admin/Users/delete/:id', requiredAuthentication, UsersController.deleteRecord);

/** Routes for user videos module  */
router.get('/admin/Videos/list',requiredAuthentication,  VideosController.list);
router.get('/admin/Videos/edit/:id', requiredAuthentication, VideosController.edit);
router.post('/admin/Videos/edit/:id',requiredAuthentication,  VideosController.edit);
router.get('/admin/Videos/delete/:id', requiredAuthentication, VideosController.deleteRecord);

/** Routes for Categories module  */
router.get('/admin/Categories/list',requiredAuthentication,  CategoryController.list);
router.get('/admin/Categories/edit/:id', requiredAuthentication, CategoryController.edit);
router.post('/admin/Categories/edit/:id',requiredAuthentication,  CategoryController.edit);
router.post('/admin/Categories/add',requiredAuthentication, CategoryController.add);
router.get('/admin/Categories/add', requiredAuthentication, CategoryController.add);
router.get('/admin/Categories/delete/:id', requiredAuthentication, CategoryController.deleteRecord);

module.exports = router;


function requiredAuthenticationFront(req, res, next) {
    if(req.session){
        LoginUser = req.session.LoginUser;
        if(LoginUser){
            next();
        }else{
            res.redirect(nodeSiteUrl+'/login');
        }
    }else{
        res.redirect(nodeSiteUrl+'/login');
    }
}

function requiredAuthentication(req, res, next) {
    if(req.session){
        LoginUser = req.session.LoginUser;
        if(LoginUser){
            next();
        }else{
            res.redirect(nodeAdminUrl+'/login');
        }
    }else{
        res.redirect(nodeAdminUrl+'/login');
    }
}
