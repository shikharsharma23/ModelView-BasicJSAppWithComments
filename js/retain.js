$(function(){
    
    // declare the model. model deals with data. how to keep and mantain it. more like of a class with mehtods
    var model = {
        init: function() { // first function of model is init
            if (!localStorage.notes) { // check if there are notes
                localStorage.notes = JSON.stringify([]); // if not make variable and initialize with empty notes
            }
        }, 
        add: function(obj) { // second function is add. it adds new obj to data
            var data = JSON.parse(localStorage.notes); // take all notes and put in data
            data.push(obj); // add the object
            localStorage.notes = JSON.stringify(data); // sotre string data
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes); // retrieve all notes
        }
    };


    // declare the octopus / O / Controller . view model . This is a bridge between view and mode. it calls method and logics of individuals
    // filters and exchange info and controls the communication between two

    var octopus = { 
        addNewNote: function(noteStr) { // functionaility : add new note
            model.add({ // call the model function to store node
                content: noteStr
            });
            view.render(); // call the view function to update view
        },
 
        getNotes: function() { // list all nodes . 
            return model.getAllNotes(); // cal the model function to get all nodes
        },

        init: function() { // init function
            model.init(); // initialize mode : all notes empty
            view.init(); // initialize view : show the first screen
        }
    };


    // view : deals with user view buttons forms etc
    var view = {
        init: function() { // init method
            this.noteList = $('#notes'); // make a variable of this function / object (functions are obj in js) and bind it to notes div from html
            var newNoteForm = $('#new-note-form'); //  link to new note form
            var newNoteContent = $('#new-note-content'); // link to new div
            newNoteForm.submit(function(e){ // when submit is pressed
                octopus.addNewNote(newNoteContent.val());  // ask octopus to set the added node
                newNoteContent.val(''); // set value to empty
                e.preventDefault(); 
            });
            view.render(); //call render after init
        },
        render: function(){ // render function
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content +
                    '</li>';
            });
            this.noteList.html( htmlStr ); // use octopus to get note ( which gets it from model) and update html
        }
    };

    octopus.init(); // start octopus /controller
});