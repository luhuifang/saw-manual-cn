require(['gitbook', 'jquery'], function(gitbook, $) {
    var opts;

    gitbook.events.bind('start', function(e, config) {
        opts = config['add-index-html'].elements;
    });

    gitbook.events.bind('page.change', function() {
        $.map(opts, function(ele) {
            $(ele).each((index, value) => {
                const attr = value.attributes.getNamedItem('href');
                if(attr){
                    const href = attr.value.toLowerCase()
                    console.log(href)
                    
                    if( href.match(/^(?!.*png)(?!.*html)(?!.*\#)(?!.*http).*$/)){
                        attr.value += href.match(/\/$/) ? 'index.html' : '/index.html'
                    } else if(href.match(/^.*\#.*$/) && href.match(/^(?!.*html\#).*$/)){
                        // 在'#'前插入'newString'
                        attr.value = href.replace(/#/, '/index.html#');
                    }
                }
            });
        });
    });
});