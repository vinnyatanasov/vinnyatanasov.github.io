(function (){
    
    var introContent = document.querySelector(".intro-content"),
        scrollContent = document.querySelector(".scroll-content"),
        canvas = document.querySelector(".main-bg");
    
    var animationConfig = {
        fade: true,
        dist: -140
    };
    
    // so we can stop animations on mobile devices
    var mob = false;
    
    // set sizes and store window height
    var wHeight = set();
    
    initEvents();
    
    // bind events
    function initEvents(){
        // animate text on scroll
        // set animation configs
        window.onscroll = function() {
            if (!mob) {
                var scrolledY = document.documentElement.scrollTop || document.body.scrollTop;
                animateText(scrolledY);
            }
        };
        
        // reset sizes on page resize
        window.onresize = function(){
            wHeight = set();
        }
        
        // add class to body on page load
        window.onload = document.body.classList.add("loaded");
        
    }
    
    
    function animateText(y){
        // use distance scrolled to reduce opacity
        // we can go from 0 (1 opacity) to height (0 opacity)
        
        // first, get value based on distance scrolled
        var x = convert(y);
        
        if (x >= 0 && x <= 1) {
            // fade text
            if (animationConfig.fade) {
                introContent.style.opacity = x;
            }
            
            // move text
            introContent.style.transform = "translateY(" + (animationConfig.dist * (1-x)) + "px)";
        }
    }
    
    
    function convert(a) {
        // Takes a number (a) between 0 and h (max) and returns a reversed ratio [0,1], if a=h,
        // we get 0, and if a=0, we get 1
        
        var g = 1.1; // controls rate of change
        var ratio = 1 - ((a/wHeight)*g);
        //console.log(ratio);
        return ratio;
    };
    
    
    function set() {
        // Updates height of scroll-content and position of intro-content based on window size.
        // Also returns window height for use elsewhere.
        
        // set mob to true if width is smaller than some value
        var w = window.innerWidth;
        mob = (w < 700) ? true : false;
        
        var h = window.innerHeight;
        
        if (scrollContent) {
            // position other elements according to height
            // scrollContent.style.top = h + "px";
            scrollContent.style.minHeight = h + "px";
        }

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
    
})();
