const urls = require("../data/urls-data")
const uses = require("../data/uses-data")


//Route-Level Middleware
const urlExists = (req, res, next) => {
    const { urlId } = req.params;
    const foundUrl = urls.find(url => url.id == urlId);
    if (foundUrl) {
        req.urlId = urlId
        req.foundUrl = foundUrl;
        return next();
    }
    next({
        status: 404,
        message: `Url id not found: ${urlId}` 
    })
}

const hasHref = (req, res, next) => {
    const { data: { href } = {} } = req.body;

    if (href) {
        req.href = href
        return next();
    }
    next({ status: 400, message: "A 'href' property is required." })
}

//Controllers
const list = (_req, res) => {
    res.json({ data: urls })
}

const create = (req, res) => {
    const href = req.href
    const newUrlId = urls.length + 1
    const newUrl = {
        href,
        id: newUrlId,
    }
    urls.push(newUrl)
    res.status(201).json({ data: newUrl })  
}

const read = (req, res) => {
    const urlId = Number(req.urlId);
    const newUseId = uses.length + 1;
    const newUse = {
        id: newUseId,
        urlId: urlId,
        time: Date.now()
    };
    uses.push(newUse);
    res.json({ data: req.foundUrl })
}

const update = (req, res) => {
    req.foundUrl.href = req.href;
    res.json({ data: req.foundUrl })
}

module.exports = {
    list,
    create: [hasHref, create],
    read: [ urlExists, read],
    update: [urlExists, hasHref, update],
    urlExists,
}