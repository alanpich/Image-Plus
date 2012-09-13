##This repo is soon to be closed
Current work on tvImagePlus (v2.0, aka 'the one that works') will be moved to a new repo [here](https://github.com/alanpich/tvImagePlus), 
leaving this old thing for dead.

I can't suggest, justify or support anybody using the code in this repo as it is outdated and incomplete. 

-----------------------------------------------------------------------
-----------------------------------------------------------------------
-----------------------------------------------------------------------

#Image-Plus#
##ModX 2.2+ Custom TV Input Type##
-----------------------------
### About ###
Image-Plus is an advancede image input type for template variables. It allows for quick and easy re-use of a single source image accross multiple areas on the site.
From an objective point of view, it is a shiny front-end for phpThumb throughout your design.


### Installation ###
Unzip into the root of your ModX installation
*TODO: Create a transport package & submit to ModX.com Extras repository*


### Usage ###
Create a new TV for your image and select an input type of 'imageplus'
Set the image width and height in the options box that appears below

When setting the TV value for a resource, select an image from the image browser. This is the 'source image'.
You can then crop the image using the 'Edit Image' button. This will present a window where you can select exactly what part of the source image you want to use.

Save your resource, and the TV value will contain a cropped version of the source image, exactly the correct size for your design. No more phpthumbof headaches! (and the source file is untouched)