"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.authError = exports.authSuccess = void 0;
const authSuccess = (req, res) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.passport) {
        const userInfo = {
            id: req.session.passport.user.id,
            displayName: req.session.passport.user.displayName,
            provider: req.session.passport.user.provider,
        };
        res.render('fb-github-success', { user: userInfo });
    }
    else {
        res.redirect('/auth/facebook/error');
    }
};
exports.authSuccess = authSuccess;
const authError = (req, res) => res.send('Error logging in via Facebook.');
exports.authError = authError;
const signOut = (req, res) => {
    var _a;
    try {
        (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy((err) => {
            if (err) {
                console.log('Failed to destroy session:', err);
                res.status(500).send('Failed to sign out Facebook user');
            }
            else {
                console.log('Session destroyed.');
                res.clearCookie('connect.sid');
                res.redirect('/');
            }
        });
    }
    catch (err) {
        res.status(400).send({ message: 'Failed to sign out Facebook user' });
    }
};
exports.signOut = signOut;
