const passwordValidator = require('password-validator');

const PassSchema = new passwordValidator();

PassSchema
.is().min(10)                                    
.is().max(64)                                  
.has().uppercase()                              
.has().lowercase()                             
.has().digits()                                
.has().not().spaces()                    

module.exports = PassSchema;