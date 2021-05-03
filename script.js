const addButton = document.getElementById('add')

function addNote(text = "") {   //agr text mein kuch hoga toh text true hoga warna khali hai toh false
    
    //we created a div tag with class note
    const note = document.createElement('div')
    note.classList.add('note') // to add class note
    
    
    //we store rest of the html part in htmlData
    const htmlData = `
    <div class="tools">
    <button class="edit" title="Edit/Save"><i class="fas fa-edit "></i></button>
    <button class="delete" title="Delete"><i class="fas fa-trash-alt "></i></button>
    </div>
    
    <div class="main ${text ? "" : "hidden"}"></div>  
    <textarea class="${text ? "hidden" : ""}" cols="30" rows="10" placeholder="Add your text here...."></textarea>`
    
    
    note.innerHTML = htmlData;
    // note.insertAdjacentHTML('afterbegin',htmlData); // can also use this to add html
    console.log(note);
    // now to the last line of this function
    
    // now we have created full html of a new note so we need to add this in main body as a child
    document.body.appendChild(note)
    
    //for deltetion of note
    const deleteButton = note.querySelector('.delete')
    deleteButton.addEventListener('click' , () => {
        note.remove()
        updateLSdata(); // to again update the local storage nd delete the textvalue which note is deleted
    })
    
    
    // save/edit using edit button
    // ${text ? "" : "hidden"} -- tis thing is actuall adding a class hidden that has css of display none
    // if text is true toh textarea will be hidden and text will be visisble in div main 
    // if text is false textarea is visible and we can write in it and div main will be hidden
    const editButton = note.querySelector('.edit')
    const mainDiv = note.querySelector('.main')
    const textArea = note.querySelector('textarea')
    
    
    // to get the saved text in both div and text area to edit
    textArea.value = text;
    mainDiv.innerHTML = text;
    
    
    editButton.addEventListener('click' , () => {
        mainDiv.classList.toggle('hidden');   //button dabane par agr main div hidden hai(that will be when we r writing) toh wovisible ho jayegi and jo text area visile hai wo hidden ho jayega
        textArea.classList.toggle('hidden');
    })
    
    
    // this is so that whenever u type something and click edit eevent change occurs and urtext passes into divmain and due to toggle text area hides and div main appers
    textArea.addEventListener('change' , (event) => {
        const yourText = event.target.value;
        mainDiv.innerHTML = yourText;
        console.log(yourText);
        
        // to store and save data in local storage we will call this function
        updateLSdata();
        
    })
    
}


function updateLSdata() {
    const textAreaData = document.querySelectorAll('textarea')  // this will have array of all textareas
    console.log(textAreaData);
    
    const AllNotesText = []                 // this will store text values of all notes in array
    textAreaData.forEach((currentNote) => {
        return AllNotesText.push(currentNote.value)
    })
    console.log(AllNotesText);
    
    // to pass the notes text value to local storage
    localStorage.setItem('AllNotesText' , JSON.stringify(AllNotesText))  // LS takes data in form of key and value in string format ...so allnotes is the key and JSON.stringify(allNotesValue) is basically the all values but in string format 
}


// to get the data back from loacal storage and generate all notes 
const notes =  JSON.parse(localStorage.getItem('AllNotesText'))  // since data in LS is in string json format so we want it back in array format

if(notes) //agr notes hain LS mein toh
{
    notes.forEach(note => {   //har note ki value pe ek new note craete krdo
        addNote(note)   //this value of note will pass into text
    });
}

