# Expense Tracker App

This app is created for tracking expenses and income on the Internet Computer: TypeScript Smart Contract 101 Challenge course.

## How Does It Work?

The expense tracker application allows users to perform the following operations:

### Add Expense
Users can add new expenses by sending a POST request to the `/expenses` endpoint with the required expense data.

### Add Income
Users can add new income entries by sending a POST request to the `/income` endpoint with the required income data.

### Calculate Total
Users can calculate the total amount by subtracting total expenses from total income. This can be done by sending a GET request to the `/total` endpoint.

## Installation

To set up the expense tracker application locally, follow these instructions:

#### Clone the GitHub Repository
Begin by cloning the repository to your local machine using the following command:

```
git clone https://github.com/Pseudoman21/icp-expense-tracker-app.git
cd expense-tracker
```

#### Install Dependencies: Install the required dependencies by running:

```
npm install
```

#### Start the Server: Start the server by running:

```
dfx start
```

### Deploy locally

```
dfx deploy
```

#### Sending Requests
You can send requests to the expense tracker application using a client such as Postman or ThunderClient

#### Contributing
If you would like to contribute to the todo list application, feel free to fork the repository, make changes, and submit a pull request. Contributions are welcome and appreciated!
