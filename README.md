# [Wag Pet Resort   :dog:](https://wag-project.herokuapp.com/)

### *Couple quick things to note upon clicking on link above*
 > When you first land on our Heroku project you are first directed to our [Project](https://wag-project.herokuapp.com/res-info-test.html) page. To go to the Presentation pages (and we encourage you to do so - because they are awesome) please click the name in the footer, or click [here](https://wag-project.herokuapp.com/presentation.html).  From the presentation pages, you can click the project name (Wag Pet Resert) in the upper left to return to the Project pages.
 
 
 > All navigation in Presentation is done by clicking the element you want to see and then clicking it again to return to the initial page
 
 
 > In order to get to the Business [Dashboard](https://wag-project.herokuapp.com/landing-2.html) you must click the "Team Members" button in the upper right (we had some authentication problems, so after clicking the Google button, please click the "Team Memebers" button a second time to redirect
 
<br>
<br>

## Built by:  Team **JAG** (Joel, Ariel, Glen)

While we really all shared in the overall responsibility for all pieces, the primary division of labor was as follows:

Team Member | Primary Duties
----------- | --------------
**Joel**   | Front-End Development
&nbsp;     | Address Autocompleter
&nbsp;     | Form Validation
**Ariel**  | Back-End Development
&nbsp;     | Management / Organizer
&nbsp;     | Calendar functionality
&nbsp;     | DataTables functionality
**Glen**   | Back-End Development
&nbsp;     | Map integrations
&nbsp;     | Firebase
  

## Project Description: 
**Customer Relationship Management Tool for a fictitious pet resort (Wag)**  
 - Form page on companies website for customers to book a reservation 
 - Business Dashboard where Team Members can:
   - See upcoming schedule, manage appointment calendar
   - View / Manage clientele info
   - Map to clienteles adressess for those requesting Mobile Services
 
## APIs Used:
- Google Places - for address autocompletion in Reservation form
- Google Maps - for mapping clients addresses
- Google Calendar API - for scheduling appointments both on users calendar and businesses calendar
- DataTables API - for table lookups and organization 

## Libraries:
- Parsley.js - for form validation library
- Moment.js - for time capture and conversion
- Fullcalendar.js - for calendar display

## Front-End Framework:
- Material Design for Bootstrap (MDB)


## Future Wish-List
- Customer Dashboard, where they can:
  - Sign-Up / Sign-In modal 
  - Display account Info
  - Create a profile picture of their pet(s)
  - See upcoming Appts
  - See tailored messages, and alerts from business
  - Schedule additional services
- Business Dashboard additions:
  - Plug-in for communicating marketing blasts to clientele (SMS)
  - Method for payment collection
  - Further client list functions
    - Modal where client data can be viewed/modified when clicked within table
    - Specific Driving directions to customers having requested Mobile Service
    - Area where targeted messages including pictures of pet can be sent to client
  - Further Map Integrations wishlist
    - Listing of clients for calendar date providing their appt times and driving routes
    - Numbered pins on Calendar for clients in order of schedule time

