const passport = require('passport');
const Course = require('../models/Course');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');
const e = require('connect-flash');
class CourseController {
    // [GET] /user/stored/courses
    storedCourses(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('user/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    validate(req, res, next) {
        body('email').isEmail().normalizeEmail({ all_lowercase: true }).trim();
        body('password').isLength({ min: 5 });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messages = errors.array().map((e) => e.msg);
            req.skip = true;
            req.flash('error', messages.join(' and '));
            res.redirect('register');
            next();
        } else {
            next();
        }
    }

    // [POST] /user/create
    create(req, res, next) {
        if (req.skip) next();

        let newUser = new User(req.body);

        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash(
                    'success',
                    `${user.username}'s account created successfully`,
                );
                res.redirect('login');
                next();
            } else {
                req.flash(
                    'error',
                    `Failed to crate user account because: ${error.message}`,
                );
                res.redirect('register');
                next();
            }
        });
    }

    // [GET] /user/register
    register(req, res) {
        res.render('user/register');
    }

    // [GET] /user/login
    login(req, res) {
        res.render('user/login');
    }

    authenticate(req, res, next) {
        passport.authenticate(
            'local',
            {
                failureRedirect: '/user/login',
                failureFlash: 'Failed to login',
                successRedirect: '/',
                successFlash: 'Logged in!',
            },
            function (err, user, info) {
                if (err) {
                    req.flash('error', err);
                } else {
                    if (!user) {
                        req.flash('error', 'username or password incorrect');
                    } else {
                        req.login(user, function (err) {
                            if (err) {
                                req.flash('error', err);
                            } else {
                                req.flash('success', 'login success');
                                res.redirect('/chat');
                            }
                        });
                    }
                }
            },
        )(req, res);
    }

    logout(req, res, next) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            } else {
                req.flash('success', 'You have been logged out!');
                res.redirect('/');
                next();
            }
        });
    }
}
module.exports = new CourseController();
