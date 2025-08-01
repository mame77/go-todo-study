package datasource

import "os"

type GithubApiClient struct {
	clientId    string
	secret      string
	redirectUri string
}

// 具体的な実態
func NewGithubApiClient() *GithubApiClient {
	return &GithubApiClient{
		clientId:    getGithubClientId(),
		secret:      getGithubClientSecret(),
		redirectUri: getGithubRedirectUri(),
	}
}

func (c *GithubApiClient) ClientId() string {
	return c.clientId
}

func (c *GithubApiClient) ClientSecret() string {
	return c.secret
}

func (c *GithubApiClient) RedirectURI() string {
	return c.redirectUri
}

func getGithubClientId() string {
	clientId, ok := os.LookupEnv("GITHUB_OAUTH_CLIENT_ID")
	if !ok {
		panic("\"GITHUB_OAUTH_CLIENT_ID\" is no set")
	}
	return clientId
}

func getGithubClientSecret() string {
	secret, ok := os.LookupEnv("GITHUB_OAUTH_CLIENT_SECRET")
	if !ok {
		panic("\"GITHUB_OAUTH_CLIENT_SECRET\" is no set")
	}
	return secret
}

func getGithubRedirectUri() string {
	uri, ok := os.LookupEnv("GITHUB_OAUTH_REDIRECT_URI")
	if !ok {
		panic("\"GITHUB_OAUTH_REDIRECT_URI\" is no set")
	}
	return uri
}
