 www.shoppingsite.com/category/shoe/product/nike/132032 => www.shoppingsite.com/8d13lk2k
the path of the url, (category/shoe/product/nike/132032), becomes a specialized id, (8d13lk2k)

GET Paths
    /urls                       (Retrieve a list of all short URLs)
    /urls/:urlId                (Retrieve a short URL by ID)
    /urls/:urlId/uses           (Retrieve a list of use metrics for a given short URL ID)
    /urls/:urlId/uses/:useId    (Retrieve a use metric by ID for a given short URL ID)

PUT Path
    /urls/:urlId                (Update a short URL by ID)

POST Path  
    /urls                       (Create a new short URL)


url route

* DELETE request should return an error with a status of 405 and a message that says "DELETE Method not allowed on ${req.params}. DELETE request only available on the path /uses/:useId


* CREATE
When creating (post request), the data key contains an object that has a href key with the value of the base url, and once the post method is complete, the status should be 201 and the data key has a value of an object, that has an id property & href property, and return the saved object as a response to the client.

* READ
Additionally, use records are created as a side effect of a GET request to /urls/:urlId.Each use record contains an id, a urlId which corresponds to ID of the URL being tracked by the use metric, and a time property (set to Date.now()) indicating when the use metric was recorded.


uses route

GET PATH
    /uses/:useId                (Retrieve a use metric by ID)
    /uses                       (Retrieve a list of all use metrics)

DELETE PATH
    /uses/:useId                (Delete a use metric by ID)

* GET & POST requests are not allowed on the uses route status is set to 405

* DELETE request responds w/sendStatus(204)


Error Handling 
* returns a 404 for any nonexistent path or resource.
* Methods that are not allowed should return 405

Data
* The short URL data is exported from /src/data/urls-data.js.
* The use data is exported from /src/data/uses-data.js.
* Add and remove data from the arrays using push() and splice(), respectively.
* When you restart your server, any changes made to these arrays will be lost.

Assigning IDs
* const newUrlId = urls.length + 1;
* const newUseId = uses.length + 1;