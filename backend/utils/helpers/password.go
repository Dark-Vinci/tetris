package helpers

import "golang.org/x/crypto/bcrypt"

type Password string

func (p Password) String() string {
	return string(p)
}

// Hash hashed the password with a salt of cost 14
func (p Password) Hash() Password {
	bytes, _ := bcrypt.GenerateFromPassword([]byte(p.String()), 14)
	return Password(bytes)
}

// Check compared password and returns if they match
func (p Password) Check(password Password) bool {
	err := bcrypt.CompareHashAndPassword([]byte(p), []byte(password))
	return err == nil
}
