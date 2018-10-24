# AngularsNews
# commentada

##git commands
#git status 

#git add README.md / *
#git commit -m "......"
#git push 
#
#git pull
#


#--index file -- 

-navigation bar show all buttons/links for categories shown (National, Ecomony, Sports, Techonoly, and All news)
-checkbox to select if the users is logged in or not (if logged in th euser can create edit or remove, othervides just view)
-navigation bar sould properly shown in mobile devices(ideally should be collpesed in one button)
- links must filter the news shown according to their category




#--news-list -- 

-Main page include news title, subtitle, thumbnail and abstract (not the body)
-title and image to be linked to the detail page of the news (News edition is not allowed by means of this links.)
-Twitter timeline(twitter profile used could be @EIT_dital), not to be shown at small devices
-if the users is logged in the following buttons should apper: 1.edit and redirect the the edition form of each news, 2 create news which redirect to an empty edition form and 3. remove each of the news
-removal should require confirmation and give feedback 
- links must filter the news shown according to their category



#--news edition --

-form that inculde all imput to edit/create the news (title, subitite, abstact, body and picture selcetion)
-Categories must be selected in combo with values : national, sports...
-Body can be fill in HTML format (a WYSIWYG can be used)
-All inputs are mandatory (except of image) are mandatory and the form must be valitated
- Form incude buttons to go to the main page and to save/create the form 
- Give feedback when save




#--news show --

-detail news with title, subtite, abstact, body and picture nad image if included
-modification data and useranme who modified the content must be shown at the end of the page
-News cannot be delted here



#--news login --

- server requires to include login information to get the news associated to each group. This information must be included in the header of the http request as an apikey (provided). . By default, you have to set the anonymous apikey in the file news-app.js to receive only the news associated to you group. (more info at the pdf)



#--news controller --

- server returns a field update_date with the timestamp of the last modification
of the given news.
-Depending the request, the image associated to each news are returned in two different fields:
▪ image_data and image_media_type when the request is asking for one concrete news
▪ thumbnail_data and thumbnail_media_type when the request is asking for a list of news



#--news app.js--

-contains the code need to load an image and convert it to BASE64 format to send it to the server. A comment in the edition file is added to load image.



#--news service --

-which contains the code needed to call to the RESTful service to get the data from the server.

