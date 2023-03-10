# Weather Web Application<br/>
This is a project from a school lab. I started from the beginning of the semester, continuing building new functionalities and add new components of the application until the end of the semester, from simple pieces and seperate components to a complete, workable application. This application is basically a weather application. I mostly used Angular, JavaScript, MongoDB, CSS to complete this application. It is a very simple-to-use application which only contains one fill-in-blank and four buttons. The user can either get, add, update, or delete the weather based on their input, which can be either city name or zip code, and they are all case insensitive. I use Angular Material package to generate tags based on the result of output, showing users whether their operations are successful or not. 

Thinking Process:<br/>
Step 1:
Fix issues from components. Through the comments of TA, my put functionality does not work properly for PUT. Therefore, I have
to fix those issues before I do anything else.<br/>

Step 2:
Modify the frontend. After discussing with TA, I find that making only one input field is much better than doing two, since
two input fields confuse users since they do not know exactly how the two input fields should work if I do not tell them how
to do so.<br/>

Step 3:
Add individual creativity. This actually takes me the longest time since I do not make a very appealing creativity for the
former labs. See details in the individual creativity section. Since the requirement of the lab is to make a cohesive and
whole application, I cannot just output the raw data.<br/>

Where I got stuck:
1. Finalize PUT request. There are issues for the put request for my Lab6, which prevents me from updating my weather data. I
use the same methods from w3school, but it just does not work properly. Therefore, I can only go to professor's office hour for
help.<br/>

2. Add Alerts in the frontend. Since this lab is for the final application, I have to make the application work as much properly
as possible. Therefore, I decide to add alert box for each time I click buttons. However, there are too many conditions for those
buttons, so I need to create many boolean statements in order to make those alert box appear as expected. The database is on the
backend, which users cannot see. Therefore, I want to show all the information on the frontend.<br/>

Individual Creativity:
The individual creativity really takes longer time than what I expected it to be. First, I have to change the basic styling of the
application to make it more colorful and appealing. Second, I need to add alert box with different colors to allow users to use it
very easily. Third, to display those weather data, I use Angular Material Card and Grid System to display those data in a more clear
and readable way.<br/>

External Resources:<br/>
https://www.w3schools.com/jsref/jsref_localecompare.asp<br/>
https://dmitripavlutin.com/how-to-compare-objects-in-javascript/<br/>
https://thispointer.com/get-the-first-key-value-property-of-a-javascript-object/<br/>
https://www.w3schools.com/bootstrap/bootstrap_alerts.asp

Author: Xiaoyang Wei<br/>
Course: Web Science Systems Development<br/>
Due Date: April 15th, 2022
