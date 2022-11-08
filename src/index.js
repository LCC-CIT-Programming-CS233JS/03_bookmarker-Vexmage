class Bookmarker
{
    constructor() {

        this.body           = document.body;       
        this.overlay        = document.querySelector('.overlay');
        this.bookmarksList  = document.querySelector('.bookmarks-list');
        this.bookmarkForm   = document.querySelector('.bookmark-form');
        this.bookmarkUrl    = this.bookmarkForm.querySelector('#url');
        this.bookmarkDesc   = this.bookmarkForm.querySelector('#description');
        this.bookmarks      = JSON.parse(localStorage.getItem('bookmarks'));
        this.apiUrl         = 'https://opengraph.io/api/1.1/site';
        this.appId          = 'fbc0d09c-b334-455b-aa86-bcb0a1714968';
        // 'bca93b02-dc66-4738-8eae-52a57d8d47d0'; //joel's api key from opengraph.io
        // teacher's api key is 'fbc0d09c-b334-455b-aa86-bcb0a1714968'; but I should use my own

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
        document.getElementById("bookmark-form").onsubmit = this.addBookmark.bind(this);

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
        const urlForHref = document.querySelector('#url').value; //new
        const url = encodeURIComponent(urlForHref); //new
        //let ourUrl = document.getElementById("url"); //replaced?
        //let ourDescription = document.getElementById("description");
        const description = document.querySelector('#description').value; //new
        fetch('${this.apiUrl}/${url}?app_id=${this.appId}')
            .then (response => response.json())
            .then (data => {
                const bookmark = {
                    title: data.hybridGraph.title,
                    image: data.hybridGraph.image,
                    link: urlForHref,
                    description: description
                }; // add the data from the api to our bookmark
                this.bookmarks.push(bookmark); //add the bookmark to the list
                this.fillBookmarksList(this.bookmarks);
                document.querySelector('.bookmark-form').reset();
            })
            .catch(error => {
                console.log('There was a problem getting info!');
            })
        ;

        //let url = ourUrl.value.trim(); //replaced by new

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
