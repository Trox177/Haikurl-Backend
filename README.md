# HaikURL
<table>
<tr>
<td>
  A backend implementation using NodeJS + MongoDB for creating redirection aliases for inputted URLs.
</td>
</tr>
</table>

## Site

### Endpoints
Current List of all Endpoints.

### POST /url
Validates the url is legitimate.
Generates a unique haiku from the inputted URL.
Creates new object to store in the database.

### GET /:haiku
Redirects the incoming traffic to the original stored URL.
404 if not created yet.

### GET /:haiku/traffic
Responds with the number of times the Haiku URL has been visited

### Development
Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'Improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request 

### Bug / Feature Request

If you find a bug (the website couldn't handle the query and / or gave undesired results), kindly open an issue.

If you'd like to request a new function, feel free to do so by opening an issue. Please include sample queries and their corresponding results.


## Built with 

- [MongoDB]
- [NodeJS]
- [Express]


## To-do
- Deploy Service to Active Server (Currently Offline)
- Implement Load Balancer to increase traffic capacity

