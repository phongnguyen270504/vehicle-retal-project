const isLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
};

const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Bạn không có quyền truy cập tài nguyên này' });
};

module.exports = { isLogin, isAdmin };