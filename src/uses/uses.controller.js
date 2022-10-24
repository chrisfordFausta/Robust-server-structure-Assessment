const uses = require("../data/uses-data")

//Route-Level Middleware
const useExist = (req, res, next) => {
    const { useId } = req.params;
    const foundUse = uses.find(use => use.id === Number(useId))
    if (foundUse) {
        req.useId = useId
        req.foundUse = foundUse;
        return next();
    }
    next({
        status: 404,
        message: `Use id not found: ${useId}`
    })
}

//Controllers
const list = (req, res) => {
    const { urlId } = req.params;
    res.json({ data: uses.filter(urlId ? use => use.urlId == urlId : () => true)})
}

const read = (req, res) => {
    res.json({ data: req.foundUse })
} 

const destroy = (req, res) => {
    const index = uses.findIndex(use => use.urlId == req.useId)
    if (index !== -1) {
        urls.splice(index, 1)
    }
    res.sendStatus(204)
}

module.exports = {
    list,
    read: [useExist, read],
    delete: [useExist, destroy]
};