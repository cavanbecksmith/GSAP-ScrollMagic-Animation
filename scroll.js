$.scrollLock = ( function scrollLockSimple(){
    var locked   = false;
    var $body;
    var previous;

    function lock(){
        // document.body.addEventListener('touchmove', cancelMouseMove, true);
        // { passive: false }
        if( !$body ){
            $body = $( 'body' );
        }
        previous = $body.css( 'overflow' );
        $body.css( 'overflow', 'hidden' );
        locked = true;
    }

    function unlock(){
        // document.body.removeEventListener('touchmove',cancelMouseMove, true);
        $body.css( 'overflow', previous );
        locked = false;
    }

    return function scrollLock( on ) {
        // If an argument is passed, lock or unlock depending on truthiness
        if( arguments.length ) {
            if( on ) {
                lock();
            }
            else {
                unlock();
            }
        }
        // Otherwise, toggle
        else {
            if( locked ){
                unlock();
            }
            else {
                lock();
            }
        }
    };
}() );

function cancelMouseMove(){
    e.preventDefault(); 
}