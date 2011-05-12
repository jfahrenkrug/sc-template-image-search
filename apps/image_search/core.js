// ==========================================================================
// Project:   ImageSearch
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/

var GOOGLE_ENDPOINT = "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=large&imgtype=photo&q=";

ImageSearch = SC.Application.create(
  /** @scope ImageSearch.prototype */ {

  NAMESPACE: 'ImageSearch',
  VERSION: '0.1.0',
}) ;

// The model object that represents an image
ImageSearch.GoogleImage = SC.Object.extend({
  title: null,       // sting
  thumbnail: null,   // URL string
  image: null        // URL string
});

// A proxy that represents the currently selected image object
ImageSearch.currentImageController = SC.ObjectController.create({
});

// An array controller that holds the current search result images
ImageSearch.imagesController = SC.ArrayController.create({
  content: [],

  /* the current search term */
  searchTerm: null,
  
  search: function() {
    var that = this;
    // "forget" the previous search results
    this.set('content', []);
    // get the images from Google using jQuery JSONP
    $.getJSON(GOOGLE_ENDPOINT + this.get('searchTerm') + '&callback=?', null, 
      function(data, textStatus, xhr) {
        // iterate over each search result entry
        data.responseData.results.forEach(function(resultItem) {
          // create a new GoogleImage object and add it to the array controller
          that.pushObject(ImageSearch.GoogleImage.create({
            title: resultItem.contentNoFormatting,
            thumbnail: resultItem.tbUrl,
            image: resultItem.unescapedUrl
          }));
        });
      }
    );
  }
});







