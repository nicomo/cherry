$( document ).ready(function() {
    console.log( "ready!" );

    $.getJSON( "../static/data/xbr_biblio.json", function(bib_data) {
      
      console.log( "success" );
      console.log(bib_data.length);

      var html = '';

      for (var i = 0; i < bib_data.length; i++) {

        html+= '<li>';

        // authors
        if (typeof bib_data[i].creators != 'undefined') {
          for (var j = 0; j < bib_data[i].creators.length; j++) {
            if (bib_data[i].creators[j].creatorType == 'author' || bib_data[i].creators[j].creatorType == 'translator') {
              if (typeof bib_data[i].creators[j].lastName != 'undefined') {
                html += bib_data[i].creators[j].firstName + ' ' + bib_data[i].creators[j].lastName;
              }
            }
            if (bib_data[i].creators[j].creatorType == 'translator') {
              html += " (trans.)";
            }
            if (j < bib_data[i].creators.length -1) {
              html += " and ";
            } else {
              html+= ", ";
            }
          }
        }
        
        // title
        if (typeof bib_data[i].title != 'undefined') {
          html += "<span class='title'>" + bib_data[i].title + "</span>";
        }


        // TODO remove, testing itemtypes
        // html += " itemtype is " + bib_data[i].itemType + " ";
        
        // if book, we have a publisher
        if (bib_data[i].itemType == 'book') {
          if (typeof bib_data[i].publisher != 'undefined') {
            html += " (" + bib_data[i].publisher + ", ";
          }
        } else if (bib_data[i].itemType == 'thesis') { // thesis, university in place of publisher
          if (typeof bib_data[i].university != 'undefined') {
            html += " (" + bib_data[i].university + ", ";
          }
        } else if (bib_data[i].itemType == 'journalArticle') { // oh man, this is an article :-/
          html += " in ";
          if (typeof bib_data[i].publicationTitle != 'undefined') {
            html += bib_data[i].publicationTitle;
          }
          if (typeof bib_data[i].volume != 'undefined') {
            html += " - vol. " + bib_data[i].volume;
          }
          if (typeof bib_data[i].issue != 'undefined') {
            html += " - issue " + bib_data[i].issue + ", ";
          }







          








        }
        
        if (typeof bib_data[i].date != 'undefined') {
          html += " " + bib_data[i].date + ")";
        }

        html += '</li>';
      }

      $('#xbr_biblio').html(html);

    })

    

});