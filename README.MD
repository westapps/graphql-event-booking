postman query:
http://localhost:3000/graphql

post
body -- raw -- json
headers -- Authorization Bearer token

{
	"query": "mutation {createEvent(eventInput: {title: \"should work\", description: \"should work description\", price: 45.99 , date: \"2019-09-23T07:27:49.024Z\"}){_id, title, price, description}}"
}