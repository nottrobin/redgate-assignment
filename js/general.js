var jq = jQuery.noConflict();

function fixVisible(newOptions) {
    // Compulsory options:
    // - element // the element to be conditionally fixed)
    
    /* Setup options */
    // Default options
    var options = {
        element: [], // Mandatory: A jQuery element collection of one
        topOffset: 0 // Optional: The offset from the top of the page once fixed
    }
    jq.extend(options,newOptions);
    
    /* If we don't have an element, or we're IE6, exit */
    if(options.element.length != 1 || jq.browser.msie && jq.browser.version < 7) {return false;}
    
    var offset = options.element.offset().top - options.topOffset;
    jq(window).bind(
        'scroll',
        updateFixedElement
    );
    
    function updateFixedElement() {
        if(options.element.css('position') != 'relative' && jq(document).scrollTop() < offset) {
            options.element.css('left','auto');
            options.element.css('top','auto');
            options.element.css('position','relative');
        } else if(options.element.css('position') != 'fixed' && jq(document).scrollTop() >= offset) {
            options.element.css('left',jq('#basket_summary').offset().left);
            options.element.css('top',options.topOffset);
            options.element.css('position','fixed');
        }
    }
    
    // Update the element once just to make sure everything's setup
    updateFixedElement();
}

function setupExpanders(newOptions) {
    /* Setup options */
    var options = {
        callback: function() {} // Optional: A function to call for each expandee after each expand/collapse
    };
    jq.extend(options,newOptions);
    
    var parents = jq('.expander_parent');
    
    for(var i=0; i < parents.length; i++) {
        var parent = parents[i];
        parent.expanders = jq(parent).find('.expander');
        parent.expandees = jq(parent).find('.expandee');
        
        parent.expanders.bind(
            'click',
            function() {
                jq(this).closest('.expander_parent')[0].expandees.slideToggle('slow',options.callback);
            }
        );
    }
}