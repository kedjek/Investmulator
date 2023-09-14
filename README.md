1. Identify your user(s)
Humans: {age: 13+} /*Anyone learning to invest without financial risk.*/


2. What is the problem you’re solving?
People are scared to invest due to lack of knowledge & financial risk. This will allow people to learn to invest from any age without financial risk. 


3. What is the solution?
A tool that gives people an account, ability for users to buy & sell,  a set salary savings per week, track S&P 500 as well as their individual stock prices, 


4. What is the MVP scope? (core features you must get working)
--IN PROGRESS--
Fixing state update
new features like adding salary based on date creation
track other stock prices 

-----DONE----
Display website,
create and save user
log in with user
create cookie and track cookie
retrieve user info using cookie and display on page, username & buying power
retrive S&P 500 data using an api call
display S&P 500 data via a graph
user feature to buy and sell stocks



5. What are the tough technical challenges involved with solving this problem?
* API call to retrieve S&P 500 stock price and getting pass cor by utilizing axios and proxie server
* Figuring out Chart.js and displaying graph on page
* Learning to use Routes and Route to redirect rendering based on server input
* Combining two routes together to render at the same time was tricky, needed a separate parent combined route component
* Sending data from server to front end react component via direct html injection


6. What are the stretch goals?
* Additional stock options to choose from.
* Define location & city to retrieve average earnings as salary, expense & return weekly income respectively.
* Track user activity of sell & buy in history log.
* Uploading to extension so it is accessible from the browser more readily.



