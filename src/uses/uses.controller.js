const uses = require("../data/uses-data")

//Route-Level Middleware
const useExist = (req, res, next) => {
    const { useId } = req.params;
    const foundUse = uses.find(use => use.id === Number(useId))
    if (foundUse) {
        res.foundUse = foundUse;
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
    res.json({ data: res.foundUse })
} 

const destroy = (req, res) => {
    const deleteUse = uses.filter(use => use.id !== res.foundUse.id)
    res.sendStatus(204)
}

module.exports = {
    list,
    read: [useExist, read],
    delete: [useExist, destroy]
};