(function (){
    
    var introContent = document.getElementById("intro-content"),
        scrollContent = document.getElementById("scroll-content"),
        canvas = document.getElementById("main-canvas");
    
    // so we can stop animations on mobile devices
    var mob = false;
    
    var h = set();
    
    // reset sizes on page resize
    window.onresize = set;
    
    // scroll function
    window.onscroll = function() {
        
        if (!mob) {
            var scrolledY = document.documentElement.scrollTop || document.body.scrollTop;
            
            // use distance scrolled to reduce opacity
            // we can go from 0 (1 opacity) to height (0 opacity)
            // first, get value for opacity based on distance scrolled
            var x = convert(scrolledY);
            
            if (x >= 0 && x <= 1) {
                introContent.style.opacity = x;
                var dist = -140;
                
                introContent.style.transform = "translateY(" + dist*(1-x) + "px)";
            }
        }
        
    };
    
    
    // Takes a number (a) between 0 and h (max) and returns a reversed ratio [0,1], if a=h,
    // we get 0, and if a=0, we get 1
    function convert(a) {
        var g = 1.1; // controls rate of change
        var ratio = 1 - ((a/h)*g);
        //console.log(ratio);
        return ratio;
    };
    
    
    // Updates height of scroll-content and position of intro-content based on window size.
    // Also returns window height for use elsewhere.
    function set() {
        // set mob to true if width is pretty small
        var w = window.innerWidth;
        mob = (w < 700) ? true : false;
        
        var h = window.innerHeight;
        
        
        // position other elements according to height
        scrollContent.style.top = h;
        canvas.height = h;
        
        // if mobile, set class to control some styles
        if (!mob) {
            document.body.classList.remove("mobile");
            
            // calculate new position for intro-content and set it (if not on mob!)
            var introH = introContent.clientHeight;
            var ratio = introH/h;
            var topDist = ((1-ratio)*100)/2;
            introContent.style.top = topDist + "%";
        }
        else {
            document.body.classList.add("mobile");
        }
        
        return h;
    };
    
    
    // Render as loaded with class
    document.body.classList.add("loaded");
    
})();