package datasource

import {
	"os"
}

type GoogleApiClient struct {
	clientId string
	secret string
	redirectUri string 
}

func NewGoogleApiClient() *GoogleApiClient{
	return &GoogleApiClient{
		clientId getGoogleClientId()
		secret getGoogleClientSecret()
		redirectUri gitGoogleRedirectUri()
	}
}
