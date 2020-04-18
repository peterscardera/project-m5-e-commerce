# Background info:

This project was put together by Andrew Diles, Kendra Scappaticci and Peter Scardera as a requirement to complete the Javascript Concordia bootcamp, winter of 2020 (cb-i-3)

We collaborated for 8 days on the project; and surpassed all MVP goals.

# How to run:

In VS code, this will require a split screen terminal, as both a back end server and front end site need to be run.
Install and run the components in both the client and server folders.  The FE will fetch the appropriate data when it first accesses the site ( @ http://localhost:3000/ )

# What the site does:

This E-commerce site displays item for sale from a list of item details provided from the BE.

Site navigation includes:
- home page that display items
- shop that displays items with several filtering functions
- log in, new account and user profile screens.

Users can:
- log in / out
- create new accounts
- add the items to their from the shop (by any increment that the stock can supply)
- open their cart at any time (except when in the purchase screen)

From the cart they can: 
- increment item quantities up/down
- clear out all quantity of an item
- clear out all items from the cart
- Move to the purchase screen

From the purchase screen they can:
- manipulate item quantities
- travel to log in screen if they are not signed in
- select an address that is saved with their account
- input payment information (this information is not authenticated, but information type is verified as being appropriate)

The BE maintains the cart of a logged in user at all times.  If a user logs in with items in their cart, the saved cart and their current cart are merged, and items in excess of stock are removed.  The FE recieves the item ids of truncated quantities, but we did not have enough time to display them in a modal, which leads us to...

# Incompleted features due to lack of time

The project was initially due on a Monday, but, the Thursday before, was bumped up to Friday, leaving us one day left to work instead of three.  Consequantially, we had to forego some features we had intended to implement.

View past orders was not completed in the user information screen.  The information is successfully in the FE, but we did not have enough time to display it in a satisfying manner

The confirmation page was not completed.
Some stylings were not polished (notably the purchase modal)

Users cannot enter a new address when performing a purchase.

Users cannot purchase without an account.

Users cannot search for orderHistories using an email address without an account.

Some known bugs exist : such as the total number of items in the cart displaying a zero in the tens column after cart merges.  The filter bar not having appropriate wrapping for smaller screen widths.  The filter displaying one less item than it should.  Etc.

We are confident the bugs we knew about, the styling and extra intended features would have been completed in the original time allotment.


# Below are the instructions our team recieved for this project:


# Wearables E-Commerce Project

[See the list of TEAMS](__documentation/TEAMS.md)

You will make use of _everything_ that you have learned thus far in the bootcamp to build an e-commerce app that will showcase all of the provided _wearables_ items.

The stack is React.Js, Redux, Node.Js, and styled-components.

Your node server should be RESTful and follow REST principles, at least to the extent we learned during the bootcamp.

## Getting Started

<img src="./server/assets/software-dev-path.jpg" style="width: 100%;" />

You have your assignment and your team. What should you do first? This will vary for every team, and even every team member.

**The important thing is to NOT just jump in and start coding!**

There probably shouldn't be any coding until very near the end of the first day.

## Meet your Product Manager!

Each team has been assigned a product manager. This person is in charge of answering questions, guiding you and basically preventing everything from falling apart!

This person should be prevent for some of your team meetings but not all. PMs are super busy people and have multiple projects, people to manage.

## Planning

1. You will break into 3 groups (with your assigned PM.)
2. Your PM will answer any initial questions, and give you more information, as required.
3. Break into a separate meeting with just your team. \_Your PM will bounce from team to team to make sure you're on track.
4. Time to use the [Kickoff Meeting Agenda](__documentation/KICKOFF_MEETING_AGENDA.md)

### First team meeting

It could also be a good/fun idea to give yourselves an original team name. :)

Your first team meeting should start with the [Kickoff Meeting Agenda](__documentation/KICKOFF_MEETING_AGENDa.md).

[Successful Software Project Delivery in 10 Steps](https://www.appnovation.com/blog/successful-software-project-delivery-10-steps).

💡 How a project starts is indicative of how it will end.

## Teamwork

The most important aspect of this project is the ability to work in a team. No matter your contribution to the project, yuo should understand the _full_ codebase. This will require that you

- **review** each other's code
- **ask** questions when you don't understand
- **comment** your code extensively. _Always go for clarity over brevity._

## GitHub

see the [GITHUB Document](__documentation/GITHUB.md)
