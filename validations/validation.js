exports.signupvalidate=function (req, res, next){  
    if(!req.body.firstname){        
        return res.send( 'Need a firstname');      
      }
      else if(!req.body.lastname){        
        return res.send( 'Need a lastname');      
      }
   else if(!req.body.email){        
        return res.send( 'Need a email');      
      }  
    else if(!req.body.password){      
          return res.send( 'Need a password');    
      }
      else{
        next();
      }   
  }
exports.signinvalidate=function (req, res, next){ 
   if(!req.body.email){        
        return res.send( 'Need a email');      
      }  
    else if(!req.body.password){      
          return res.send( 'Need a password');    
      }
      else{
        next();
      } 
    }