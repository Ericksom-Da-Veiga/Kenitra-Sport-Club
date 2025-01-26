# Sports Hall Management  
This project aims to provide a complete management platform for a sports hall.  

## Objective  
Simplify the daily management of a sports hall while offering an intuitive solution to manage members, subscriptions, coaches, and payments.  

## Key Features  
- **Member Management**: Ability to add, delete, and update member information.  
- **Subscription Management**:  
	- Each subscription can include one or more sports.  
	- Subscriptions have a fixed duration and price to pay.  
- **Coach Management**: Assignment of one or more coaches to each offered sport.  
- **Payment Management**:  
	- **Payment Recording**: Users can record payments made by members.  
	- **Debt Tracking**: The platform identifies and tracks members with outstanding payments or delays.  

## Technologies Used  
- **Frontend**: AngularJS  
- **Backend**: Spring Boot  
- **Database**: MySQL  

## How to Use  
To start using Sports Hall Management, follow these simple steps:  

1 . **Clone the Repository**: Clone the project repository to your local machine using the `git clone` command.  

2 - **Install Dependencies**:  

- In the **backend** directory:  

		mvn clean install  

- In the **dashboard** directory:  

		npm install  

3 - **Database Configuration**  

4 - **Run the Application**:  

- To run the **backend**:  

		mvn spring-boot:run  

- To run the **frontend**:  

		ng serve  

## Contribution  
Contributions are welcome. If you have improvement ideas, bugs to report, or features to add, feel free to open an issue or submit a pull request on my GitHub repository.  

## License  
This project is licensed under the MIT License, which means it is open for community use, modification, and distribution. Refer to the LICENSE file for more details.  
