/**
 * Home Controller
 * @type {{index: index}}
 */
const HomeController = module.exports = {
    /**
     * Index
     * @param req
     * @param res
     */
    main : (req, res) => {
      var data = {};
      var errorData = {};
      res.set('content-type' , 'text/html; charset=mycharset');
      res.render('home/home',{page_title:"Payam-e-Noh - Stream",data:data,errorData:errorData});
    },
    display_videos: (req, res) => {
      // React App Flow Here
    }
};
