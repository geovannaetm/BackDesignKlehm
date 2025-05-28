class HomeController {
    index(req, res) {
        res.status(200).json({
            message: "Hello World!",
           
        });
}
}

export default new HomeController();