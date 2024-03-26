import React from "react";

export const pgTasks = [
  {
    tasknumber: "Task 1",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.1 List of people with their department",
    maxtime: "Max Time: 0,5h",
    description:
      "For each person you want to know in which department she or he works. Therefore, you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at.",
    hint: "",
  },
  {
    tasknumber: "Task 2",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.2 Number of emails sent out per department",
    maxtime: "Max Time: 0,5h",
    description:
      "For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
    hint: "",
  },
  {
    tasknumber: "Task 3",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.3 Number of emails received per department",
    maxtime: "Max Time: 0,5h",
    description:
      "For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
    hint: "",
  },
  {
    tasknumber: "Task 4",
    topic: "Use Case 2: Theta Join",
    subtasknumber: "2.1 Correlation between salary and number of emails",
    maxtime: "Max Time: 2h",
    description:
      "Do people that earn more than the average salary in their department write more emails than those who don’t? ",
    hint: "Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department that contains the brief-name of all the departments and the average salary for that department. Then produce the output of all the people that earn more than the avg. Salary and accordingly produce the output for all the people who earn less than the avg. Salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
  },
  {
    tasknumber: "Task 5",
    topic: "Use Case 3: Schema Evolution",
    subtasknumber: "3.1	Add	information	for	entity set",
    maxtime: "Max Time: 0,1h",
    description:
      "Hint: First create a copy of email table (in the “public” schema) and name it with “email_yourname” (e.g. email_elmamooz) and execute the queries of task 3 (3.1, 3.2) on this new table. Add/delete data and attributes just in your own copy of email table. You have to introduce a new element (attribute) to the email’s entity set (to your own copy of email table you created in task 3.1). Find the general syntax to do that.",
    hint: "",
  },
  {
    tasknumber: "Task 6",
    topic: "Use Case 3: Schema Evolution",
    subtasknumber: "3.2	Add	information	for	entity	set	with	default	value",
    maxtime: "Max Time: 0,4h",
    description:
      "Now, use the syntax from task 3.2 and add a new element “priority” to the email’s entity set with a default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its priority to a value of 3. Remember : Drop the table you created in task 3.1.",
    hint: "",
  },
  {
    tasknumber: "Task 7",
    topic: "Use Case 4: Missing values",
    subtasknumber: "4.1	Find	missing	values",
    maxtime: "Max Time: 0,5h",
    description:
      "Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
    hint: "",
  },
  {
    tasknumber: "Task 8",
    topic: "Use Case 5: Range queries",
    subtasknumber: "5.1	Emails	between	two	dates",
    maxtime: "Max Time: 0,2h",
    description:
      "Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
    hint: "",
  },
  {
    tasknumber: "Task 9",
    topic: "Use Case 5: Range queries",
    subtasknumber: "5.2	Emails	between	two	dates	for	Larry	John May",
    maxtime: "Max Time: 1h",
    description:
      "Larry May is an employee of Enron. Find all emails he received between the 01.09.2001 and the 31.10.2001.",
    hint: "",
  },
  {
    tasknumber: "Task 10",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.1	Network	size	by	e-mail",
    maxtime: "Max Time: 2h",
    description:
      "If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider the “from” and “to” fields to compute the amount of hops that is needed to reach everyone in Enron. ",
    hint: "Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. In Enron example, each employee can be seen as a node in the network and edges are represented by the emails sent from one to another employee or by the “knows” relationship between two employees. A relational Database provides us only records; therefore solutions to network analysis must be derived somehow different. Hint: you can use a UDF (User defined function) to solve the following two tasks. Remember: Delete any created functions before you leave the site",
  },
  {
    tasknumber: "Task 11",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.2	Network	size	by	'knows'	relation",
    maxtime: "Max Time: 0,5h",
    description:
      "How many hops are needed to reach everyone from Larry May by their 'knows' relationship (similar to task 6.1)?",
    hint: "",
  },
  {
    tasknumber: "Task 12",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.3		Two-hop	email	network",
    maxtime: "Max Time: 1h",
    description:
      "Which people are in the 2-hop email network? Again, consider the “knows” relationship, but only for people that are reachable with two hops. ",
    hint: "",
  },
  {
    tasknumber: "Task 13",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.4	Count	outgoing	edges	",
    maxtime: "Max Time: 1h",
    description:
      "Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
    hint: "",
  },
];
export const cassandraTasks = [
  {
    tasknumber: "Task 1",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.1 List of people with their department",
    maxtime: "Max Time: 1h",
    description:
      "For each person you want to know in which department she or he works. Therefore, you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at.",
    hint: "",
  },
  {
    tasknumber: "Task 2",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.2 Number of emails sent out per department",
    maxtime: "Max Time: 2h",
    description:
      "For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
    hint: "",
  },
  {
    tasknumber: "Task 3",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.3 Number of emails received per department",
    maxtime: "Max Time: 1h",
    description:
      "For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
    hint: "",
  },
  {
    tasknumber: "Task 4",
    topic: "Use Case 2: Theta Join",
    subtasknumber: "2.1 Correlation between salary and number of emails",
    maxtime: "Max Time: 1h",
    description:
      "Do people that earn more than the average salary in their department write more emails than those who don’t? ",
    hint: "Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department that contains the brief-name of all the departments and the average salary for that department. Then produce the output of all the people that earn more than the avg. Salary and accordingly produce the output for all the people who earn less than the avg. Salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
  },
  {
    tasknumber: "Task 5",
    topic: "Use Case 3: Schema Evolution",
    subtasknumber: "3.1 Create	a	copy	of	a	table",
    maxtime: "Max Time: 0,5h",
    description:
      "Create a copy of email table and name it with “email_yourname” (e.g. email_elmamooz) and execute the queries of task 3 (3.2, 3.3, 3.4) on this new table.",
    hint: "",
  },
  {
    tasknumber: "Task 6",
    topic: "Use Case 3: Schema Evolution",
    subtasknumber: "3.2		Add	information	for	entity	set",
    maxtime: "Max Time: 0,5h",
    description:
      "You have to introduce a new element (attribute) to the person’s entity set (to your own copy of email table you created in task 3.1). Find the general syntax to do that.",
    hint: "",
  },
  {
    tasknumber: "Task 7",
    topic: "Use Case 3: Schema Evolution",
    subtasknumber: "3.3	Add	information	for	entity	set	with	default	value",
    maxtime: "Max Time: 0,5h",
    description:
      "Now, use the syntax from task 3.2 and add a new element “priority” to the person’s entity set (your copy of table) with a default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its priority to a value of 3.",
    hint: "",
  },
  {
    tasknumber: "Task 8",
    topic: "Use Case 3: Schema Evolution",
    subtasknumber: "3.4	drop	a	table",
    maxtime: "Max Time: 0,5h",
    description: "Drop the table you created in task 3.1.",
    hint: "",
  },
  {
    tasknumber: "Task 9",
    topic: "Use Case 4: Missing values",
    subtasknumber: "4.1	Find	missing	values",
    maxtime: "Max Time: 0,5h",
    description:
      "Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
    hint: "",
  },
  {
    tasknumber: "Task 10",
    topic: "Use Case 5: Range queries",
    subtasknumber: "5.1	Emails	between	two	dates",
    maxtime: "Max Time: 0,5h",
    description:
      "Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
    hint: "",
  },
  {
    tasknumber: "Task 11",
    topic: "Use Case 5: Range queries",
    subtasknumber: "5.2	Emails	between	two	dates	for	Larry	John May",
    maxtime: "Max Time: 0,5h",
    description:
      "Larry May is an employee of Enron. Find all emails he received between the 01.09.2001 and the 31.10.2001.",
    hint: "",
  },
  {
    tasknumber: "Task 12",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.1	Network	size	by	e-mail",
    maxtime: "Max Time: 1h",
    description:
      "If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider the “from” and “to” fields to compute the amount of hops that is needed to reach everyone in Enron. ",
    hint: "Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. In Enron example, each employee can be seen as a node in the network and edges are represented by the emails sent from one to another employee or by the “knows” relationship between two employees. A relational Database provides us only records; therefore solutions to network analysis must be derived somehow different. Hint: you can use a UDF (User defined function) to solve the following two tasks. Remember: Delete any created functions before you leave the site",
  },
  {
    tasknumber: "Task 13",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.2	Network	size	by	'knows'	relation",
    maxtime: "Max Time: 0,5h",
    description:
      "How many hops are needed to reach everyone by their 'knows' relationship (similar to task 6.1)?",
    hint: "",
  },
  {
    tasknumber: "Task 14",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.3		Two-hop	email	network",
    maxtime: "Max Time: 0,5h",
    description:
      "Which people are in the 2-hop email network? Again, consider the “knows” relationship, but only for people that are reachable with two hops. ",
    hint: "",
  },
  {
    tasknumber: "Task 15",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.4	Count	outgoing	edges	",
    maxtime: "Max Time: 0,5h",
    description:
      "Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
    hint: "",
  },
  {
    tasknumber: "Task 16",
    topic: "Use	Case 7:	User	defined	functions",
    subtasknumber: "7.1	Words	and	number	of	occurrences	in	a	certain	email",
    maxtime: "Max Time: 4h",
    description:
      "Take an email text and count the occurrence of each word in that email. The output shall contain the words and the number of occurrences. You might need to integrate Java code into an UDF (User defined function) to split the email text into words. Apply the UDF to a particular email body.",
    hint: "Hint: You might need an UDA (User defined aggregation) to produce the required output. Bonus: Show the result according to 1.the alphabetical order of the words, 2. the ascending order of occurrence, 3. the descending order of occurrence  ",
  },
  {
    tasknumber: "Task 17",
    topic: "Use	Case 7:	User	defined	functions",
    subtasknumber: "7.2	Words	and	number	of	occurrences	in	all	emails			",
    maxtime: "Max Time: 1,5h",
    description:
      "Now, create an output similar to task 7.1 for all emails. Info: depending on the database management system, this operation might be very expensive and can result in a timeout. In that case you might want to set a threshold for a timeout, if possible.",
    hint: " ",
  },
];
//5 tasks for on site session
export const pgTasksOnSite = [
  "Task 1: For each department, find how many persons have sent more than 100 emails.",
  "Task 2: How many persons have sent one or more emails to more than three department?",
  "Task 3: Same of Task 3, but don’t count the person’s department.",
];



export const neo4jTasksOnSite = [
  "Task 1: Find all the persons who work in the Health department.",
  "Task 2: Find all the persons who sent an email to any person that works in the Health department.",

  
];
export const neo4jTasks = [
  {
    tasknumber: "Task 1",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.1 List of people with their department",
    maxtime: "Max Time: 1h",
    description:
      "For each person you want to know in which department she or he works. Therefore, you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at.",
    hint: "",
  },
  {
    tasknumber: "Task 2",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.2 Number of emails sent out per department",
    maxtime: "Max Time: 0,5h",
    description:
      "For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
    hint: "",
  },
  {
    tasknumber: "Task 3",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.3 Number of emails received per department",
    maxtime: "Max Time: 0,5h",
    description:
      "For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
    hint: "",
  },
  {
    tasknumber: "Task 4",
    topic: "Use Case 2: Missing values",
    subtasknumber: "2.1	Find	missing	values",
    maxtime: "Max Time: 1h",
    description:
      "Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
    hint: "",
  },
  {
    tasknumber: "Task 5",
    topic: "Use Case 3: Range queries",
    subtasknumber: "3.1	Emails	between	two	dates",
    maxtime: "Max Time: 0,5h",
    description:
      "Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
    hint: "",
  },
  {
    tasknumber: "Task 6",
    topic: "Use Case 3: Range queries",
    subtasknumber: "3.2	Emails	between	two	dates	for	Larry	John May",
    maxtime: "Max Time: 1h",
    description:
      "Larry May is an employee of Enron. Find all emails he received between the 01.09.2001 and the 31.10.2001.",
    hint: "",
  },
  {
    tasknumber: "Task 7",
    topic: "Use Case 4: Network analysis",
    subtasknumber: "4.1	Network	size	by	e-mail",
    maxtime: "Max Time: 1h",
    description:
      "If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider 'EMAIL_FROM' and 'EMAIL_TO' links to compute the amount of hops that is needed to reach everyone in Enron.",
    hint: "Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. ",
  },
  {
    tasknumber: "Task 8",
    topic: "Use Case 4: Network analysis",
    subtasknumber: "4.2	Network	size	by	'knows'	relation",
    maxtime: "Max Time: 0,5h",
    description:
      "How many hops are needed to reach everyone by their 'KNOWS' relationship starting from Larry May (similar to task 5.1)?",
    hint: "",
  },
  {
    tasknumber: "Task 9",
    topic: "Use Case 4: Network analysis",
    subtasknumber: "4.3		Two-hop	email	network",
    maxtime: "Max Time: 0,5h",
    description:
      "Which people are in the 2-hop email network of Larry May? Again, consider the 'KNOWS' relationship, but only for people that are reachable with two hops.  ",
    hint: "",
  },
  {
    tasknumber: "Task 10",
    topic: "Use Case 4: Network analysis",
    subtasknumber: "4.4	Count	outgoing	edges	",
    maxtime: "Max Time: 1h",
    description:
      "Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
    hint: "",
  },
];

export const mongodbTasks = [
  {
    tasknumber: "Task 1",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.1 List of people with their department",
    maxtime: "Max Time: 0,5h",
    description:
      "For each person you want to know in which department she or he works. Therefore, you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at.",
    hint: "",
  },
  {
    tasknumber: "Task 2",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.2 Department ordered by sent emails",
    maxtime: "Max Time: 0,5h",
    description:
      "You want to know how different departments are sending emails. Sort the departments by the average number of email sent per day. (hint: carbon copies included) ",
    hint: "",
  },
  {
    tasknumber: "Task 3",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.3 Weakly workload",
    maxtime: "Max Time: 0,5h",
    description:
      "Employees could have different workload during the week. What is the busiest week-day in term of email sending in Ernon ? ",
    hint: "",
  },
  {
    tasknumber: "Task 4",
    topic: "Use Case 1: Equi Join",
    subtasknumber: "1.4 Weakly workload",
    maxtime: "Max Time: 0,5h",
    description:
      "What is the ratio of workload variation over the week?  ",
    hint: "Hint : the ratio can be found as: r = (number of email sent in the bussiest day - average number of email sent per day) / average number of email sent per day",
  },
  {
    tasknumber: "Task 5",
    topic: "Use Case 2: Theta Join",
    subtasknumber: "2.1 Correlation between salary and number of emails",
    maxtime: "Max Time: 2h",
    description:
      "Do people that earn more than the average salary in their department write more emails than those who don’t? ",
    hint: "Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department that contains the brief-name of all the departments and the average salary for that department. Then produce the output of all the people that earn more than the avg. Salary and accordingly produce the output for all the people who earn less than the avg. Salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
  },
  {
    tasknumber: "Task 6",
    topic: "Use Case 3: Schema Evolution",
    subtasknumber: "3.1 Update the schema ",
    maxtime: "Max Time: 0,5h",
    description:
      "Adding new information about salary in the person table would reduce its normal form. This is solved by creating new table called salary with attributes (ID, salary group, starting salary). Create the given table with name 'salary_your_name' , and create a copy of person table with name 'person_your_name' (create both tables in the 'public' schema). Now connect the two created table with appropriate foreign key.",
    hint: "Remember: Delete the tables that you have created.",
  },
  {
    tasknumber: "Task 7",
    topic: "Use Case 4: Missing values",
    subtasknumber: "4.1	Find	missing	values",
    maxtime: "Max Time: 0,5h",
    description:
      "Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
    hint: "",
  },
  {
    tasknumber: "Task 8",
    topic: "Use Case 5: Range queries",
    subtasknumber: "5.1 Salaries between two values",
    maxtime: "Max Time: 0,25h",
    description:
      "Select all employees who have salaries between 40000 and 45000.",
    hint: "",
  },
  {
    tasknumber: "Task 9",
    topic: "Use Case 5: Range queries",
    subtasknumber: "5.2 Salaries between two values for certain department ",
    maxtime: "Max Time: 0,25h",
    description:
      "Select all employees who have salaries between 40000 and 45000 and works for the defense department.",
    hint: "",
  },
  {
    tasknumber: "Task 10",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.1 E-mail network",
    maxtime: "Max Time: 1h",
    description:
      "Find the number of persons who never sent any emails to each other in all departments. ",
    hint: "Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. In Enron example, each employee can be seen as a node in the network and edges are represented by the emails sent from one to another employee or by the “knows” relationship between two employees. A relational Database provides us only records; therefore solutions to network analysis must be derived somehow different. Hint: you can use a UDF (User defined function) to solve the following two tasks. Remember: Delete any created functions before you leave the site. ",
  },
  {
    tasknumber: "Task 11",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.2 E-mail network",
    maxtime: "Max Time: 1h",
    description:
      "Do employees send email to other department? Order the department by the number of sent email to other departments.",
    hint: "",
  },
  {
    tasknumber: "Task 12",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.3 Social network ",
    maxtime: "Max Time: 1h",
    description:
      "Consider the knows relationship to find the employee in Enron who has the most number of know people in his social network up to 3 hops. ",
    hint: "",
  },
  {
    tasknumber: "Task 13",
    topic: "Use Case 6: Network analysis",
    subtasknumber: "6.4 Social network	",
    maxtime: "Max Time: 1h",
    description:
      "Repeat task 6.3 but consider the emails and the “from” and “to” fields to find whether two persons know each other.",
    hint: "",
  },
  {
    tasknumber: "Task 14",
    topic: "Use	Case 7:	User	defined	functions",
    subtasknumber: "7.1 Unique words in a certain email ",
    maxtime: "Max Time: 2h",
    description:
      "Take an email text and find how many unique words it has. You might need to use an external programming language to implement an UDF (User defined function) to split the email text into words. Apply the UDF to a particular email body.",
    hint: "Remember: Delete any created functions before you leave the site.  ",
  },
  {
    tasknumber: "Task 15",
    topic: "Use	Case 7:	User	defined	functions",
    subtasknumber: "7.2 Words distance in a certain email 		",
    maxtime: "Max Time: 2h",
    description:
      "For all the emails, count the existence of two words: “meeting” and “time”, such that the distance between the words in text is no more than 3 words. The output should be the email and the count of occurrence. Similar to the previous task, an UDF might be necessary. ",
    hint: " Remember: Delete any created functions before you leave the site. ",
  },
];
