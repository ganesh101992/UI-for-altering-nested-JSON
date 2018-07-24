# UI-for-altering-nested-JSON
A UI for adding/removing/updating/traversing different levels of a JSON data

"App.js" contains the whole functionality
"data_english.json" contains the json data
"App.css" contains stylesheet
"global_variables.json" contains variable to store the current state

To rename/edit a definition - RIGHT CLICK on the definition container and then ENTER to initialize/set
To delete a definition - drag and drop the definition container onto the '-' sign on the top

Since, the data is in JSON format, i used the definitions as references(see JSON file) and maintained a hierarchy of the level (if the current definition was "month" then the level was 2 and hierarchy was "date/month" which are stored in json format in global_variables.json).

TODO:
1> Reload in the state the user was in when they last used - The current level number and the hierarchy of the current state is stored in global_variables.json. The user is prompted to continue, if yes then global_data is initialized to global_variables.json and then the following logic is used to get the subsection:

#      subSection=data;
#      cond=false;
#      diffTags=global_data.current_section_name.split("/");
#      for(i=0;i<global_data.index_of_current_section;i++){
#         cond=false;
#        for(j=0;j<subSection.length;j++){
#            for(k=0;k<subSection[j].length;k++)
#               if(subSection[j][k].definition.toString()===diffTags[i]){
#                 subSection=subSection[j][k].possibleValues;
#                 cond=true;
#                 break;
#               }
#            if(cond) break;
#         }
#         if(cond) break;
#      }

and then draw(subSection) is called which will reload the dashboard to the previous state.

2> In order for the first logic to work is should be exporting the new global_data to global_variables.json, after every change in level.

3> drag and drop works fine in chrome but not in firefox
