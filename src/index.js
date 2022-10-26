/* 
Setup your development environment OK I WILL
    -   clone the repository with the starting files from github
    -   run npm init from the command line to create your package.json file
    -   run npm install ... and include the tools that you want to use in your application
    -   edit the scripts block in package.json to include npm commands you want to use
 
Create the look and feel of your page
    Use html 5 input attributes to make sure that the url and description are provided.
        The url should be a valid url too.
    -   At this point the user enters the url and the description.  After we talk about
        making an ajax call in chapter 3, we'll get the image and the title from an api.
    Add one or more sample bookmarks to the html page.
    -   Each bookmark is a link that contains: an image, 
        and the text that the user sees.  It also has a description and an icon for deleting.
    -   Don't forget the event handler on the control that deletes the bookmark
    Style the list of bookmarks and the page as a whole so it is reasonably attractive
    -   I have provided a screen shot of my page as well as 
        a screen shot of what my page looks like when I'm adding a new bookmark. */

class Bookmarker
{
    constructor() {
        if (!localStorage["BOOKMARKS"]) { 
            this.bookmarks =             
            [
                {
                    description: "Really cool site for open source photos", 
                    image: "",
                    link: "https://www.pexels.com/", 
                    title: "https://www.pexels.com/",
                },
                {
                    description: "Stanford Encyclopedia of Philosophy ", 
                    image: "",
                    link: "https://plato.stanford.edu/", 
                    title: "https://plato.stanford.edu/",
                },
            ]
        } else {
            this.bookmarks = JSON.parse(localStorage.getItem('BOOKMARKS'));
        }
        this.fillBookmarksList(this.bookmarks);
        document.getElementById("bookmarks-form").onsubmit = this.addBookmark.bind(this);

        let overlay = document.getElementsByClassName("overlay")[0];
        let url = document.getElementById("url");
        let description = document.getElementById("description");

        // This stuff is for drawing attention to the form.
        url.onfocus = () => {
            overlay.style.opacity = 1;
        }
        url.onblur = () => {
            overlay.style.opacity = 0;
        }
        description.onfocus = () => {
            overlay.style.opacity = 1;
        }
        description.onblur = () => {
            overlay.style.opacity = 0;
        }
    }
    
    generateBookmarkHtml(bookmark, index) {
        return `
        <li class="list-group-item checkbox">
        <div class="row">
          <div class="col-sm-10 complete">
            <a href="${bookmark.link}">${bookmark.title}</a>
            <p>${bookmark.description}</p>
          </div>
          <div class="col-sm-1 pt-2 delete-icon-area">
            <a class="delete-bookmark" href="/" onclick="bookmarker.deleteBookmark(event, ${index})"><i class="bi-trash delete-icon"></i></a>
          </div>
        </div>
      </li>
        `;
    
    }
    fillBookmarksList(bookmarks) {
        localStorage["BOOKMARKS"] = JSON.stringify(bookmarks);
        let bookmarkHtml = bookmarks.reduce(
            (html, bookmark, index) => html += this.generateBookmarkHtml(bookmark, index), 
            '');
        document.getElementById("bookmarks-list").innerHTML = bookmarkHtml;
    }
    deleteBookmark(event, index) {
        event.preventDefault();
        this.bookmarks.splice(index, 1);
        this.fillBookmarksList(this.bookmarks);

    }
    addBookmark(event) {
        event.preventDefault();
        let ourUrl = document.getElementById("url");
        let ourDescription = document.getElementById("description");
        let url = ourUrl.value.trim();

        if (url == "" ) {
            return;
        }

        if (!url.startsWith("https://") && !url.startsWith("http://")) {
            url = "http://" + url;
        }

        try {
            new URL(url);
        } catch { 
            return;
        }

        let bookmark = {
            description: ourDescription.value, 
            image: "",
            link: url, 
            title: url,
        }
        this.bookmarks.push(bookmark);
        this.fillBookmarksList(this.bookmarks);
        ourDescription.value = "";
        ourUrl.value = "";
    }
}

/* TESTING THIS
Create a class called Bookmarker
    

    EXTRA CREDIT: 
    -   Do something on the page to draw attention to the form when you enter and leave 
        the form.  See my screen shot and the styles in the css file to an idea.

*/

/*  THIS IS NECESSARY FOR TESTING ANY OF YOUR CODE
    declare a variable bookmarker
    Add a window on load event handler that instantiates a Bookmarker object.  
    Use and arrow or anonymous function
*/
let bookmarker;
window.onload = () => {bookmarker = new Bookmarker();}
