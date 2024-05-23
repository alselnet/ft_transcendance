# from allauth.socialaccount.providers.oauth2.views import OAuth2Adapter

# class CustomOAuth2Adapter(OAuth2Adapter):
#     provider_id = '42_Oauth'
#     access_token_url = 'https://api.intra.42.fr/oauth/token/'
#     authorize_url = 'https://your-school-api.com/oauth/authorize/'
#     profile_url = 'https://your-school-api.com/api/userinfo/'

#     def complete_login(self, request, app, token, **kwargs):
#         headers = {'Authorization': f'Bearer {token.token}'}
#         response = requests.get(self.profile_url, headers=headers)
#         extra_data = response.json()
#         return self.get_provider().sociallogin_from_response(request, extra_data)