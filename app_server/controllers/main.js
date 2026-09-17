exports.index = (req, res) => res.render('index', { title: 'Home', home: true });
exports.about = (req, res) => res.render('about', { title: 'About', about: true });
