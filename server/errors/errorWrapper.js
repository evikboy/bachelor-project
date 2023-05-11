const errorWrapper = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next)
    } catch (err) {
        return next(err)
    }
}

module.exports = errorWrapper 