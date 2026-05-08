const homeRender= async (req,res) => {
    try {
        res.render('layouts/main.ejs',{
            title: 'Trang chủ',
        });
    }
    catch(err)    {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
     }
}

module.exports={homeRender};