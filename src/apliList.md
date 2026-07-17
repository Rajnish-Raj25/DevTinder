# Devtinder api contract

## Authrouter

post /signup
post /login
post /logout

get /profile/view
patch /profile/edit
patch /profile/resetpsssword

post /request/send/interested/:userID
post /request/send/rejected/:userID
post /request/review/accepted/:requestId
post /request/review/rejected/:requestId

get / user/connecton
get / user/request
get /user/feed
