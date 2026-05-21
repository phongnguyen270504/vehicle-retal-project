const loginPage= async (req,res)=>{
    try {
        res.render('auth/login.ejs',{
            title: 'Đăng nhập'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports={loginPage};