
require(['gitbook', 'jquery'], function(gitbook, $) {
    var opts;

    gitbook.events.bind('start', function(e, config) {
        opts = config['anchor-to-full-links'].elements;
    });

    gitbook.events.bind('page.change', function() {
        const a = window.location.href.replace(/\/([^\/]*)$/, '/')
        $.map(opts, function(ele) {
            $(ele).each((index, value) => {
                if(value.attributes.getNamedItem('href')){
                    const href = value.attributes.getNamedItem('href').value
                    
                    if(href.match(/.*\.html#.*/) && (!href.startsWith('http'))){
                        value.attributes.getNamedItem('href').value = a + href
                    }else if(href.startsWith('.#')){
                        value.attributes.getNamedItem('href').value = a + 'index.html' + href.replace('.#', '#')
                    }
                    
                }
            });
        });
    });
});