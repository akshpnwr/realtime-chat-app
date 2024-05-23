export const errorHandler = (err, req, res, next) => {
    console.log('inside error handler', err);
    res.status(500).json({ message: err.message, err });
}