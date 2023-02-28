const passwordValidator = require('password-validator')

let passwordSchema = new passwordValidator()

passwordSchema
.is().min(8)                                    // Longueur minimale : 8 caractères
.is().max(100)                                  // Longueur maximale : 100 caractères
.has().uppercase()                              // Doit contenir au moins une majuscule
.has().lowercase()                              // Doit contenir au moins une minuscule
.has().digits(1)                                // Doit contenir au moins un chiffre

module.exports = passwordSchema