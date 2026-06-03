const rentalService= require('../../services/rentalService');

const rentalDetailPage= async (req, res) => {
    try {
        const rentalId= req.params.id;
        const rental= await rentalService.getRentalById(rentalId);
        res.render('rentals/rental-detail.ejs',{
            title: 'Chi tiết đơn thuê',
            rental
        });
    } catch (err) {
        console.error(err);
        res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
    }
}

module.exports= {rentalDetailPage};
