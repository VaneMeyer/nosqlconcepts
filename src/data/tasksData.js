const tasksData = [
  {
    taskTitle: "PostgreSQL",
    taskDescription: "PostgreSQL Description",
    tasks: [
      {
        taskId: 0,
        task: "Task 1.1: For each person you want to know in which department she or he works. Therefore, you should make an output that contains a person’s first name and last name and the name of the department she or he is working at.",
        maxTime: 30,
    },

    ],
  },
];

/* if (title === "PostgreSQL") {
  setTask(
    "Task 1.1: For each person you want to know in which department she or he works. Therefore, you should make an output that contains a person’s first name and last name and the name of the department she or he is working at."
  );
  setTasksArray([
    " Task 1.2: For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
    "Task 1.3: For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
    "Task 2.1: Do people that earn more than the average salary in their department write more emails than those who don’t? Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department that contains the brief-name of all the departments and the average salary for that department. Then produce the output of all the people that earn more than the avg. Salary and accordingly produce the output for all the people who earn less than the avg. Salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
    "Task 3.1: Hint: First create a copy of email table (in the “public” schema) and name it with “email_yourname” (e.g. email_elmamooz) and execute the queries of task 3 (3.1, 3.2) on this new table. Add/delete data and attributes just in your own copy of email table. You have to introduce a new element (attribute) to the email’s entity set (to your own copy of email table you created in task 3.1). Find the general syntax to do that.",
    "Task 3.2: Now, use the syntax from task 3.2 and add a new element “priority” to the email’s entity set with a default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its priority to a value of 3. Remember : Drop the table you created in task 3.1.",
    "Task 4.1: Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
    "Task 5.1: Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
    "Task 5.2: Larry May is an employee of Enron. Find all emails he received between the 01.09.2001 and the 31.10.2001.",
    "Task 6.1: Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. In Enron example, each employee can be seen as a node in the network and edges are represented by the emails sent from one to another employee or by the “knows” relationship between two employees. A relational Database provides us only records; therefore solutions to network analysis must be derived somehow different. Hint: you can  use  a UDF (User defined function)  to solve the following two  tasks. Remember: Delete any created functions before you leave the site. If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider the “from” and “to” fields to compute the amount of hops that is needed to reach everyone in Enron.",
    "Task 6.2: How many hops are needed to reach everyone from Larry May by their 'knows' relationship (similar to task 6.1)?",
    "Task 6.3: Which people are in the 2-hop email network? Again, consider the “knows” relationship, but only for people that are reachable with two hops.",
    "Task 6.4: Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
    "Task 7.1: Take an email text and count the occurrence of each word in that email. The output shall contain the words and the number of occurrence. You might need to use an external programming language to implement a UDF (User defined function) to split the email text into words. Apply the UDF to a particular email body. Bonus: Show the result according to ·	the alphabetical order of the words ·	the ascending order of occurrence ·	the descending order of occurrence Remember: Delete any created functions before you leave the site.",
    "Task 7.2: Now, create an output similar to task 7.1 for all emails. Info: depending on the database management system, this operation might be very expensive and can result in a timeout. In that case you might want to set a threshold for a timeout, if possible. Remember: Delete any created functions before you leave the site.",
  ]);
}
if (title === "Cassandra") {
  setTask(
    "Task 1.1: For each person you want to know in which department she or he works. Therefore you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at."
  );
  setTasksArray([
    "Task 1.2: For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
    "Task 1.3: For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
    "Task 2.1: Do people that earn more than the average salary in their department write more emails than those who don’t? Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department. Then produce the output of people that earn more than the avg. S. and accordingly produce the output for people who earn less than the average salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
    "Task 3.1: Create a copy of email table and name it with “email_yourname” (e.g. email_elmamooz) and execute the queries of task 3 (3.2, 3.3, 3.4) on this new table.",
    "Task 3.2: You have to introduce a new element (attribute) to the person’s entity set (to your own copy of email table you created in task 3.1). Find the general syntax to do that.",
    "Task 3.3: Now, use the syntax from task 3.2 and add a new element “priority” to the person’s entity set (your copy of table) with a default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its priority to a value of 3.",
    "Task 3.4: Drop the table you created in task 3.1.",
    "Task 4.1: Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
    "Task 5.1: Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
    "Task 5.2: Larry May is an employee of Enron. Find all emails he received between the 1st of September 2001 and the 31st of October 2001.",
    "Task 6.1: Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. In Enron example, each employee is a node in the network and edges are represented by the emails sent from one to another employee or by the “knows” relationship between two employees. If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider the “from” and “to” fields to compute the amount of hops that is needed to reach everyone in Enron.",
    "Task 6.2: How many hops are needed to reach everyone by their 'knows' relationship (similar to task 6.1)?",
    "Task 6.3: Which people are in the 2-hop email network? Again, consider the “knows” relationship, but only for people that are reachable with two hops.",
    "Task 6.4: Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
    "Task 7.1: Take an email text and count the occurrence of each word in that email. The output shall contain the words and the number of occurrence. You might need to integrate Java code into an UDF (User defined function) to split the email text into words. Apply the UDF to a particular email body. Hint: You might need an UDA (User defined aggregation) to produce the required output. Bonus: Show the result according to - the alphabetical order of the words - the ascending order of occurrence - the descending order of occurrence",
    "Task 7.2: Now, create an output similar to task 7.1 for all emails. Info: depending on the database management system, this operation might be very expensive and can result in a timeout. In that case you might want to set a threshold for a timeout, if possible.",
  ]);
}
if (title === "Neo4J") {
  setTask(
    "Task 1.1: For each person you want to know in which department she or he works. Therefore you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at."
  );
  setTasksArray([
    " Task 1.2: For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
    "Task 1.3: For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
    "Task 2.1: Do people that earn more than the average salary in their department write more emails than those who don’t? Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department that contains the brief-name of all the departments and the average salary for that department. Then produce the output of all the people that earn more than the avg. Salary and accordingly produce the output for all the people who earn less than the avg. Salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
    "Task 3.1: Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
    "Task 4.1: Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
    "Task 4.2: Larry May is an employee of Enron. Find all emails he received between the 01.09.2001 and the 31.10.2001.",
    "Task 5.1: Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider “EMAIL_FROM” and “EMAIL_TO” links to compute the amount of hops that is needed to reach everyone in Enron.",
    "Task 5.2: How many hops are needed to reach everyone by their 'KNOWS' relationship starting from Larry May (similar to task 5.1)?",
    "Task 5.3: Which people are in the 2-hop email network of Larry May? Again, consider the “KNOWS” relationship, but only for people that are reachable with two hops.",
    "Task 5.4: Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
  ]);
}
if (title === "MongoDB") {
  setTask(
    "Task 1.1: For each person you want to know in which department she or he works. Therefore you have to make an output that contains a person’s first name and last name and the name of the department she or he is working at."
  );
  setTasksArray([
    " Task 1.2: For each department: Find out how many emails in total were sent out from employees working there. The output per department shall contain the corresponding number of emails.",
    "Task 1.3: For each department: Find out how many emails in total were sent to employees working there (hint: carbon copies included). The output shall have the same structure as the output of Task 1.2.",
    "Task 2.1: Do people that earn more than the average salary in their department write more emails than those who don’t? Query for people that earn more than the average salary at their department and find out whether they write more emails than the other employees that earn less than the average salary at their department (equal is not considered). Check that for each department. First compute the result for the average salary (avg. S.) per department that contains the brief-name of all the departments and the average salary for that department. Then produce the output of all the people that earn more than the avg. Salary and accordingly produce the output for all the people who earn less than the avg. Salary. Produce a query result per department that contains the number of emails written by the people earning more and the people earning less than the average.",
    "Task 3.1: Hint: First create a copy of email table and name it with “email_yourname” (e.g. email_elmamooz) and execute the queries of task 3 (3.1, 3.2) on this new table. Please do not change email table. Add/delete data and attributes just in your own copy of email table, not in the original one. You have to introduce a new element (attribute) to the email’s entity set (to your own copy of email table you created in task 3.1). Find the general syntax to do that.",
    "Task 3.2: Now, use the syntax from task 3.2 and add a new element “priority” to the email’s entity set (your copy of table) with a default value of 1 for each entry. Then take a single entry of your choice (with a certain id) and set its priority to a value of 3. Hint: Drop the table you created in task 3.1.",
    "Task 4.1: Find missing values for each attribute of the e-mails. Which attribute has the most missing values?",
    "Task 5.1: Select all emails that have been written between the 01.09.2001 and the 31.10.2001. First, find out which date and time format is used in email!",
    "Task 5.2: Larry May is an employee of Enron. Find all emails he received between the 01.09.2001 and the 31.10.2001.",
    "Task 6.1: Network analysis can be done to investigate social structures. In the related field of social network analysis a network is characterized by nodes (individual actors, people, or things within the network) and the edges (relationships or interactions) that connect them. To find out, how far from each other two nodes of the network are, we can count hops. To calculate the number of hops, we calculate m+1, where m is the number of intermediate nodes between the two nodes we’re looking at. In Enron example, each employee can be seen as a node in the network and edges are represented by the emails sent from one to another employee or by the “knows” relationship between two employees. If the network nodes (the persons) are fully connected, how many hops are needed to reach everyone in Enron from Larry May by email? Consider the “from” and “to” fields to compute the amount of hops that is needed to reach everyone in Enron.",
    "Task 6.2: How many hops are needed to reach everyone by their 'knows' relationship from Larry May (similar to task 6.1)?",
    "Task 6.3: Which people are in the 2-hop email network of Larry May? Again, consider the “knows” relationship, but only for people that are reachable with two hops.",
    "Task 6.4: Find out who sent emails to exact 7 TO-recipients. The output shall contain the name(s) of the sender(s).",
    "Task 7.1: Take an email text and count the occurrence of each word in that email. The output shall contain the words and the number of occurrence. You might need to use an external programming language to implement a UDF (User defined function) to split the email text into words. Apply the UDF to a particular email body. Bonus: Show the result according to - the alphabetical order of the words -	the ascending order of occurrence -	the descending order of occurrence",
    "Task 7.2: Now, create an output similar to task 7.1 for all emails. Info: depending on the database management system, this operation might be very expensive and can result in a timeout. In that case you might want to set a threshold for a timeout, if possible.",
  ]);
}
 */