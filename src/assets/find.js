var $carousel = $( '.carousel' ),
    carouselHasFocus = false,
    carouselItems = $carousel.find('.carousel-item'),
    carouselItemsLength = carouselItems ? $carousel.find('.carousel-item').length : 0,
    carouselHasSlid = false,
    useBootstrapKeyboardEvents = typeof $carousel.data('keyboard') === 'undefined' ? false : $carousel.data('keyboard') === true,
    deferreds = [],
    imgs = $carousel.find( 'img' ),
    heights = [],
    tallest;

// setting data-keyboard="true" doesn't work unless the carousel has already slid, we we're tracking that here
$carousel.on( 'slid.bs.carousel', function () {
    carouselHasSlid = true;
} );

$carousel.hide();

if( carouselItemsLength > 0 ) {
    imgs.each( function() {
        var self = $( this ),
            datasrc = self.attr( 'data-src' );
        if ( datasrc ) {
            var d = $.Deferred();
            self.one( 'load', d.resolve ).attr( "src", datasrc ).attr( 'data-src', '' );
            deferreds.push( d.promise() );
        }
    } );

    $.when.apply( $, deferreds ).done( function() {
        $( '#loader' ).hide();
        $carousel.fadeIn( 1000, function() {
            normalizeCarouselImageHeights();
        } );
    } );

    $carousel.focus( function() {
        carouselHasFocus = true;
    } );
    $carousel.blur( function() {
        carouselHasFocus = false;
    } );

    $( document ).keydown( function( e ) {

        if ( e.keyCode === 9 ) {
            // tracking tabbing
            console.log( document.activeElement );
        }

        // is data-keyboard set to true?
        if( useBootstrapKeyboardEvents ) {
            // if the carousel hasn't slid, bootstrap carousel keyboard won't work
            if( !carouselHasSlid ) {
                keyboardSlide( e );
            }
        } else {
            keyboardSlide( e );
        }
        if ( carouselHasFocus && ( e.keyCode > 47 && e.keyCode < 58 ) ) {
            var slideIndex =  String.fromCharCode( e.keyCode ) - 1;
            if( slideIndex < carouselItemsLength ) {
                $carousel.carousel( slideIndex );
            }
        } else {
            console.log( e.keyCode );
        }
    } );

    $( window ).on( 'resize orientationchange', function() {
        tallest = 0, heights.length = 0; //reset vars
        carouselItems.each( function() {
            $( this ).css( 'min-height', '0' ); //reset min-height
        } );
        normalizeCarouselImageHeights();
    } );
} else {
    console.error( '.carousel missing .carousel-item(s)' );
    $( '#loader' ).hide();
}

function keyboardSlide( e ) {
    if ( typeof e !== 'undefined' ) {
        if ( carouselHasFocus && e.keyCode === 37 ) {
            // Previous
            $carousel.carousel( 'prev' );
            return false;
        } else if ( carouselHasFocus && e.keyCode === 39 ) {
            // Next
            $carousel.carousel( 'next' );
            return false;
        }
    } else {
        console.log( 'function keyboardSlide did not understand the event' );
    }
}
function normalizeCarouselImageHeights() {
    //add heights to array
    carouselItems.each( function() {
        heights.push( $( this ).height() );
    } );
    tallest = Math.max.apply( null, heights ); //keep largest value
    if ( tallest > 0 ) {
        carouselItems.each( function() {
            $( this ).css( 'min-height', tallest + 'px' );
        } );
    }
};

document.documentElement.setAttribute( "lang", "en" );
document.documentElement.removeAttribute( "class" );
axe.run( function( err, results ) {
    console.log( results.violations );
} );