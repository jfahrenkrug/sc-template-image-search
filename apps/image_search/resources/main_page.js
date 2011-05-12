// ==========================================================================
// Project:   ImageSearch - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals ImageSearch */

// This page describes the main user interface for your application.  
ImageSearch.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
      childViews: 'splitView'.w(),

      splitView: SC.SplitView.design({
        layout: { left: 0, top: 0, right: 0, bottom: 0 },
        layoutDirection: SC.LAYOUT_HORIZONTAL,
        autoresizeBehavior: SC.RESIZE_BOTTOM_RIGHT,
        defaultThickness: 250,

       // topLeftView goes here
       topLeftView: SC.View.design({
          layout: { top: 0, bottom: 0, width: 200 },
          childViews: 'textField scrollView'.w(),
          textField: SC.TextFieldView.extend({
            layout: { top: 2, height: 24, left: 5, right: 5 },
            controlSize: SC.LARGE_CONTROL_SIZE,
            fontWeight: SC.BOLD_WEIGHT,
            hint: 'type your search here',
            valueBinding: 'ImageSearch.imagesController.searchTerm',
            target: "ImageSearch.imagesController",
            action: "search",
            keyDown: function(evt) {
              sc_super(); // necessary to guarantee regular handling of keyDown events, 
                           // want to avoid that this overwrite messes everything up     	   
              if (evt.keyCode === 13) {
                // trigger the search after we've seen an "enter"
                ImageSearch.imagesController.search(); 
                return YES;
              } else {
                return NO;
              }
            }}),

            // scrollView goes here
          scrollView: SC.ScrollView.design({
            hasHorizontalScroller: NO,
            layout: { top: 28, bottom: 0, left: 5, right: 5 },
            backgroundColor: 'white',
            contentView: SC.TemplateCollectionView.design({
              contentBinding: 'ImageSearch.imagesController',
              itemView: SC.TemplateView.extend({
                templateName: 'image_row',
                mouseDown: function(evt) {
                  ImageSearch.currentImageController.set('content', this.get('content'));
                }
              })
            })
          })
        }),

        // bottomRightView goes here
        bottomRightView: SC.ImageView.design({
          layout: { left: 0, top: 0, right: 0, bottom: 0 },
          scale: SC.BEST_FIT,
          valueBinding: "ImageSearch.currentImageController.image"
        })
      })
  })

});
