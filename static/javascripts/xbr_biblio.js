$( document ).ready(function() {
    console.log( "ready!" );

    $.getJSON( "../static/data/xbr_biblio.json", function(bib_data) {

      var html = '';


      // First create the array of keys so that we can sort:
      var sort_array = [];
      for (var key in bib_data) {
        // 1st key is main contributor, either author, interviewer, etc.
        var person;
        if (bib_data[key].hasOwnProperty('author')) {
          person = bib_data[key].author[0].family;
        } else if (bib_data[key].hasOwnProperty('interviewer')) {
          person = bib_data[key].interviewer[0].family;
        };
        // 2d key is date, always present...
        sort_array.push({key:key,author:person,pub_year:bib_data[key].issued['date-parts'][0][0]});
      }

      // Now sort:
      sort_array.sort(function(a,b){
        var a1 = a.author.toLowerCase();
        var a2 = b.author.toLowerCase();

        var d1 = a.pub_year;
        var d2 = b.pub_year;

        if (a1 != a2) {
          if (a1 < a2) return -1;
          if (a1 > a2) return 1;
          return 0;
        }
        if (d1 < d2) return -1;
        if (d1 > d2) return 1;
        return 0;
      });

      // Now process that object:
      for (var i=0;i<sort_array.length;i++) {

        var item = bib_data[sort_array[i].key];
        
        // TODO Remove console.log
        console.log(item.type);
        html += "<li>";
        if (item.hasOwnProperty('author')) {
          for (var j = 0; j < item.author.length; j++) {
            html += item.author[j].given + " " + item.author[j].family + ". ";
          }
          if (item.hasOwnProperty('translator')) {
            for (var j = 0; j < item.translator.length; j++) {
              html += item.translator[j].given + " " + item.translator[j].family + " (trans. ";
            }
            if (item.hasOwnProperty('language')) {
              html += "- " + item.language;
            }
            html+= "). ";
          };
        } else if (item.hasOwnProperty('interviewer')) {
          for (var j = 0; j < item.interviewer.length; j++) {
            html += item.interviewer[j].given + " " + item.interviewer[j].family + ". ";
          }
        }

        // title
        if (item.type === "book") {
          if (item.hasOwnProperty('title')) {
            html += "<span class=title>" + item.title + ".</span>";
          };
        } else if (item.type === "chapter" || item.type === 'article-magazine' || item.type === 'article-newspaper' || item.type === 'article-journal') {
          if (item.hasOwnProperty('title')) {
            html += "\"" + item.title + "\" in ";
          };
          
          html += "<span class=title>" + item["container-title"] + ".</span>";  
          if (item.hasOwnProperty('container-author')) {
            for (var j = 0; j < item['container-author'].length; j++) {
              html += " " + item['container-author'][j].given + " " + item['container-author'][j].family + ", ed. ";
            }
          }
          if (item.hasOwnProperty('editor')) {
            html += " " + item['editor'][j].given + " " + item['editor'][j].family + ", ed. ";
          }
          if (item.hasOwnProperty('volume')) {
            html += " Vol. "+ item.volume; 
          };
          if (item.hasOwnProperty('issue')) {
            html += " Issue " + item.issue + " ";
          };






        } else if (item.type === "thesis") {
          if (item.hasOwnProperty('title')) {
            html += "\"" + item.title + "\" ";
          };
        } else if (item.type === "webpage" || item.type === 'interview') {
          html += "<span class=title>" + item.title + ".</span>";
        }

        // publisher
        html+= " (";
        if (item.type === "thesis") {
          html += "PhD diss., ";
        };
        if (item.hasOwnProperty('publisher-place')) {
          html += item["publisher-place"] + ": "
        };
        if (item.hasOwnProperty('publisher')) {
          html += item.publisher + ", ";
        };

        // date
        if (item.issued["date-parts"][0] != 'undefined') {
          for (var j = 0; j < item.issued["date-parts"][0].length; j++) {
            if (j === 1) {
              console.log("in");
              switch(item.issued["date-parts"][0][1]) {
                case 1:
                  html += " Jan. "
                  break;
                case 2:
                  html += " Feb. "
                  break;
                case 3:
                  html += " Mar. "
                  break;
                case 4:
                  html += " Apr. "
                  break;
                case 5:
                  html += " May "
                  break;
                case 6:
                  html += " Jun. "
                  break;
                case 7:
                  html += " Jul. "
                  break;
                case 8:
                  html += " Aug. "
                  break;
                case 9:
                  html += " Sep. "
                  break;
                case 10:
                  html += " Oct. "
                  break;
                case 11:
                  html += " Nov. "
                  break;
                case 12:
                  html += " Jan. "
                  break;
                default:
                  html += item.issued["date-parts"][0][1];
              }
            } else {
              html += item.issued["date-parts"][0][j];
            };
            if  (j < item.issued["date-parts"][0].length -1) {
              html += " ";
            } else {
              html += ")";
            }
          }
        };

        if (item.hasOwnProperty('page')) {
          html += " " + item.page + ". ";
        };
        // DOI or URL
        if (item.hasOwnProperty('DOI')) {
          html += " doi: <a href='http://dx.doi.org/" + item.DOI + "'>" + item.DOI + "</a>";
        } else if (item.hasOwnProperty('URL')) {
          html += " <a href='" + item.URL + "'>" + item.URL + "</a>";
        }  
      }
      
      // and... print
      $('#xbr_biblio').html(html);

    })
});