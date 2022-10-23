const urls = require("../data/urls-data")


//Route-Level Middleware
const urlExists = (req, res, next) => {
    const { urlId } = req.params;
    const foundUrl = urls.find(url => url.id == (urlId));
    if (foundUrl) {
        res.foundUrl = foundUrl;
        console.log("res.foundUrl: ", res.foundUrl)
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
        res.href = href
        return next();
    }
    next({ status: 400, message: "A 'href' property is required." })
}

//Controllers
const list = (req, res) => {
    res.json({ data: urls })
}

const create = (req, res) => {
    const href = res.href
    const newUrlId = urls.length + 1
    const newUrl = {
        href,
        id: newUrlId,
    }
    urls.push(newUrl)
    res.status(201).json({ data: newUrl})  
}

const read = (req, res) => {
    res.json({ data: res.foundUrl })
}

const update = () => {
    res.foundUrl.href = res.href;
    res.json({ data: res.foundUrl })
}

module.exports = {
    list,
    create: [hasHref, create],
    read: [urlExists, read],
    update: [urlExists, hasHref, update],
    urlExists,
}