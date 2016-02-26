/*******************************************************
******          ImgFlip 1.1 Alpha               ********
******          Author: Sam W.                  ********
******          Date: 2-18-2016                 ********
******                                          ********
*******************************************************/


;(function($, document, window, undefined) {
    "use strict";

	$.fn.imgFlip = function(options) {
    /*instantiate default settings and destructively merge with user defs*/
    var settings = $.extend({
      "mobile": false,
      "effect": "flip",
      "multiples":false,
      "page":"category",
      "overflow": false
    },options),

    /* utility functions*/
    util = { 

      /* function to preload images - now obsolete*/
      preloadImage: function(url) {
        var img=new Image();
        img.src=url;
      },

      /* returns true if current page is that defined in settings */
      page: function() {
        var url = window.location.href.toLowerCase();
        return ((url.indexOf('-s/') >= 0 || url.indexOf('cat=') >= 0 || url.indexOf('productslist.asp') >= 0 ? "category" : false) == settings.page) ? true : false;
      },

      /*checks to see if image exists*/
      imageExists: function(image_url, PassThrough) {
        
        /* create image element and add source*/
        var new_img = document.createElement("img");
        new_img.src = image_url;

        /* instantiate counter to act as recursive function failsafe */
        var i = 0;
        function done(img){

          /* checks if image has completed loading */
          if(img.complete) {
            /* checks to see if image exists by comparing height */
            if(img.height > 0) {imgSwap.addImage(PassThrough, img)} else {return false}
          } else {
            /* increment counter */
            i++;
            /* limit recursion to 250 loops */
            if(i<250){ 
              /* wait alloted milliseconds, then run the function again */
              setTimeout(function(){ done(img) }, 10); 
            } else {
              return false
            }
          }
        }
        done(new_img);
      },

      /* check screen size and determine if mobile */
      screen: function() {
        var width = $(window).width();
        /* if desktop */
        if(width > 992){
          return true;
        /* if tablet*/
        }else if(width < 992 && width > 768){
          return settings.mobile;
        /* if mobile */
        }else if(width < 768){
          return settings.mobile;
        }
      },

      /* adds wrapper element to images */
      contain: function(item, height) {
        /*selects the item passed and next item of specified class, then wraps with div wrapper*/
          $(item).next('.altImgSwap').andSelf().wrapAll('<div class="effect-panel"></div>');
          /* sets min height to the size passed */
          item.parentNode.style.minHeight = height + "px";
      }
    },

    /*main functions*/
    imgSwap = {

      /*initializes main script, duh*/
      init: function() {
        /* if on correct page, and within specified screen size*/
        if(util.page() && util.screen()) {
          /* scan page for every product photo and run function on it */
          $.each($('.v-product a img[src*="v/vspfiles/photos"]'), function(index, item) {
            /* grabs the src of the product image, and extracts product code and image type, then uses that to create alt image src */
            var photoUrl = item.src,
            pCode = photoUrl.substring(photoUrl.lastIndexOf("/")+1, photoUrl.lastIndexOf("-")),
            imageExt = photoUrl.substring(photoUrl.lastIndexOf("."), photoUrl.lastIndexOf(".")+4),
            altUrl = "/v/vspfiles/photos/" + pCode + "-3t" + imageExt;
            /* calls function to check if image exists */
            util.imageExists(altUrl, pCode);            
          });
        }
      },

      /* function to add alt image */
      addImage: function(pcode, altImg) {
        /* locates existing image */
        var selector = 'img[src*="' + pcode + '"]';
        var item = document.querySelector(selector);
        /* add effect class */
      $(item).closest('.v-product').addClass(settings.effect);

        
        /* adds class defining primary image */
        $(item).addClass("ImgSwap");
        /* adds class defining alt image */
        $(altImg).addClass("altImgSwap");
        item.parentNode.appendChild(altImg);

        /* compares both images and determines the smaller of the two heights*/
        var h = Math.min(item.height,altImg.height);
        /* calculates width of primary image, if resized to same height as alt image*/
        var rpw = (altImg.height/item.height)*item.width;
        /* calculates width of alt image, if resized to same height as primary image*/
        var rsw = (item.height/altImg.height)*altImg.width;

        /* this clause is neccessary to retain page responsiveness, and achieve some animations */
        if(settings.overflow){
          /* sets container to a max-width equal to the widest image, when both images are resized to the smaller of the two heights */
          item.parentNode.style.maxWidth = item.height>altImg.height ? (rpw>altImg.width ? rpw : altImg.width) + "px" : (rsw>item.width ? rsw : item.width) + "px";
        } else {
          /* sets container to a max-width equal to the least wide image, when both images are resized to the smaller of the two heights */
          item.parentNode.style.maxWidth = item.height>altImg.height ? (rpw<altImg.width ? rpw : altImg.width) + "px" : (rsw<item.width ? rsw : item.width) + "px";
        } /* a.v-product__img's max width, is equal to 
        
        if prime image is taller than alt image
          return greater number of resized primary width, compared to original alt images width
        if alt image is taller than prime image
        return greater number of resized secondary width, compared to original primary width */
        
        /* sets both images to the same maximum height */
        item.style.maxHeight = h + "px"; /* primary image */
        altImg.style.maxHeight = h + "px"; /* alt image */
        
        /* sets link-container to min height equal to above image height, plus 15px for padding */
        item.parentNode.style.minHeight = (h + 15) + "px";

        /* adds additional container for certain animations */
        if(settings.effect == "flip" || settings.effect == "flip-v" || settings.effect == "cube" || settings.effect == "cube-v"){util.contain(item, h);}
      }    
    };

    /* start-er-up */
    imgSwap.init();

    /* allows chaining */
    return this;
	};
})($jQueryModern, document, window);

