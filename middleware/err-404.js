module.exports = (req, res) => {
    res.render("errors/error-404", {
        title: "404 | Cтраница не найдена",
    });
};

