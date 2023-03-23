function validate(schema){
    return (req , res , next ) => {
        const result = schema.validate(req.body);
        if(result.error) {
            return res.status(403).send({msg : result.error.message});
        }
        else next();
    };
}
module.exports = { validate };