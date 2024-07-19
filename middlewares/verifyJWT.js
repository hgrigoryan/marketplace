import jwt from "jsonwebtoken";

async function verifyJWT(req, res, next){
    try{
        // Check if cookies are sent
        if (!req.cookies?.AccessToken) {
            throw new Error('Unaouthorized user');
        }

        const token = req.cookies.AccessToken;
        // Check if token is sent
        if(!token){
            throw new Error('Unaouthorized user');
        }

        // Check if token is valid, will throw an error if invalid or expired
        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const userId = req.params?.userId;
        if(!userId) {
            throw new Error('Unaouthorized user');;
        }
        if(userId !== decodedToken.id) {
            throw new Error('Unaouthorized user');;
        }
        
        req.accessToken = decodedToken;         

        next();
    } catch(err) {
        res.json(err);
    }
}

export default verifyJWT;