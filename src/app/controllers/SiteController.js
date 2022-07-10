const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');
const mongoose = require('../../util/mongoose');
class SiteController {
    index(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    search(req, res) {
        res.render('search');
    }

    chat(req, res) {
        res.render('chat');
    }
}

module.exports = new SiteController();
